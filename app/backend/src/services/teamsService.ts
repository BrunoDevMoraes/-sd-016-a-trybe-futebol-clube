import Teams from '../database/models/Teams';

export default class TeamsService {
  static async getAll() {
    const teams = Teams.findAll();
    return teams;
  }
}
