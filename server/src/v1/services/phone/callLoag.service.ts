import CallLog from "../../models/callLog";

interface CallLogPayload {
  CallSid: string;
  CallStatus: string;
  To?: string;
  AnsweredBy?: string;
  CallDuration?: string;
}

export const saveCallLog = async (payload: CallLogPayload) => {
    console.log("---------form call save")
    console.log(payload)
  const {
    CallSid,
    CallStatus,
    To,
    AnsweredBy,
    CallDuration
  } = payload;

  if (!CallSid || !CallStatus) {
    throw new Error("Invalid Twilio payload");
  }
  console.log("---------form call save 2")
  const callLog = await CallLog.findOneAndUpdate(
    { callSid: CallSid },
    {
      callSid: CallSid,
      phone: To,
      status: CallStatus,
      answeredBy: AnsweredBy || null,
      duration: CallDuration ? Number(CallDuration) : 0
    },
    { upsert: true, new: true }
  );
  console.log("---------form call save 3")

  return callLog;
};  
