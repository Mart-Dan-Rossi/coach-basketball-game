import React, { createContext } from "react"
import { Callback } from "webpack-cli";
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

    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,

    showMoveButton: boolean,
    setShowMoveButton: React.Dispatch<React.SetStateAction<boolean>>,
    showStealAttemptButton: boolean,
    setShowStealAttemptButton: React.Dispatch<React.SetStateAction<boolean>>,
    showInterceptPassAttemptButton: boolean,
    setShowInterceptPassAttemptButton: React.Dispatch<React.SetStateAction<boolean>>,
    showWaitPressingButton: boolean,
    setShowWaitPressingButton: React.Dispatch<React.SetStateAction<boolean>>,
    showWaitCarefullyButton: boolean,
    setShowWaitCarefullyButton: React.Dispatch<React.SetStateAction<boolean>>,
    showPassButton: boolean,
    setShowPassButton: React.Dispatch<React.SetStateAction<boolean>>,
    showDribblingButton: boolean,
    setShowDribblingButton: React.Dispatch<React.SetStateAction<boolean>>,
    showWaitWithoutTheBallButton: boolean,
    setShowWaitWithoutTheBallButton: React.Dispatch<React.SetStateAction<boolean>>,
    showTripleThreatButton: boolean,
    setShowTripleThreatButton: React.Dispatch<React.SetStateAction<boolean>>,
    showShootButton: boolean,
    setShowShootButton: React.Dispatch<React.SetStateAction<boolean>>,
    showEndTurnButton: boolean,
    setShowEndTurnButton: React.Dispatch<React.SetStateAction<boolean>>,
    activateConfirmButton: boolean,
    setActivateConfirmButton: React.Dispatch<React.SetStateAction<boolean>>,

    actionConfirmed: string,
    setActionConfirmed: React.Dispatch<React.SetStateAction<string>>,


    gameBoard: number[][],
    setGameBoard: React.Dispatch<React.SetStateAction<number[][]>>,

    confirmButtonHandler: ()=>void,
    setConfirmButtonHandler: React.Dispatch<React.SetStateAction<()=>void>>,

    tileClicked: number[],
    setTileClicked: React.Dispatch<React.SetStateAction<number[]>>,

    playerClikedTeamA: number[],
    setPlayerClikedTeamA: React.Dispatch<React.SetStateAction<number[]>>,
    playerClikedTeamB: number[],
    setPlayerClikedTeamB: React.Dispatch<React.SetStateAction<number[]>>
}



export const GameContext = createContext<GameContextProps>({} as GameContextProps)