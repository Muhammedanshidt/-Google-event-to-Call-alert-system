// import cron from "node-cron";
// import User from "../v1/models/users"
// import { getNextGoogleEvent } from "../v1/services/dashboard/googleCalendar.service";
// import { callWithNextEvent } from "../v1/services/dashboard/dashboard.service";
// import { clearScreenDown } from "node:readline";

// export const startCalendarCron = () => {
//   // Runs every 1 minute
//   cron.schedule("* * * * *", async () => {
//     console.log("⏰ Checking Google Calendar...");

//     const users = await User.find({ is_active: true });

//     // console.log(users)

//     // for (const user of users) {

//     //   try {
//     //     const events = await getNextGoogleEvent(user);

//     //     if (events.length > 0) {
//     //       console.log("📅 Event found for:", user.email);
//     //       await callWithNextEvent(user._id.toString());
//     //     }





//     //   } catch (err) {
//     //     console.error("Cron error for", user.email);
//     //   }
//     // }
//      const runChecks = async () => {
//       for (const user of users) {
//         try {
//           const events = await getNextGoogleEvent(user);
//             console.log("📅 Event found for:", user.email);
//             await callWithNextEvent(user._id.toString());
          
//         } catch (err) {
//           console.error("Cron error for", user.email);
//         }
//       }
//     };
//     // Run immediately
//     await runChecks();

//     // Then every 10 seconds for this minute
//     const interval = setInterval(runChecks, 10_000);

//     // Stop after 1 minute
//     setTimeout(() => clearInterval(interval), 60_0000);
//   });
// };










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

        // Prevent duplicate calls
        if (user.lastNotifiedEventId === event.id) continue;

        console.log("📞 Calling", user.email, "for", event.summary);

        await callUserWithEvent(user, event);

        user.lastNotifiedEventId = event.id;
        await user.save();
      } catch (err) {
        console.error("Cron error:", user.email);
      }
    }
  });
};
