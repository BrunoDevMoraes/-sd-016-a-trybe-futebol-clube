import { Request, Response, NextFunction } from 'express';

export default class LoginMiddleware {
  static checkInfo(req: Request, res: Response, next: NextFunction) {
    const info = req.body;
    if (!info.email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!info.password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  }
}
