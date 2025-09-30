import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
   console.error(`${req.method} ${req.url} ❌ ${err.message || 'Unknown Error'}`);

   if (err instanceof Error) {
      res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: err.message });
   } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Something went wrong' });
   }
}
