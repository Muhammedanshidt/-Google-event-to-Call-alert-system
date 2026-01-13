// import type { IController } from "../../../common-interfaces/controller";
// import type { AuthRequest } from "../../../middleware/auth.middleware";
// import * as twilioService from "../../services/dashboard/dashboard.service";

// export const callNextEvent: IController = async (req, res) => {
//   try {
//     const authReq = req as AuthRequest;
//     const result = await twilioService.callUserWithEvent(
//       authReq.user._id.toString()
//     );
//     console.log(result)
//     res.status(result.statusCode).json({
//       statusCode: result.statusCode,
//       message: result.message,
//       data: result.data,
//     });
//   } catch (error: any) {
//     res.status(error.statusCode || 500).json({
//       statusCode: error.statusCode || 500,
//       message: error.message || "Call failed",
//       data: null,
//     });
//   }
// };
