import React from 'react'
import { Team } from '../entities/team'
import './GameBoard.css'
import PlayerTileContainer from './PlayerTileContainer'


interface Props {
    gameBoard: number[][],
    teamA: Team,
    teamB: Team
}

function GameBoard( { gameBoard, teamA, teamB } : Props) {

  return (
    <div id='gameboard-container'>
        <div id="gameboard">
            {
                gameBoard!.map((rowContent, rowIndex)=> {
                    return (rowContent.map((player, colIndex)=> {
                        return (
                            <div key={`tile-${colIndex+1}-${rowIndex+1}`} className={`tile ROW${rowIndex + 1} COL${colIndex +1}`}>
                                {
                                    player == 0 ?
                                        <></>
                                        :
                                        player == 1 ?
                                            <PlayerTileContainer team={teamA} colIndex={colIndex} rowIndex={rowIndex} teamLetterProps={"a"}/>
                                            :
                                            <PlayerTileContainer team={teamB} colIndex={colIndex} rowIndex={rowIndex} teamLetterProps={"b"}/>
                                }
                            </div>
                        )
                    }))
                })
            }
        </div>
    </div>
  )
}

export default GameBoard