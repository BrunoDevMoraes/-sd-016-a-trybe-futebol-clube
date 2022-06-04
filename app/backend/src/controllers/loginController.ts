import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  static async postLogin(req: Request, res: Response) {
    try {
      const infoStatus = await LoginService.postLogin(req.body);
      if (infoStatus === false) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
      return res.status(200).json(infoStatus);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  }

  static async validator(req: Request, res: Response) {
    try {
      const info = req.headers;
      if (info.authorization !== undefined) {
        const payload = await LoginService.validator(info.authorization);
        if (typeof payload === 'object') {
          return res.status(200).json(payload.role);
        }
      }
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  }
}
