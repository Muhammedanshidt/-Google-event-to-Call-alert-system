import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import User from "../v1/models/users";

export interface AuthRequest extends Request {
  user?: any;
}
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
 
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: "Authentication required",
        data: null,
      });
    }

    const decoded = await verifyToken(token);
    const payload = decoded as { id: string; email: string; is_active?: boolean };

    const user = await User.findById(payload.id).select("-accessToken -refreshToken");

    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: "User not found",
        data: null,
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        statusCode: 403,
        message: "User account is inactive",
        data: null,
      });
    }

    req.user = user;
    next();
  } catch (error: any) {
    return res.status(401).json({
      statusCode: 401,
      message: error.message || "Invalid token",
      data: null,
    });
  }
};
