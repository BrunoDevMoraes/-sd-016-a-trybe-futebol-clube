import { Request, Response, NextFunction } from 'express';
import Token from '../utils/Token';

export default class CheckAuth {
  static jwtValidator(req: Request, res: Response, next: NextFunction) {
    const token = req.headers;
    if (typeof token.authorization === 'string') {
      try {
        Token.decode(token.authorization);
      } catch (err) {
        return res.status(401).json({ message: (err as Error).message });
      }
    }
    next();
  }
}
