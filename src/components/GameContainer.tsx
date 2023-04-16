import React from 'react'
import GameBoard from './GameBoard';
import {useContext, useEffect, useState} from 'react';
import {GameContext} from '../context/GameContext';
import './GameContainer.css'
import MatchInfo from './MatchInfo';
import MatchActionsContainer from './MatchActionsContainer';
import {Match} from '../entities/match';
import {Player} from '../entities/players';
import {Team} from '../entities/team';

export default function GameContainer() {
    const {
        teamAStats,
        teamBStats,
        gameNarration,
        setGameNarration,
        gameBoard,
        setGameBoard,
      } = useContext(GameContext)

    let newGameBoard = [...gameBoard]

    const teamAInitialPositions = [[13, 1], [13, 5], [13, 9], [13, 14], [14, 8]]
    const teamBInitialPositions = [[16, 2], [16, 6], [16, 10], [16, 15], [15, 8]]

    teamAInitialPositions.forEach(position => {
        newGameBoard[position[1]-1][position[0]-1] = 1
    });
    
    teamBInitialPositions.forEach(position => {
        newGameBoard[position[1]-1][position[0]-1] = 2
    });
    
    const playerA1: Player = new Player(
        teamAStats.playerA1Stats.name,
        "A",
        "1",
        teamAStats.playerA1Stats.height,
        teamAStats.playerA1Stats.weight,
        teamAStats.playerA1Stats.atleticism,
        teamAStats.playerA1Stats.perimeterDefence,
        teamAStats.playerA1Stats.insideDefence,
        teamAStats.playerA1Stats.rebounding,
        teamAStats.playerA1Stats.perimeterScoring,
        teamAStats.playerA1Stats.insideScoring,
        teamAStats.playerA1Stats.playMaking,
        teamAInitialPositions[0][0],
        teamAInitialPositions[0][1]
    )
    
    const playerA2: Player = new Player(
        teamAStats.playerA2Stats.name,
        "A",
        "2",
        teamAStats.playerA2Stats.height,
        teamAStats.playerA2Stats.weight,
        teamAStats.playerA2Stats.atleticism,
        teamAStats.playerA2Stats.perimeterDefence,
        teamAStats.playerA2Stats.insideDefence,
        teamAStats.playerA2Stats.rebounding,
        teamAStats.playerA2Stats.perimeterScoring,
        teamAStats.playerA2Stats.insideScoring,
        teamAStats.playerA2Stats.playMaking,
        teamAInitialPositions[1][0],
        teamAInitialPositions[1][1]
    )
    
    const playerA3: Player = new Player(
        teamAStats.playerA3Stats.name,
        "A",
        "3",
        teamAStats.playerA3Stats.height,
        teamAStats.playerA3Stats.weight,
        teamAStats.playerA3Stats.atleticism,
        teamAStats.playerA3Stats.perimeterDefence,
        teamAStats.playerA3Stats.insideDefence,
        teamAStats.playerA3Stats.rebounding,
        teamAStats.playerA3Stats.perimeterScoring,
        teamAStats.playerA3Stats.insideScoring,
        teamAStats.playerA3Stats.playMaking,
        teamAInitialPositions[2][0],
        teamAInitialPositions[2][1]
    )
    
    const playerA4: Player = new Player(
        teamAStats.playerA4Stats.name,
        "A",
        "4",
        teamAStats.playerA4Stats.height,
        teamAStats.playerA4Stats.weight,
        teamAStats.playerA4Stats.atleticism,
        teamAStats.playerA4Stats.perimeterDefence,
        teamAStats.playerA4Stats.insideDefence,
        teamAStats.playerA4Stats.rebounding,
        teamAStats.playerA4Stats.perimeterScoring,
        teamAStats.playerA4Stats.insideScoring,
        teamAStats.playerA4Stats.playMaking,
        teamAInitialPositions[3][0],
        teamAInitialPositions[3][1]
    )
    
    const playerA5: Player = new Player(
        teamAStats.playerA5Stats.name,
        "A",
        "5",
        teamAStats.playerA5Stats.height,
        teamAStats.playerA5Stats.weight,
        teamAStats.playerA5Stats.atleticism,
        teamAStats.playerA5Stats.perimeterDefence,
        teamAStats.playerA5Stats.insideDefence,
        teamAStats.playerA5Stats.rebounding,
        teamAStats.playerA5Stats.perimeterScoring,
        teamAStats.playerA5Stats.insideScoring,
        teamAStats.playerA5Stats.playMaking,
        teamAInitialPositions[4][0],
        teamAInitialPositions[4][1]
    )
    
    
    const playerB1: Player = new Player(
        teamBStats.playerB1Stats.name,
        "B",
        "1",
        teamBStats.playerB1Stats.height,
        teamBStats.playerB1Stats.weight,
        teamBStats.playerB1Stats.atleticism,
        teamBStats.playerB1Stats.perimeterDefence,
        teamBStats.playerB1Stats.insideDefence,
        teamBStats.playerB1Stats.rebounding,
        teamBStats.playerB1Stats.perimeterScoring,
        teamBStats.playerB1Stats.insideScoring,
        teamBStats.playerB1Stats.playMaking,
        teamBInitialPositions[0][0],
        teamBInitialPositions[0][1]
    )
    
    const playerB2: Player = new Player(
        teamBStats.playerB2Stats.name,
        "B",
        "2",
        teamBStats.playerB2Stats.height,
        teamBStats.playerB2Stats.weight,
        teamBStats.playerB2Stats.atleticism,
        teamBStats.playerB2Stats.perimeterDefence,
        teamBStats.playerB2Stats.insideDefence,
        teamBStats.playerB2Stats.rebounding,
        teamBStats.playerB2Stats.perimeterScoring,
        teamBStats.playerB2Stats.insideScoring,
        teamBStats.playerB2Stats.playMaking,
        teamBInitialPositions[1][0],
        teamBInitialPositions[1][1]
    )
    
    const playerB3: Player = new Player(
        teamBStats.playerB3Stats.name,
        "B",
        "3",
        teamBStats.playerB3Stats.height,
        teamBStats.playerB3Stats.weight,
        teamBStats.playerB3Stats.atleticism,
        teamBStats.playerB3Stats.perimeterDefence,
        teamBStats.playerB3Stats.insideDefence,
        teamBStats.playerB3Stats.rebounding,
        teamBStats.playerB3Stats.perimeterScoring,
        teamBStats.playerB3Stats.insideScoring,
        teamBStats.playerB3Stats.playMaking,
        teamBInitialPositions[2][0],
        teamBInitialPositions[2][1]
    )
    
    const playerB4: Player = new Player(
        teamBStats.playerB4Stats.name,
        "B",
        "4",
        teamBStats.playerB4Stats.height,
        teamBStats.playerB4Stats.weight,
        teamBStats.playerB4Stats.atleticism,
        teamBStats.playerB4Stats.perimeterDefence,
        teamBStats.playerB4Stats.insideDefence,
        teamBStats.playerB4Stats.rebounding,
        teamBStats.playerB4Stats.perimeterScoring,
        teamBStats.playerB4Stats.insideScoring,
        teamBStats.playerB4Stats.playMaking,
        teamBInitialPositions[3][0],
        teamBInitialPositions[3][1]
    )
    
    const playerB5: Player = new Player(
        teamBStats.playerB5Stats.name,
        "B",
        "5",
        teamBStats.playerB5Stats.height,
        teamBStats.playerB5Stats.weight,
        teamBStats.playerB5Stats.atleticism,
        teamBStats.playerB5Stats.perimeterDefence,
        teamBStats.playerB5Stats.insideDefence,
        teamBStats.playerB5Stats.rebounding,
        teamBStats.playerB5Stats.perimeterScoring,
        teamBStats.playerB5Stats.insideScoring,
        teamBStats.playerB5Stats.playMaking,
        teamBInitialPositions[4][0],
        teamBInitialPositions[4][1]
    )
    
    const playersTeamA: Player[] = [playerA1, playerA2, playerA3, playerA4, playerA5]
    const playersTeamB: Player[] = [playerB1, playerB2, playerB3, playerB4, playerB5]
    
    const teamA: Team = new Team("TeamA", playersTeamA)
    const teamB: Team = new Team("TeamB", playersTeamB)
    const match: Match = new Match(teamA, teamB)
    
    const [matchState, setMatchState] = useState(match)  
      
    
    useEffect(() => {
        match.jumpBall(gameNarration, setGameNarration)

    }, [matchState])
    
    
  return (
    <div className='game-container'>
        <MatchInfo match={matchState}/>
        <GameBoard gameBoard={newGameBoard} match={matchState}/>
        <MatchActionsContainer />
    </div>
  )
}
