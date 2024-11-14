export interface GameState {
  currentGuess: string;
  guesses: string[];
  history: GameHistory[];
  gameStatus: 'playing' | 'won' | 'lost';
  currentRowIndex: number;
  solution: string;
}

export interface GameHistory {
  date: string;
  word: string;
  guesses: number;
  won: boolean;
}

export interface Statistics {
  gamesPlayed: number;
  winRate: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface User {
  isAuthenticated: boolean;
  username?: string;
}