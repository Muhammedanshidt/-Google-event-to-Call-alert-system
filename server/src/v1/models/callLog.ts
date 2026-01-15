import mongoose from "mongoose";

const callLogSchema = new mongoose.Schema({
  callSid: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  phone: { type: String, required: true },
  status: { type: String, required: true  },
  answeredBy: { type: String }, 
  duration: { type: Number }    

}, { timestamps: true });

export default mongoose.model("CallLog", callLogSchema);


