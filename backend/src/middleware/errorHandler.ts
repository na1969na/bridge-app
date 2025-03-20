import { Request, Response } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  message: string;
}

export const errorHandler = (err: CustomError, req: Request, res: Response) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(err);

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
    },
  });
};
