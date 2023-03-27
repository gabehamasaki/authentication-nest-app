import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(401).json({
        message: 'Token is required',
      });
    }

    // Bearer [TOKEN]
    const [, token] = authToken.split(' ');

    try {
      verify(token, process.env.PRIVATE_KEY);

      return next();
    } catch (err) {
      return res.status(401).json({
        message: 'Token is invalid',
      });
    }
  }
}
