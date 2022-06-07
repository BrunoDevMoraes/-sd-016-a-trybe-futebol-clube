import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class leaderboardController {
  static async getHomeMatches(_req: Request, res: Response) {
    try {
      const leaderboardHome = await LeaderboardService.getHomeMatches();
      return res.status(200).json(leaderboardHome);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  }

  static async getAwayMatches(_req: Request, res: Response) {
    try {
      const leaderboardAway = await LeaderboardService.getAwayMatches();
      return res.status(200).json(leaderboardAway);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  }

  static async getMatches(_req: Request, res: Response) {
    try {
      const leaderboard = await LeaderboardService.getMatches();
      return res.status(200).json(leaderboard);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  }
}
