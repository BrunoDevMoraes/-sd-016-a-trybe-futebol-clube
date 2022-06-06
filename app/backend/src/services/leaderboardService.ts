import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import Leaderboard from '../utils/Leaderboard';

interface ITeam {
  id: number,
  teamName: string
}

export default class LeaderboardService {
  static async getHomeMatches() {
    const finishedMatches = await Matches.findAll({ where: { inProgress: false } });
    const teams = await Teams.findAll();
    const allTeamsInfo = teams.map((team: ITeam) => {
      const filtered = Leaderboard.filterByHomeTeamId(finishedMatches, team.id);
      const teamInfo = Leaderboard.getHomeTeamInfo(filtered);
      return { name: team.teamName, ...teamInfo };
    });
    allTeamsInfo.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);
    return allTeamsInfo;
  }
}
