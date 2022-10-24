import React, { useEffect } from 'react'
import { Team } from '../entities/team'
import './GameBoard.css'
import PlayerTileContainer from './PlayerTileContainer'


interface Props {
    gameBoard: number[][],
    teamA: Team,
    teamB: Team
}

function GameBoard( { gameBoard, teamA, teamB } : Props) {

    useEffect(() => {
    }, [gameBoard])
    

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
                                            <PlayerTileContainer team={teamA} col={colIndex+1} row={rowIndex+1} teamLetterProps={"a"}/>
                                            :
                                            <PlayerTileContainer team={teamB} col={colIndex+1} row={rowIndex+1} teamLetterProps={"b"}/>
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