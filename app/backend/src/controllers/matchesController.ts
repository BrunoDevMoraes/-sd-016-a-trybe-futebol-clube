import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  static async getAll(_req: Request, res: Response) {
    try {
      const matches = await MatchesService.getAll();
      return res.status(200).json(matches);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  }

  static async createMatch(req: Request, res: Response) {
    try {
      const matchInfo = req.body;
      const match = await MatchesService.createMatch(matchInfo);
      return res.status(201).json(match);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  }

  static async changeMatchStatus(req: Request, res: Response) {
    try {
      const payload = req.params;
      const { id } = payload;
      const status = await MatchesService.changeMatchStatus(id);
      return res.status(200).json(status);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  }
}
