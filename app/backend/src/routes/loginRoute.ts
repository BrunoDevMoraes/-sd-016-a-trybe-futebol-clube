import { Router } from 'express';
import LoginController from '../controllers/loginController';

export default class LoginRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.post();
  }

  private post() {
    const controller = new LoginController();
    this.router.post('/', controller.postLogin);
  }
}
