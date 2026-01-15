import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true },
  name: String,
  avatar: String,
  phoneNumber: { type: String, default: null },
  accessToken: String,
  refreshToken: String,
  is_active: { type: Boolean, default: true },
  lastNotifiedEventId: { type: String, default: null },
  lastCallSid: { type: String, default: null },
  lastCallStatus: {  type: String,  default: null }


}, { timestamps: true });

export default mongoose.model("User", userSchema);

