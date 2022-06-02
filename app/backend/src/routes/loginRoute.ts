import { Router } from 'express';
import LoginController from '../controllers/loginController';

const router = Router();

router.post('/login', LoginController.postLogin);

export default router;
