interface IMatch {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

interface ITeamInfo {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
}

export default class Leaderboard {
  static filterByTeamId(arr: IMatch[], id: number, option: string) {
    if (option === 'home') return arr.filter((match: IMatch) => match.homeTeam === id);
    return arr.filter((match: IMatch) => match.awayTeam === id);
  }

  static getTotalPoints(arr: IMatch[], option: string) {
    if (option === 'home') {
      return arr.reduce((total, match) => {
        if (match.homeTeamGoals > match.awayTeamGoals) return total + 3;
        if (match.homeTeamGoals === match.awayTeamGoals) return total + 1;
        return total;
      }, 0);
    }
    return arr.reduce((total, match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) return total + 3;
      if (match.awayTeamGoals === match.homeTeamGoals) return total + 1;
      return total;
    }, 0);
  }

  static getTotalGames(arr: IMatch[]) {
    return arr.length;
  }

  static getTotalVictories(arr: IMatch[], option: string) {
    if (option === 'home') {
      return (arr.filter((match) => match.homeTeamGoals > match.awayTeamGoals)).length;
    }
    return (arr.filter((match) => match.awayTeamGoals > match.homeTeamGoals)).length;
  }

  static getTotalDraws(arr: IMatch[]) {
    return (arr.filter((match) => match.homeTeamGoals === match.awayTeamGoals)).length;
  }

  static getTotalLosses(arr: IMatch[], option: string) {
    if (option === 'home') {
      return (arr.filter((match) => match.homeTeamGoals < match.awayTeamGoals)).length;
    }
    return (arr.filter((match) => match.awayTeamGoals < match.homeTeamGoals)).length;
  }

  static getGoalsFavor(arr: IMatch[], option: string) {
    if (option === 'home') {
      return arr.reduce((total, match) => total + match.homeTeamGoals, 0);
    }
    return arr.reduce((total, match) => total + match.awayTeamGoals, 0);
  }

  static getGoalsOwn(arr: IMatch[], option: string) {
    if (option === 'home') {
      return arr.reduce((total, match) => total + match.awayTeamGoals, 0);
    }
    return arr.reduce((total, match) => total + match.homeTeamGoals, 0);
  }

  static getGoalsBalance(arr: IMatch[], option: string) {
    if (option === 'home') {
      const goalsFavor = Leaderboard.getGoalsFavor(arr, 'home');
      const goalsOwn = Leaderboard.getGoalsOwn(arr, 'home');
      return goalsFavor - goalsOwn;
    }
    const goalsFavor = Leaderboard.getGoalsFavor(arr, 'away');
    const goalsOwn = Leaderboard.getGoalsOwn(arr, 'away');
    return goalsFavor - goalsOwn;
  }

  static getEfficiency(arr: IMatch[], option: string) {
    if (option === 'home') {
      const totalPoints = Leaderboard.getTotalPoints(arr, 'home');
      const totalGames = Leaderboard.getTotalGames(arr);
      const efficiency = 100 * (totalPoints / (totalGames * 3));
      return Math.round((efficiency + Number.EPSILON) * 100) / 100; // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
    }
    const totalPoints = Leaderboard.getTotalPoints(arr, 'away');
    const totalGames = Leaderboard.getTotalGames(arr);
    const efficiency = 100 * (totalPoints / (totalGames * 3));
    return Math.round((efficiency + Number.EPSILON) * 100) / 100;
  }

  static getHomeTeamInfo(arr: IMatch[]) {
    const totalPoints = Leaderboard.getTotalPoints(arr, 'home');
    const totalGames = Leaderboard.getTotalGames(arr);
    const totalVictories = Leaderboard.getTotalVictories(arr, 'home');
    const totalDraws = Leaderboard.getTotalDraws(arr);
    const totalLosses = Leaderboard.getTotalLosses(arr, 'home');
    const goalsFavor = Leaderboard.getGoalsFavor(arr, 'home');
    const goalsOwn = Leaderboard.getGoalsOwn(arr, 'home');
    const goalsBalance = Leaderboard.getGoalsBalance(arr, 'home');
    const efficiency = Leaderboard.getEfficiency(arr, 'home');
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

  static getAwayTeamInfo(arr: IMatch[]) {
    const totalPoints = Leaderboard.getTotalPoints(arr, 'away');
    const totalGames = Leaderboard.getTotalGames(arr);
    const totalVictories = Leaderboard.getTotalVictories(arr, 'away');
    const totalDraws = Leaderboard.getTotalDraws(arr);
    const totalLosses = Leaderboard.getTotalLosses(arr, 'away');
    const goalsFavor = Leaderboard.getGoalsFavor(arr, 'away');
    const goalsOwn = Leaderboard.getGoalsOwn(arr, 'away');
    const goalsBalance = Leaderboard.getGoalsBalance(arr, 'away');
    const efficiency = Leaderboard.getEfficiency(arr, 'away');
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

  static sortArray(arr: ITeamInfo[]) {
    arr.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);
    return arr;
  }
}
