import type { IController } from "../../../common-interfaces/controller";
import type { IResponse } from "../../../common-interfaces/response";
import * as authService from "../../services/auth/auth.service";
import type { AuthRequest } from "../../../middleware/auth.middleware";


export const googleAuth: IController = async (req, res) => {
  try {
    const { data } = await authService.initiateAuth();
    console.log(data)
    res.json( data );
  } catch (error) {
    res.redirect("http://localhost:3000/login");
    return res.status(500).json({
      message: "Google auth failed"
    });
  }
 
};



export const googleCallback: IController = async (req, res) => {
  console.log("from callback")
  try {
    const { code } = req.query;
    if (!code) {
      return res.redirect("http://localhost:3000/login");
    }

    const result = await authService.callbackUrl(code as string);
    
    if (result.cookies) {
      result.cookies.forEach((cookie: { name: string; value: string; options: any }) => {
        res.cookie(cookie.name, cookie.value, cookie.options);
      });
    }

    if (result.redirect) {
      return res.redirect(result.redirect);
    }

    res.redirect("http://localhost:3000/login");
  } catch (err) {
    res.redirect("http://localhost:3000/login");
  }
};

export const getMe: IController = async (req, res) => {
  try {
    const authReq = req as AuthRequest;
    const result = await authService.getMe(authReq.user._id.toString());
    res.status(result.statusCode).json({
      statusCode: result.statusCode,
      message: result.message,
      data: {
        user: result.data,
      },
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      message: error.message || "Something went wrong",
      data: null,
    });
  }
};

export const updatePhone: IController = async (req, res) => {
  try {
    const authReq = req as AuthRequest;
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      res.status(400).json({
        statusCode: 400,
        message: "Phone number is required",
        data: null,
      });
      return;
    }

    const result = await authService.updatePhoneNumber(
      authReq.user._id.toString(),
      phoneNumber
    );

    res.status(result.statusCode).json({
      statusCode: result.statusCode,
      message: result.message,
      data: {
        user: result.data,
      },
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      message: error.message || "Something went wrong",
      data: null,
    });
  }
};

