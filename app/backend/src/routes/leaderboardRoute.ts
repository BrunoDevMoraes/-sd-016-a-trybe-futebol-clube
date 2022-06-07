import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();

router.get('/leaderboard/home', LeaderboardController.getHomeMatches);
router.get('/leaderboard/away', LeaderboardController.getAwayMatches);
router.get('/leaderboard', LeaderboardController.getMatches);

export default router;
