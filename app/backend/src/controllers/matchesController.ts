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
}
