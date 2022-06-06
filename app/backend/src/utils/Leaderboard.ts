interface IMatch {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export default class Leaderboard {
  static filterByHomeTeamId(arr: IMatch[], id: number) {
    return arr.filter((match: IMatch) => match.homeTeam === id);
  }

  static getTotalPoints(arr: IMatch[]) {
    return arr.reduce((total, match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) return total + 3;
      if (match.homeTeamGoals === match.awayTeamGoals) return total + 1;
      return total;
    }, 0);
  }

  static getTotalGames(arr: IMatch[]) {
    return arr.length;
  }

  static getTotalVictories(arr: IMatch[]) {
    return (arr.filter((match) => match.homeTeamGoals > match.awayTeamGoals)).length;
  }

  static getTotalDraws(arr: IMatch[]) {
    return (arr.filter((match) => match.homeTeamGoals === match.awayTeamGoals)).length;
  }

  static getTotalLosses(arr: IMatch[]) {
    return (arr.filter((match) => match.homeTeamGoals < match.awayTeamGoals)).length;
  }

  static getGoalsFavor(arr: IMatch[]) {
    return arr.reduce((total, match) => total + match.homeTeamGoals, 0);
  }

  static getGoalsOwn(arr: IMatch[]) {
    return arr.reduce((total, match) => total + match.awayTeamGoals, 0);
  }

  static getGoalsBalance(arr: IMatch[]) {
    const goalsFavor = Leaderboard.getGoalsFavor(arr);
    const goalsOwn = Leaderboard.getGoalsOwn(arr);
    return goalsFavor - goalsOwn;
  }

  static getEfficiency(arr: IMatch[]) {
    const totalPoints = Leaderboard.getTotalPoints(arr);
    const totalGames = Leaderboard.getTotalGames(arr);
    const efficiency = 100 * (totalPoints / (totalGames * 3));
    return Math.round((efficiency + Number.EPSILON) * 100) / 100; // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
  }

  static getHomeTeamInfo(arr: IMatch[]) {
    const totalPoints = Leaderboard.getTotalPoints(arr);
    const totalGames = Leaderboard.getTotalGames(arr);
    const totalVictories = Leaderboard.getTotalVictories(arr);
    const totalDraws = Leaderboard.getTotalDraws(arr);
    const totalLosses = Leaderboard.getTotalLosses(arr);
    const goalsFavor = Leaderboard.getGoalsFavor(arr);
    const goalsOwn = Leaderboard.getGoalsOwn(arr);
    const goalsBalance = Leaderboard.getGoalsBalance(arr);
    const efficiency = Leaderboard.getEfficiency(arr);
    return { totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency };
  }
}
