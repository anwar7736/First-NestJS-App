
import { Request, Response, NextFunction } from 'express';

export function FunctionalMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(`Functional Middleware...`);
  next();
};
