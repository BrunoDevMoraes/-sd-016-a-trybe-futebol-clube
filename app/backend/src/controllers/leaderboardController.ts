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
}
