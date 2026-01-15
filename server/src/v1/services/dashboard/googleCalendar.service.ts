import axios from "axios";


export const getUpcomingEvents = async (user: any) => {
    try {
      const now = new Date();
      const fiveMinutesLater = new Date(now.getTime() + 5 * 60 * 1000);

      console.log(user)
  
      const res = await axios.get(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          params: {
            timeMin: now.toISOString(),
            timeMax: fiveMinutesLater.toISOString(),
            singleEvents: true,
            orderBy: "startTime",
          },
        }
      );
      console.log("⏰ Checking calendar... from event");
    //   console.log(res.data)
      return res.data.items;
    } catch (err:any) {
    //   console.error("Google API error :", err.response?.data || err.message);
      return [];
    }
  };
  