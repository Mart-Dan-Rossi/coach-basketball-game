import { createContext } from "react"
import {PlayerEditableInfo, TeamAStats, TeamBStats} from '../entities/myInterfaces';

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
    setTeamBStats: React.Dispatch<React.SetStateAction<TeamBStats>>
}



export const GameContext = createContext<GameContextProps>({} as GameContextProps)