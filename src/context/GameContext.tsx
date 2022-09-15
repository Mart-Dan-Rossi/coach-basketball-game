import React, { createContext } from "react"
import {PlayerEditableInfo, TeamAStats, TeamBStats, PlayerStats} from '../entities/myInterfaces';

export interface GameContextProps {
    playerA1Stats: PlayerEditableInfo,
    playerA2Stats: PlayerEditableInfo,
    playerA3Stats: PlayerEditableInfo,
    playerA4Stats: PlayerEditableInfo,
    playerA5Stats: PlayerEditableInfo,
    setPlayerA1Stats: React.Dispatch<React.SetStateAction<PlayerEditableInfo>>,
    setPlayerA2Stats: React.Dispatch<React.SetStateAction<PlayerEditableInfo>>,
    setPlayerA3Stats: React.Dispatch<React.SetStateAction<PlayerEditableInfo>>,
    setPlayerA4Stats: React.Dispatch<React.SetStateAction<PlayerEditableInfo>>,
    setPlayerA5Stats: React.Dispatch<React.SetStateAction<PlayerEditableInfo>>,

    teamAStats: TeamAStats,

    setTeamAStats: React.Dispatch<React.SetStateAction<TeamAStats>>,

    playerB1Stats: PlayerEditableInfo,
    playerB2Stats: PlayerEditableInfo,
    playerB3Stats: PlayerEditableInfo,
    playerB4Stats: PlayerEditableInfo,
    playerB5Stats: PlayerEditableInfo,
    setPlayerB1Stats: React.Dispatch<React.SetStateAction<PlayerEditableInfo>>,
    setPlayerB2Stats: React.Dispatch<React.SetStateAction<PlayerEditableInfo>>,
    setPlayerB3Stats: React.Dispatch<React.SetStateAction<PlayerEditableInfo>>,
    setPlayerB4Stats: React.Dispatch<React.SetStateAction<PlayerEditableInfo>>,
    setPlayerB5Stats: React.Dispatch<React.SetStateAction<PlayerEditableInfo>>,

    teamBStats: TeamBStats,
    setTeamBStats: React.Dispatch<React.SetStateAction<TeamBStats>>,

    teamsCreated: boolean,
    setTeamsCreated: React.Dispatch<React.SetStateAction<boolean>>,

    pointsUsedInPlayerA1: number,
    pointsUsedInPlayerA2: number,
    pointsUsedInPlayerA3: number,
    pointsUsedInPlayerA4: number,
    pointsUsedInPlayerA5: number,
    setPointsUsedInPlayerA1: React.Dispatch<React.SetStateAction<number>>,
    setPointsUsedInPlayerA2: React.Dispatch<React.SetStateAction<number>>,
    setPointsUsedInPlayerA3: React.Dispatch<React.SetStateAction<number>>,
    setPointsUsedInPlayerA4: React.Dispatch<React.SetStateAction<number>>,
    setPointsUsedInPlayerA5: React.Dispatch<React.SetStateAction<number>>,

    pointsUsedInStatsPlayerA1: PlayerStats,
    pointsUsedInStatsPlayerA2: PlayerStats,
    pointsUsedInStatsPlayerA3: PlayerStats,
    pointsUsedInStatsPlayerA4: PlayerStats,
    pointsUsedInStatsPlayerA5: PlayerStats,
    setPointsUsedInStatsPlayerA1: React.Dispatch<React.SetStateAction<PlayerStats>>,
    setPointsUsedInStatsPlayerA2: React.Dispatch<React.SetStateAction<PlayerStats>>,
    setPointsUsedInStatsPlayerA3: React.Dispatch<React.SetStateAction<PlayerStats>>,
    setPointsUsedInStatsPlayerA4: React.Dispatch<React.SetStateAction<PlayerStats>>,
    setPointsUsedInStatsPlayerA5: React.Dispatch<React.SetStateAction<PlayerStats>>,
    
    pointsUsedInPlayerB1: number,
    pointsUsedInPlayerB2: number,
    pointsUsedInPlayerB3: number,
    pointsUsedInPlayerB4: number,
    pointsUsedInPlayerB5: number,
    setPointsUsedInPlayerB1: React.Dispatch<React.SetStateAction<number>>,
    setPointsUsedInPlayerB2: React.Dispatch<React.SetStateAction<number>>,
    setPointsUsedInPlayerB3: React.Dispatch<React.SetStateAction<number>>,
    setPointsUsedInPlayerB4: React.Dispatch<React.SetStateAction<number>>,
    setPointsUsedInPlayerB5: React.Dispatch<React.SetStateAction<number>>
    
    pointsUsedInStatsPlayerB1: PlayerStats,
    pointsUsedInStatsPlayerB2: PlayerStats,
    pointsUsedInStatsPlayerB3: PlayerStats,
    pointsUsedInStatsPlayerB4: PlayerStats,
    pointsUsedInStatsPlayerB5: PlayerStats,
    setPointsUsedInStatsPlayerB1: React.Dispatch<React.SetStateAction<PlayerStats>>,
    setPointsUsedInStatsPlayerB2: React.Dispatch<React.SetStateAction<PlayerStats>>,
    setPointsUsedInStatsPlayerB3: React.Dispatch<React.SetStateAction<PlayerStats>>,
    setPointsUsedInStatsPlayerB4: React.Dispatch<React.SetStateAction<PlayerStats>>,
    setPointsUsedInStatsPlayerB5: React.Dispatch<React.SetStateAction<PlayerStats>>,

    teamAScore: number,
    setTeamAScore: React.Dispatch<React.SetStateAction<number>>,

    teamBScore: number,
    setTeamBScore: React.Dispatch<React.SetStateAction<number>>,

    gameClockMin: number,
    setGameClockMin: React.Dispatch<React.SetStateAction<number>>,

    gameClockSec: number,
    setGameClockSec: React.Dispatch<React.SetStateAction<number>>,

    gameQuarter: number,
    setGameQuarter: React.Dispatch<React.SetStateAction<number>>,
}



export const GameContext = createContext<GameContextProps>({} as GameContextProps)