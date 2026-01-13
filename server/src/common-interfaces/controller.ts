// import type { IResponse } from './response.js';
import { Request, Response } from "express";

export interface IControllerRequest {
  body: any;
  query: any;
  params: any;
  ip: string;
  method: string;
  path: string;
  user: any;
  headers: {
    [key: string]: any;
  };
  cookies: {
    accessToken?: string;
    refreshToken?: string;
    [key: string]: any;
  };
  files?: any;
  file?: any;
}


export type IController = (
  req: Request,
  res: Response
) => Promise<any>;
