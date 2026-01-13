import axios from "axios";

// // export const getNextGoogleEvent = async (user:any) => {

// //     const now = new Date();
// //     const fiveMinutesLater = new Date(now.getTime() + 5 * 60 * 1000);

   

// //   const res = await axios.get(
// //     "https://www.googleapis.com/calendar/v3/calendars/primary/events",
// //     {
// //       headers: {
// //         Authorization: `Bearer ${user.accessToken}`,
// //       },
// //       params: {
// //         maxResults: 1,
// //         orderBy: "startTime",
// //         singleEvents: true,
// //         timeMin: new Date().toISOString(),

// //         // timeMin: now.toISOString(),
// //         // timeMax: fiveMinutesLater.toISOString(),
// //         // singleEvents: true,
// //         // orderBy: "startTime",
// //       },
// //     }
// //   );
// //   console.log("event fetch")


// //   return res.data.items;
// // };














// import axios from "axios";

// export const getNextGoogleEvent = async (user: any) => {
//   try {
//     const now = new Date();
//     const fiveMinutesLater = new Date(now.getTime() + 5 * 60 * 1000);

//     const res = await axios.get(
//       "https://www.googleapis.com/calendar/v3/calendars/primary/events",
//       {
//         headers: {
//           Authorization: `Bearer ${user.accessToken}`,
//         },
//         params: {
//         maxResults: 1,
//         orderBy: "startTime",
//         singleEvents: true,
//         timeMin: new Date().toISOString(),
//         },
//       }
//     );

//     console.log("Google API success:", res.data.items);

//     return res.data.items;  // always return something
//   } catch (error: any) {
//     console.error("Google API ERROR:", error.response?.data || error.message);
//     return [];  // return empty array so cron never breaks
//   }
// };





















export const getUpcomingEvents = async (user: any) => {
    try {
      const now = new Date();
      const fiveMinutesLater = new Date(now.getTime() + 5 * 60 * 1000);
  
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
  
      return res.data.items;
    } catch (err:any) {
      console.error("Google API error:", err.response?.data || err.message);
      return [];
    }
  };
  