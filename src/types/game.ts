export interface Country {
  name: string;
  flag: string;
}

export interface MultipleChoiceQuestion {
  country: Country;
  options: string[];
}

export type GameMode = "multiple-choice" | "hard" | "capitals";

export interface LeaderboardEntry {
  name: string;
  score: number;
  mode: GameMode;
}