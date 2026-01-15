import { twilioClient } from "../../../config/twilio";


export const callUserWithEvent = async (user: any, event: any) => {
    const eventTitle = event.summary || "a meeting";
    const eventTime = new Date(event.start.dateTime).toLocaleTimeString();
  
    const voiceMessage = `Hello ${user.name}. Your next meeting is ${eventTitle} at ${eventTime}`;
  
    await twilioClient.calls.create({
        to: "91 82814 97085",
        // to: "91 75109 92146",
        from: "+14846690839",
        twiml: `
          <Response>
            <Say voice="alice">${voiceMessage}</Say>
          </Response>
        `,
        statusCallback:""
    });
  };