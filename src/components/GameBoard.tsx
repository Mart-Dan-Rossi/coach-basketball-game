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
    setMatchState: React.Dispatch<React.SetStateAction<Match>>
}

function GameBoard( { gameBoard, match, setMatchState } : Props) {
    const teamA = match.teamA
    const teamB = match.teamB

    const {
        actionConfirmed,
        setActionConfirmed,
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
        activateConfirmButton,
        setActivateConfirmButton,
        confirmButtonHandler,
        setConfirmButtonHandler,
        finalisingAction,
        setFinalisingAction,
        setGameBoard,
        tileClicked,
        setTileClicked,
        playerClikedTeamA,
        setPlayerClikedTeamA,
        playerClikedTeamB,
        setPlayerClikedTeamB,
    } = useContext(GameContext)

    useEffect(() => {
    }, [gameBoard])

    function hideActionsButtons() {
      setShowMoveButton(false)
      setShowStealAttemptButton(false)
      setShowInterceptPassAttemptButton(false)
      setShowWaitPressingButton(false)
      setShowWaitCarefullyButton(false)
      setShowPassButton(false)
      setShowDribblingButton(false)
      setShowWaitWithoutTheBallButton(false)
      setShowTripleThreatButton(false)
      setShowShootButton(false)
      setShowEndTurnButton(false)
    }

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
            //End turn button is allways shown
            setShowEndTurnButton(true)

            //If the player is part of the atacking team
            if(team.getPlayerWithBallOrUndefined()) {
                //And have more than 0.5 action points
                if(teamActivePlayer.actionPoints > 0.5) {
                    if(teamActivePlayer.haveBall) {
                        setShowTripleThreatButton(true)
                        setShowPassButton(true)
                    }
                }
                //And have more than 1 action point
                if(teamActivePlayer.actionPoints > 1) {
                    if(teamActivePlayer.haveBall) {
                        setShowDribblingButton(true)
                        setShowShootButton(true)
                    } else {
                        setShowMoveButton(true)
                        setShowWaitWithoutTheBallButton(true)
                    }
                }

            //Else if the player is part of the defending team
            } else {

                //And have more than 0.5 action points
                if(teamActivePlayer.actionPoints > 0.5) {
                    setShowWaitCarefullyButton(true)
                }

                //And have more than 1 action point
                if(teamActivePlayer.actionPoints > 1) {
                    setShowWaitPressingButton(true)
                    setShowMoveButton(true)

                    //And check if ther's an atacking player with the ball next to him
                    const otherTeam = team.name == "TeamA" ? teamB : teamA

                    // console.log("team: ", team, "otherTeam: ", otherTeam)
                    
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
        //TODO add cases where choaches have to pick a tile to do an action
        
        let thisUbication = [col, row]
        let activePlayer = match.getActivePlayer()!
        
        if(actionConfirmed == "move") {
            hideActionsButtons()
            
            if(finalisingAction) {
                setActivateConfirmButton(false)
                
            }

            for(let dx = -1; dx < 2; dx++) {
                for(let dy = -1; dy < 2; dy ++) {
                    //Don't add class to player tile

                    if(!(dx == 0 && dy == 0)) {
                        //If the scanned ubication is around the active player
                        if(activePlayer.ubicationX! + dx == thisUbication[0] && activePlayer.ubicationY! + dy == thisUbication[1]) {

                            //The player have more than 1.5 action points and the tile is in the diagonal or less than 1.5 points and the sile is next to the player
                            if((activePlayer.actionPoints >= 1.5 && (Math.pow(dx, 2) + Math.pow(dy, 2) == 2)) || (activePlayer.actionPoints >= 1 && (dx == 0 || dy == 0))) {
                                
                                if(teamNumber == 0) {
                                    if(tileClicked[0] == thisUbication[0] && tileClicked[1] == thisUbication[1]){
                                        return("selected-tile pointer")
                                    } else {
                                        return("highlighted-tile pointer")

                                    }

                                }
                            }
                        }
                    }
                }
            }
        }
        
        if(teamNumber != 0) {

            if(playerClikedTeamA[0] == col && playerClikedTeamA[1] == row || playerClikedTeamB[0] == col && playerClikedTeamB[1] == row) {
                return("selected-tile")
            }

            if(teamA.teamTurn && teamNumber == 1) {

                if(teamA.isAnyPlayerSelected()) {
                    paintPlayerOnThisTileAsSelected(teamA, thisUbication)

                } else {
                    return("highlighted-tile")
                }

            } else if(teamB.teamTurn && teamNumber == 2) {

                if(teamB.isAnyPlayerSelected()) {
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

            if((teamAActivePlayerUbication && teamAActivePlayerUbication[0] == col && teamAActivePlayerUbication[1] == row) || (teamBActivePlayerUbication && teamBActivePlayerUbication[0] == col && teamBActivePlayerUbication[1] == row)) {
                showPosibleActionsButtons(teamAActivePlayer, teamA)
                showPosibleActionsButtons(teamBActivePlayer, teamB)
                        
                return("active-tile")
            }

            return("not-highlighted")

        }
    }

    function movePlayer(activePlayer: Player, thisUbication: number[]) {   
        
        setActionConfirmed("")

        console.log(activePlayer)
        console.log(activePlayer.ubicationX!, activePlayer.ubicationY!)
        console.log(gameBoard)
        gameBoard[activePlayer.ubicationY!-1][activePlayer.ubicationX!-1] = 0
        
        activePlayer.ubicationX = thisUbication[0]
        activePlayer.ubicationY = thisUbication[1]


        gameBoard[thisUbication[1] - 1][thisUbication[0] - 1] = activePlayer.team == "teamA" ? 1 : 2

        match.handleSelectedPlayersStatus()

        setMatchState(match)

        setGameBoard(gameBoard)

        // console.log(match)
        // console.log(gameBoard)
        setActivateConfirmButton(false)
    }

    let currentActivePlayer = ["", 0]

    function clickTileHandler(teamNumber: number, col: number, row: number) {
        //TODO add cases where choaches have to pick a tile to do an action
        if(actionConfirmed == "move") {
            return ()=> {
                let thisUbication = [col, row]
                let activePlayer = match.getActivePlayer()!
            
                for(let dx = -1; dx < 2; dx++) {
                    for(let dy = -1; dy < 2; dy ++) {
                        //Don't add class to player tile
                    
                        if(!(dx == 0 && dy == 0)) {
                            //If the scanned ubication is around the active player
                            if(activePlayer.ubicationX! + dx == thisUbication[0] && activePlayer.ubicationY! + dy == thisUbication[1]) {
                                //The player have more than 1.5 action points and the tile is in the diagonal or less than 1.5 points and the sile is next to the player
                                if((activePlayer.actionPoints >= 1.5 && (Math.pow(dx, 2) + Math.pow(dy, 2) == 2)) || (activePlayer.actionPoints >= 1 && (dx == 0 || dy == 0))) {
                                    
                                    if(teamNumber == 0) {
                                        currentActivePlayer = [activePlayer.team, activePlayer.position]
                                        setTileClicked(thisUbication)
                                        setMatchState(match)
                                        setFinalisingAction(false)
                                        
                                        setConfirmButtonHandler(()=> ()=>{
                                            let pIATeam = currentActivePlayer[0] == "TeamA" ? teamA : teamB
                                            let pIA = pIATeam.players[currentActivePlayer[1] as number]

                                            movePlayer(pIA!, thisUbication)
                                        })
                                    }
                                    
                                    setActivateConfirmButton(true)
                                    setGameBoard(gameBoard)
                                }
                            }
                        }
                    }
                }
            }
        } else {
            return ()=> {
                
                let thisUbication = [col, row]
                
                if(teamNumber != 0) {
                    
                    if(teamNumber == 1) {
                        if(teamA.teamTurn){
                            setPlayerClikedTeamA([col, row])
    
                            if(!teamA.isAnyPlayerSelected()) {
                                setConfirmButtonHandler(()=> ()=> confirmPlayerSelection(teamA, thisUbication, teamB))
                            }
    
                            setActivateConfirmButton(true)
                            setGameBoard(gameBoard)
                        }
                    } else if(teamNumber == 2) {
                        if(teamB.teamTurn){
                            setPlayerClikedTeamB([col, row])
    
                            if(!teamB.isAnyPlayerSelected()) {
                                setConfirmButtonHandler(()=> ()=> confirmPlayerSelection(teamB, thisUbication, teamA))
                            }
    
                            setActivateConfirmButton(true)
                            setGameBoard(gameBoard)
                        }
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
            playerActive = compareIniciatives(teamA.returnSelectedPlayer()!, teamB.returnSelectedPlayer()!, teamA.getPlayerWithBallOrUndefined())

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