import { Request, Response } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  message: string;
}

export const errorHandler = (err: CustomError, req: Request, res: Response) => {
  console.error(err);
  if (!res || !res.status) {
    res = {
      status: (code: number) => ({
        json: (body: any) => console.error('Custom Error Response:', body),
      }),
    } as Response;
  }

  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message || 'Unknown Error',
  });
};
