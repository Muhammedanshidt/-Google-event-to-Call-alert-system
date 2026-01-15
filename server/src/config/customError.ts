import type { IResponse } from "../common-interfaces/response";
import httpStatus from "http-status-codes";


// export class InternalError {
//   statusCode: number;
//   message: string;
//   data: any;

//   constructor(
//     message: string = httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR),
//     statusCode: number = httpStatus.INTERNAL_SERVER_ERROR,
//     data?: any
//   ) {
//     this.message = message;
//     this.statusCode = statusCode;

//     this.data = data ?? {
//       message: this.message,
//       statusCode: this.statusCode,
//     };
//   }
// }


const customError = (
  statusCode: number = httpStatus.INTERNAL_SERVER_ERROR,
  message: string = httpStatus.getStatusText(statusCode),
  data?: any
): IResponse => {
  return {
    message,
    statusCode,
    data: data ?? {
      message,
      statusCode,
    },
  };
};

export default customError;

