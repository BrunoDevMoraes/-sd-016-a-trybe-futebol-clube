import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const router = Router();

router.get('/teams/:id', TeamsController.getById);
router.get('/teams', TeamsController.getAll);

export default router;
