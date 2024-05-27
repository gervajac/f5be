import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    console.log(token, "tokenn")
    console.log(process.env.SECRET_KEY)
    if (token) {
      // Verifica y decodifica el token aquí
      const tokenWithoutBearer = token.replace("Bearer ", "");
      jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          console.log(err)
          return res.status(401).json({ message: 'Token inválido' });
        } else {
          next();
        }
      });
    } else {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
  }
}