import User from "../../models/users";
import { twilioClient } from "../../../config/twilio";
// import { getUpcomingEvents } from "../dashboard/googleCalendar.service";

// export const callWithNextEvent = async (userId: string) => {
//   // 1. Get user
//   const user = await User.findById(userId);
//   if (!user || !user.phoneNumber) {
//     return {
//       statusCode: 400,
//       message: "Phone number not found",
//       data: null,
//     };
//   }

 
// console.log(user)

//   const event = await getNextGoogleEvent(user);

//   const eventTitle = event?.summary || "a scheduled meeting";
//   const eventTime = new Date(event.start.dateTime).toLocaleTimeString();

//   const voiceMessage = `Hello ${user.name}. Your next meeting is ${eventTitle} at ${eventTime}`;

//  await twilioClient.calls.create({
//     to: "91 82814 97085",
//     from: "+14846690839",
//     twiml: `
//       <Response>
//         <Say voice="alice">${voiceMessage}</Say>
//       </Response>
//     `,
//   });
//   console.log("now here")


//   return {
//     statusCode: 200,
//     message: "Call initiated",
//     data: {
//       phone: user.phoneNumber,
//       event: eventTitle,
//     },
//   };
// };


export const callUserWithEvent = async (user: any, event: any) => {
    const eventTitle = event.summary || "a meeting";
    const eventTime = new Date(event.start.dateTime).toLocaleTimeString();
  
    const voiceMessage = `Hello ${user.name}. Your next meeting is ${eventTitle} at ${eventTime}`;
  
    await twilioClient.calls.create({
        to: "91 82814 97085",
        from: "+14846690839",
        twiml: `
          <Response>
            <Say voice="alice">${voiceMessage}</Say>
          </Response>
        `,
    });
  };