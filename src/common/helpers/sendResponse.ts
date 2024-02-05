import { Response } from 'express';
import { IAPIResponse } from '../../interfaces/apiResponse';

const sendResponse = <T>(res: Response, data: IAPIResponse<T>): void => {
  const responseData: IAPIResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null,
    data: data.data || null,
  };
  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
