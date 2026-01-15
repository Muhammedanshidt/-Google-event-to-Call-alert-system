import { twilioClient } from "../../../config/twilio";


export const callUserWithEvent = async (user: any, event: any) => {
    const eventTitle = event.summary || "a meeting";
    const eventTime = new Date(event.start.dateTime).toLocaleTimeString();
  
    const voiceMessage = `Hello ${user.name}. Your next meeting is ${eventTitle} at ${eventTime}`;

    console.log(process.env.CALL_STATUS_API,"api")
  
    await twilioClient.calls.create({
        to: "91 82814 97085",

        from: "+14846690839",
        twiml: `
          <Response>
            <Say voice="alice">${voiceMessage}</Say>
          </Response>
        `,
        statusCallback:'https://detailedly-uncapitalised-xavi.ngrok-free.dev/api/v1/phone/call-status',
        statusCallbackEvent: ["initiated", "ringing", "answered", "completed"], 
        machineDetection: "Enable"
    });
  };  