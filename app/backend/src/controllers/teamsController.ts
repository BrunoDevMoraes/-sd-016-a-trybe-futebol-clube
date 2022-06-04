import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  static async getAll(_req: Request, res: Response) {
    try {
      const teams = await TeamsService.getAll();
      return res.status(200).json(teams);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const info = req.params;
      const team = await TeamsService.getById(info.id);
      return res.status(200).json(team);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  }
}
