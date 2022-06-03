import { Router } from 'express';
import LoginController from '../controllers/loginController';
import LoginMiddleware from '../middlewares/loginMiddleware';

const router = Router();

router.post('/login', LoginMiddleware.checkInfo, LoginController.postLogin);

export default router;
