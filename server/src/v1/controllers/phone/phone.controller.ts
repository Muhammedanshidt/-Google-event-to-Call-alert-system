import type { IController } from "../../../common-interfaces/controller";
import { saveCallLog } from "../../services/phone/callLoag.service";

export const callLogController: IController = async (req, res) => {
    console.log("asdkskdkjjdjfvidnviundf")
  try {
    console.log("---------form call controller")
    const callLog = await saveCallLog(req.body);

    return res.status(200).json({
      success: true,
      message: "Call status saved",
      data: callLog
    });

  } catch (error: any) {
    console.error("❌ Twilio Webhook Error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to process call status"
    });
  }
};


export const callLogres: IController = async (req, res) => {
    try {
      console.log("---------form call controller")
    //   const callLog = await saveCallLog(req.body);
  
    //   return res.status(200).json({
    //     success: true,
    //     message: "Call status saved",
    //     data: callLog
    //   });
  
    } catch (error: any) {
      console.error("❌ Twilio Webhook Error:", error.message);
  
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to process call status"
      });
    }
  };
