import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();

router.get('/leaderboard/home', LeaderboardController.getHomeMatches);
router.get('/leaderboard/away', LeaderboardController.getAwayMatches);

export default router;
