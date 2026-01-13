export interface IResponse {
    statusCode?: number;
    message?: string;
    headers?: { [key: string]: string } | null;
    data?: any;
    cookies?: {
      name: string;
      value: string;
    }[];
    redirect?: string;
  }