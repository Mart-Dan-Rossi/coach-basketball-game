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

    function checkSelectedPlayerOnThisTile(team: Team, ubicationScaned: number[]) {
        team.players.forEach(player =>{
            let playerUbication = [player.ubicationX, player.ubicationY]

            if(playerUbication[0] == ubicationScaned[0] && playerUbication[1] == ubicationScaned[1]) {
                return (
                    player.playerSelected ? "selected-tile" : ""
                )
            }
        })
    }

    function detectIfHighlightedNeeded(teamNumber: number, col: number, row: number) {
        
        if(teamNumber != 0) {
            let thisUbication = [col, row]

            if(teamA.teamTurn && teamNumber == 1) {

                if(teamA.isAPlayerSelected()) {
                    checkSelectedPlayerOnThisTile(teamA, thisUbication)

                } else {
                    return("highlighted-tile")
                }

            } else if(teamB.teamTurn && teamNumber == 2) {

                if(teamB.isAPlayerSelected()) {
                    checkSelectedPlayerOnThisTile(teamB, thisUbication)

                } else {
                    return("highlighted-tile")
                }
            }
        }
    }
    

  return (
    <div id='gameboard-container'>
        <div id="gameboard">
            {
                gameBoard!.map((rowContent, rowIndex)=> {
                    return (rowContent.map((player, colIndex)=> {
                        return (
                            <div key={`tile-${colIndex+1}-${rowIndex+1}`} className={`tile ROW${rowIndex + 1} COL${colIndex +1} ${detectIfHighlightedNeeded(player, colIndex+1, rowIndex+1)}`}>
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