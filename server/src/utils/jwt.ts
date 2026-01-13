import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();

const {JWT_REFRESH_SECRET, JWT_ACCESS_SECRET } = process.env;

interface IPayloade {
  id: mongoose.Types.ObjectId;
  email: string;
  is_active?: boolean;
}


export const generateAccessToken = async (userPayload: IPayloade) => {
  return jwt.sign(userPayload, JWT_ACCESS_SECRET!, { expiresIn: '15m' });
};
export const generateRefreshToken = async (userPayload: IPayloade) => {
  return jwt.sign(userPayload, JWT_REFRESH_SECRET!, { expiresIn: '7d' });
};
export const verifyToken = async (accessToken: string) => {
  return jwt.verify(accessToken, JWT_ACCESS_SECRET!);
};
export const verifyRefreshToken = async (refreshToken: string) => {
  return jwt.verify(refreshToken, JWT_REFRESH_SECRET!) as IPayloade;
};
