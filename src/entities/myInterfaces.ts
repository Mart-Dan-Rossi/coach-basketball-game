import { Match } from "./match";

export type PlayerEditableStatsKeys =
  | "height"
  | "weight"
  | "atleticism"
  | "perimeterDefence"
  | "insideDefence"
  | "rebounding"
  | "perimeterScoring"
  | "insideScoring"
  | "playMaking"
  | null;
export interface PlayerEditableInfo {
  name: string;
  position: string;
  height: number;
  weight: number;
  atleticism: number;
  perimeterDefence: number;
  insideDefence: number;
  rebounding: number;
  perimeterScoring: number;
  insideScoring: number;
  playMaking: number;
}

export interface PlayerStats {
  height: number;
  weight: number;
  atleticism: number;
  perimeterDefence: number;
  insideDefence: number;
  rebounding: number;
  perimeterScoring: number;
  insideScoring: number;
  playMaking: number;
  position?: string;
}

export interface TeamAStats {
  playerA1Stats: PlayerEditableInfo;
  playerA2Stats: PlayerEditableInfo;
  playerA3Stats: PlayerEditableInfo;
  playerA4Stats: PlayerEditableInfo;
  playerA5Stats: PlayerEditableInfo;
}

export interface TeamBStats {
  playerB1Stats: PlayerEditableInfo;
  playerB2Stats: PlayerEditableInfo;
  playerB3Stats: PlayerEditableInfo;
  playerB4Stats: PlayerEditableInfo;
  playerB5Stats: PlayerEditableInfo;
}

export interface QuarterTimeLeft {
  minutes: number;
  seconds: number;
}

export interface TeamGameStats {
  points: number;
  fieldGoalsMade: number;
  fieldGoalsattempt: number;
  triplesMade: number;
  triplesAttempt: number;
  freeThrowsMade: number;
  freeThrowsAttempt: number;
  assists: number;
  turnOvers: number;
  rebounds: number;
  offensiveRebounds: number;
  blocks: number;
  steals: number;
  totalFouls: number;
  foulsInQuarter: number;
}

export interface PlayerGameStats {
  points: number;
  fieldGoalsMade: number;
  fieldGoalsattempt: number;
  triplesMade: number;
  triplesAttempt: number;
  freeThrowsMade: number;
  freeThrowsAttempt: number;
  assists: number;
  turnOvers: number;
  rebounds: number;
  offensiveRebounds: number;
  blocks: number;
  steals: number;
  fouls: number;
}

export interface GameStats {
  teamAStats: TeamGameStats;
  teamBStats: TeamGameStats;
}

export type Coordinate = [number, number];

export type ValidPositions = "G" | "SG" | "SF" | "PF" | "C" | "Not detected";

export type MatchHistoryEntry = {
  match: Match;
  gameBoard: number[][];
  action: string;
};
