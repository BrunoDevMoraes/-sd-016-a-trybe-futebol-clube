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
      const filtered = Leaderboard.filterByTeamId(finishedMatches, team.id, 'home');
      const teamInfo = Leaderboard.getHomeTeamInfo(filtered);
      return { name: team.teamName, ...teamInfo };
    });
    return Leaderboard.sortArray(allTeamsInfo);
  }

  static async getAwayMatches() {
    const finishedMatches = await Matches.findAll({ where: { inProgress: false } });
    const teams = await Teams.findAll();
    const allTeamsInfo = teams.map((team: ITeam) => {
      const filtered = Leaderboard.filterByTeamId(finishedMatches, team.id, 'away');
      const teamInfo = Leaderboard.getAwayTeamInfo(filtered);
      return { name: team.teamName, ...teamInfo };
    });
    return Leaderboard.sortArray(allTeamsInfo);
  }

  static async getMatches() {
    const finishedMatches = await Matches.findAll({ where: { inProgress: false } });
    const teams = await Teams.findAll();
    const allTeamsInfo = teams.map((team: ITeam) => {
      const filteredHome = Leaderboard.filterByTeamId(finishedMatches, team.id, 'home');
      const filteredAway = Leaderboard.filterByTeamId(finishedMatches, team.id, 'away');
      const teamHomeInfo = Leaderboard.getHomeTeamInfo(filteredHome);
      const teamAwayInfo = Leaderboard.getAwayTeamInfo(filteredAway);
      const teamInfo = Leaderboard.joinHomeAway(teamHomeInfo, teamAwayInfo);
      return { name: team.teamName, ...teamInfo };
    });
    return Leaderboard.sortArray(allTeamsInfo);
  }
}
