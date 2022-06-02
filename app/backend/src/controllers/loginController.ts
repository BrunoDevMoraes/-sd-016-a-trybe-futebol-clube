import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  private info: { email: 'string', password: 'string' };

  async postLogin(req: Request, res: Response) {
    this.info = req.body;
    const service = new LoginService();
    try {
      const infoStatus = await service.postLogin(this.info);
      return res.status(200).json(infoStatus);
    } catch (err) {
      return res.status(500).send({ message: (err as Error).message });
    }
  }
}
