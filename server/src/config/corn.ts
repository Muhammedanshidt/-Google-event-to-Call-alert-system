
import cron from "node-cron";
import User from "../v1/models/users"
import { getUpcomingEvents } from "../v1/services/dashboard/googleCalendar.service";
import { callUserWithEvent } from "../v1/services/dashboard/dashboard.service";

export const startCalendarCron = () => {
  cron.schedule("* * * * *", async () => {
    console.log("⏰ Checking calendar...");

    const users = await User.find({ is_active: true });

    for (const user of users) {
      try {
        const events = await getUpcomingEvents(user);

        if (events.length === 0) continue;

        const event = events[0];
        console.log(event)
        console.log("after event in ")

        // Prevent duplicate calls

        if (user.lastNotifiedEventId === event.id) continue;

        console.log("📞 Calling", user.email, "for", event.summary);

        await callUserWithEvent(user, event);

        console.log("after the call")

        user.lastNotifiedEventId = event.id;
        await user.save();
      } catch (err) {
        console.error("Cron error:", user.email);
      }
    }
  });
};
