import React from 'react'
import {useEffect, useContext} from 'react';
import { Team } from '../entities/team'
import './GameBoard.css'
import PlayerImgContainer from './PlayerImgContainer'
import {GameContext} from '../context/GameContext';
import { compareIniciatives } from '../utilities/exportableFunctions';
import { Player } from '../entities/players';
import { Match } from '../entities/match';


interface Props {
    gameBoard: number[][],
    match: Match,
}

function GameBoard( { gameBoard, match } : Props) {
    const teamA = match.teamA
    const teamB = match.teamB

    const {
        setShowMoveButton,
        setShowStealAttemptButton,
        setShowInterceptPassAttemptButton,
        setShowWaitPressingButton,
        setShowWaitCarefullyButton,
        setShowPassButton,
        setShowDribblingButton,
        setShowWaitWithoutTheBallButton,
        setShowTripleThreatButton,
        setShowShootButton,
        setShowEndTurnButton,
        setActivateConfirmButton,
        setConfirmButtonHandler,
        setGameBoard,
        playerClikedTeamA,
        setPlayerClikedTeamA,
        playerClikedTeamB,
        setPlayerClikedTeamB
      } = useContext(GameContext)

    useEffect(() => {
    }, [gameBoard])

    function paintPlayerOnThisTileAsSelected(team: Team, ubicationScaned: number[]) {
        team.players.forEach(player =>{
            let playerUbication = [player.ubicationX, player.ubicationY]
            
            if(playerUbication[0] == ubicationScaned[0] && playerUbication[1] == ubicationScaned[1]) {
                return (
                    player.playerSelected ? "selected-tile" : "highlighted-tile"
                )
            }
        })
    }

    function showPosibleActionsButtons(teamActivePlayer : Player|undefined, team: Team) {
        if(teamActivePlayer) {
            if(team.teamHaveTheBall()) {
                if(teamActivePlayer.actionPoints > 0.5) {
                    if(teamActivePlayer.haveBall) {
                        setShowTripleThreatButton(true)
                        setShowPassButton(true)
                    }
                }
                if(teamActivePlayer.actionPoints > 1) {
                    if(teamActivePlayer.haveBall) {
                        setShowDribblingButton(true)
                        setShowShootButton(true)
                    } else {
                        setShowMoveButton(true)
                        setShowWaitWithoutTheBallButton(true)
                    }
                }
            } else {
                if(teamActivePlayer.actionPoints > 0.5) {
                    setShowWaitCarefullyButton(true)
                }
                if(teamActivePlayer.actionPoints > 1) {
                    setShowWaitPressingButton(true)
                    setShowMoveButton(true)

                    const otherTeam = team.name == "TeamA" ? teamB : teamA
                    
                    const playerWithBall = otherTeam.returnPlayerWithBall()
                    const xDistance = playerWithBall!.ubicationX! - teamActivePlayer.ubicationX!
                    const yDistance = playerWithBall!.ubicationY! - teamActivePlayer.ubicationY!

                    if(Math.pow(xDistance, 2) == 1 && Math.pow(yDistance, 2) == 1) {
                        setShowStealAttemptButton(true)
                    }
                }
            }
        }
    }

    function addClassIfNeeded(teamNumber: number, col: number, row: number) {
        
        if(teamNumber != 0) {
            let thisUbication = [col, row]

            if(playerClikedTeamA[0] == col && playerClikedTeamA[1] == row || playerClikedTeamB[0] == col && playerClikedTeamB[1] == row){
                return("selected-tile")
            }

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

            let teamAActivePlayer = teamA.returnActivePlayer() as Player|undefined
            let teamBActivePlayer = teamB.returnActivePlayer() as Player|undefined

            let teamAActivePlayerUbication = teamAActivePlayer && [teamAActivePlayer.ubicationX, teamAActivePlayer.ubicationY]
            let teamBActivePlayerUbication = teamBActivePlayer && [teamBActivePlayer.ubicationX, teamBActivePlayer.ubicationY]

            // console.log("this ubication", thisUbication)

            // console.log("teamAActivePlayerUbication", teamAActivePlayerUbication)
            // console.log("teamBActivePlayerUbication", teamBActivePlayerUbication)

            if((teamAActivePlayerUbication && teamAActivePlayerUbication[0] == col && teamAActivePlayerUbication[1] == row) || (teamBActivePlayerUbication && teamBActivePlayerUbication[0] == col && teamBActivePlayerUbication[1] == row)){
                showPosibleActionsButtons(teamAActivePlayer, teamA)
                showPosibleActionsButtons(teamBActivePlayer, teamB)
                        
                return("active-tile")
            }

            return("not-highlighted")

        }
    }

    function clickTileHandler(teamNumber: number, col: number, row: number) {
        return ()=> {
            let thisUbication = [col, row]
            if(teamNumber != 0) {
                
                if(teamNumber == 1) {
                    if(teamA.teamTurn){
                        setPlayerClikedTeamA([col, row])

                        if(!teamA.isAPlayerSelected()) {
                            setConfirmButtonHandler(()=> ()=> confirmPlayerSelection(teamA, thisUbication, teamB))
                        }

                        setActivateConfirmButton(true)
                        setGameBoard(gameBoard)
                    }
                } else if(teamNumber == 2) {
                    if(teamB.teamTurn){
                        setPlayerClikedTeamB([col, row])

                        if(!teamB.isAPlayerSelected()) {
                            setConfirmButtonHandler(()=> ()=> confirmPlayerSelection(teamB, thisUbication, teamA))
                        }

                        setActivateConfirmButton(true)
                        setGameBoard(gameBoard)
                    }
                }
            }
        }
    }
    
    function confirmPlayerSelection(team: Team, ubicationScaned: number[], otherTeam: Team) {
        team.players.forEach(player => {
            let playerUbication = [player.ubicationX, player.ubicationY]
            
            if(playerUbication[0] == ubicationScaned[0] && playerUbication[1] == ubicationScaned[1]) {
                player.playerSelected = true
            }
        })

        let playerActive: Player

        team.teamTurn = false
        team.teamTurnLeft = false

        if(otherTeam.teamTurnLeft) {
            otherTeam.teamTurn = true
        } else {
            playerActive = compareIniciatives(teamA.returnSelectedPlayer()!, teamB.returnSelectedPlayer()!, teamA.teamHaveTheBall())

            playerActive.playerActive = true
            playerActive.playerSelected = false

            if(playerActive.team == "TeamA") {
                setPlayerClikedTeamA([0, 0])
            } else {
                setPlayerClikedTeamB([0, 0])
            }

        }

        setGameBoard(gameBoard)
        setActivateConfirmButton(false)
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
                                className={`tile ROW${rowIndex + 1} COL${colIndex +1} ${addClassIfNeeded(player, colIndex + 1, rowIndex + 1)}`}
                                onClick={clickTileHandler(player, colIndex + 1, rowIndex + 1)}
                            >
                                {
                                    player == 0 ?
                                        <></>
                                        :
                                        player == 1 ?
                                            <PlayerImgContainer team={teamA} col={colIndex+1} row={rowIndex + 1} teamLetterProps={"a"}/>
                                            :
                                            <PlayerImgContainer team={teamB} col={colIndex+1} row={rowIndex + 1} teamLetterProps={"b"}/>
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