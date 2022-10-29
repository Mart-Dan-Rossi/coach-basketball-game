import React from 'react'
import {useEffect, useContext} from 'react';
import { Team } from '../entities/team'
import './GameBoard.css'
import PlayerImgContainer from './PlayerImgContainer'
import {GameContext} from '../context/GameContext';


interface Props {
    gameBoard: number[][],
    teamA: Team,
    teamB: Team
}

function GameBoard( { gameBoard, teamA, teamB } : Props) {

    const {
        setShowConfirmButton,
        setConfirmButtonHandler
      } = useContext(GameContext)

    useEffect(() => {
    }, [gameBoard])

    function paintPlayerOnThisTileAsSelected(team: Team, ubicationScaned: number[]) {
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
                    paintPlayerOnThisTileAsSelected(teamA, thisUbication)

                } else {
                    return("highlighted-tile")
                }

            } else if(teamB.teamTurn && teamNumber == 2) {

                if(teamB.isAPlayerSelected()) {
                    paintPlayerOnThisTileAsSelected(teamB, thisUbication)

                } else {
                    return("highlighted-tile")
                }
            }
        }
    }

    function clickTileHandler(teamNumber: number, col: number, row: number) {
        return ()=> {
            let thisUbication = [col, row]
            if(teamNumber != 0) {
                
                if(teamA.teamTurn && teamNumber == 1) {
                    if(teamA.isAPlayerSelected()) {

                    } else {
                        setConfirmButtonHandler(()=> ()=> selectPlayer(teamA, thisUbication))
                    }
                } else if(teamB.teamTurn && teamNumber == 2) {
                    if(teamA.isAPlayerSelected()) {

                    } else {
                        setConfirmButtonHandler(()=> ()=> selectPlayer(teamB, thisUbication))
                    }
                }
            }
            setShowConfirmButton(true)
        }
    }

    function selectPlayer(team: Team, ubicationScaned: number[]) {
        team.players.forEach(player =>{
            let playerUbication = [player.ubicationX, player.ubicationY]

            if(playerUbication[0] == ubicationScaned[0] && playerUbication[1] == ubicationScaned[1]) {
                player.playerSelected = true
            }
        })
    }
    

  return (
    <div id='gameboard-container'>
        <div id="gameboard">
            {
                gameBoard!.map((rowContent, rowIndex)=> {
                    return (rowContent.map((player, colIndex)=> {
                        return (
                            <div
                                key={`tile-${colIndex+1}-${rowIndex+1}`}
                                className={`tile ROW${rowIndex + 1} COL${colIndex +1} ${detectIfHighlightedNeeded(player, colIndex+1, rowIndex+1)}`}
                                onClick={clickTileHandler(player, colIndex+1, rowIndex+1)}
                            >
                                {
                                    player == 0 ?
                                        <></>
                                        :
                                        player == 1 ?
                                            <PlayerImgContainer team={teamA} col={colIndex+1} row={rowIndex+1} teamLetterProps={"a"}/>
                                            :
                                            <PlayerImgContainer team={teamB} col={colIndex+1} row={rowIndex+1} teamLetterProps={"b"}/>
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