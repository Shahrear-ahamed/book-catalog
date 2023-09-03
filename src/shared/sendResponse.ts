import { Response } from "express";

type IApiSendResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: IApiSendResponse<T>) => {
  const responseData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || undefined,
    meta: data.meta || undefined,
    data: data.data || undefined,
  };
  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
