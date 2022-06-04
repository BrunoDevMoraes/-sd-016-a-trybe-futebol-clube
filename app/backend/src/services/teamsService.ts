import Teams from '../database/models/Teams';

export default class TeamsService {
  static async getAll() {
    const teams = Teams.findAll();
    return teams;
  }

  static async getById(id: string) {
    const team = Teams.findByPk(id);
    return team;
  }
}
