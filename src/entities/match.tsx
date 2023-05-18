import { QuarterTimeLeft } from "./myInterfaces";
import { Team } from "./team";
import {roll20SidesDice, numberEntire, playerZone, ranges, checkTilesThatWillInfluenceInTheCalculations} from '../utilities/exportableFunctions';
import React from "react";
import { Player } from "./players";


export class Match {
    teamA: Team
    teamB: Team

    //Match status
    teamTurn: string
    shotHasBeenAttempted: boolean

    //Match basic info
    quarter: number
    timeLeft: QuarterTimeLeft
    shotClock: number
    turnOver: boolean
    gameOver: boolean
    
    constructor(teamA: Team, teamB: Team) {
        //Change validation
        // if(teams.length != 2) throw new Error(`Match can stast only with 2 teams. You have ${teams.length}`)
        this.teamA = teamA
        this.teamB = teamB
        
        //Match status
        this.teamTurn = ""
        this.shotHasBeenAttempted = false
        
        //Match basic info
        this.quarter = 1
        this.timeLeft = { minutes: 6, seconds: 0 }
        this.shotClock = 24
        this.turnOver = false
        this.gameOver = false
    }

    //--------------------------------------START GET INFO METHODS------------------------------------------------------------------------------------------------------------

    getActivePlayer() {
        let activePlayer = this.teamA.returnActivePlayer() ?? this.teamB.returnActivePlayer()

        return activePlayer as Player | undefined
    }

    getShooter() {
        let shooter = undefined

        //Get the shooter if it's on the teamA
        shooter = this.teamA.getShooter()

        //Else, get the shooter on the teamB
        !shooter && (shooter = this.teamB.getShooter())
        
        return shooter
    }
    
    getSelectedPlayers() {
        let teamASelectedPlayer: Player | undefined
        let teamBSelectedPlayer: Player | undefined
        
        this.teamA.isAnyPlayerSelected() && (teamASelectedPlayer = this.teamA.getSelectedPlayer())
        this.teamB.isAnyPlayerSelected() && (teamBSelectedPlayer = this.teamB.getSelectedPlayer())
        
        return [teamASelectedPlayer, teamBSelectedPlayer]
    }
    
    //---------------------------------------END GET INFO METHODS-------------------------------------------------------------------------------------------------------------
    
    
    //-----------------------------------START PLAYER ACTIONS METHODS---------------------------------------------------------------------------------------------------------


    jumpBall(gameNarration: string[], setGameNarration: React.Dispatch<React.SetStateAction<string[]>>) {        
        let pointsObteinedInTheJumpBallA = 0
        let pointsObteinedInTheJumpBallB = 0
        
        let newGameNarration = [...gameNarration]
        
        //I loop the calculation until ther's a winner
        while (pointsObteinedInTheJumpBallA === pointsObteinedInTheJumpBallB) {
            
            //Check the centers points in the jump ball
            this.teamA.players.forEach(player => {
                if(player.position === "5") {
                    pointsObteinedInTheJumpBallA = numberEntire(roll20SidesDice() + player.height + player.atleticism)
                    
                    //Give feedback
                    newGameNarration.unshift(`${player.name === "" ? "The center of team A" : player.name}, get ${pointsObteinedInTheJumpBallA} points in the jump`)
                    setGameNarration(newGameNarration)
                }
            });
            
            //Check the centers points in the jump ball
            this.teamB.players.forEach(player => {
                if(player.position === "5") {
                    pointsObteinedInTheJumpBallB = numberEntire(roll20SidesDice() + player.height + player.atleticism)
                    
                    //Give feedback
                    newGameNarration.unshift(`${player.name === "" ? "The center of team B" : player.name}, get ${pointsObteinedInTheJumpBallB} points in the jump`) 
                    setGameNarration(newGameNarration)
                }
            })
            
            //Check who win the jump ball
            let whoWinTheJump = pointsObteinedInTheJumpBallA - pointsObteinedInTheJumpBallB;
            
            if (whoWinTheJump > 0) {
                //If teamA won the jump ball give it to the PG of that team
                this.teamA.players.forEach(player => {
                    if(player.position === "1") {
                        player.setHaveBall(true)
                        
                        //Give feedback
                        newGameNarration.unshift(`${this.teamA.name} won the jump. Now ${player.name === "" ? "the PG of team A" : player.name} have the ball.`)
                        setGameNarration(newGameNarration)
                        
                        this.setTeamTurn("TeamB")
                        
                    }
                });
            } else if (whoWinTheJump < 0) {
                //If teamB won the jump ball give it to the PG of that team
                this.teamB.players.forEach(player => {
                    if(player.position === "1") {
                        player.setHaveBall(true)
                        
                        //Give feedback
                        newGameNarration.unshift(`${this.teamB.name} won the jump. Now ${player.name === "" ? "the PG of team B" : player.name} have the ball.`)
                        setGameNarration(newGameNarration)
                        
                        this.setTeamTurn("TeamA")
                        
                    }
                });
            } else {
                
                //Give feedback
                newGameNarration.unshift(`Both players touch the ball at the same time! The jump ball continues`)
                setGameNarration(newGameNarration)
            }
        };
        
        //Set the team with the ball
        if(this.teamTurn == "TeamA") {
            this.teamA.setTeamTurn(true)
        } else if(this.teamTurn == "TeamB") {
            this.teamB.setTeamTurn(true)
        }
        
        //Give players action points
        this.teamA.giveActionPointsToTeam()
        this.teamB.giveActionPointsToTeam()
        
        //Run clock
        this.runClock()
    }
    
    handlePassAction(passer: Player, receiver: Player, gameBoard: number[][]) {
        //First i get what's the defending team
        let teamDefending = passer.team == this.teamA.name ? this.teamB.name : this.teamA.name;
        let totalDefensivePoints = 0;
        
        //I'll use this to know who is the most likley defender to steal the ball. It have the player with the highest defensive points and the number of points he got
        let defensorWithTheHighestDefensivePoints = [undefined, undefined] as [Player|undefined, number|undefined];
        
        //The i get the pass points
        let passPoints = passer.playMaking * 5 + passer.height * 2 + roll20SidesDice() * 5;
        
        //The passer get a boost if he used the tripple threat beffore
        if(passer.lastAction == "Tripple threat") {
            passPoints = passPoints * 1.2
        }
        
        //Then i get the ubications that will have inpact in the calculation
        let tilesThatWillInfluenceInCalculations = checkTilesThatWillInfluenceInTheCalculations(gameBoard, [passer.ubicationX!, passer.ubicationY!], [receiver.ubicationX!, receiver.ubicationY!])
        
        
        function calculateDefensivePointsPerDefensor(player: Player, inPassLine: boolean)  {
            let points = 0;
            let playerZoneUbication = playerZone(player, player.team == "TeamB")
            
            //Do math to calculate points on each sector
            if(playerZoneUbication == "error") {
                points = 0
                
            } else if(playerZoneUbication == ranges.closeToTheRim.id) {
                points = player.insideDefence * 3 + player.atleticism + player.height - 190 + roll20SidesDice() * 3
                
            } else if(playerZoneUbication == ranges.inShortRange.id || playerZoneUbication == ranges.behindTheBoard.id) {
                points = player.insideDefence * 1.5 + player.perimetrerDefence * 1.5 + player.atleticism + player.height * 0.5 - 170 + roll20SidesDice() * 3
                
            } else if(playerZoneUbication == ranges.inMidRange.id) {
                points = player.insideDefence + player.perimetrerDefence * 2 + player.atleticism + 100 / (player.weight - 50) + roll20SidesDice() * 3
                
            } else if(playerZoneUbication as number >= ranges.outsideThe3PointLine.id) {
                points = player.perimetrerDefence * 3 + player.atleticism + 100 / (player.weight) + roll20SidesDice() * 3
                
            }
            
            if(!inPassLine) {
                points = points * 0.2
            }
            
            if(defensorWithTheHighestDefensivePoints[1]! < points) {
                defensorWithTheHighestDefensivePoints = [player, points]
            }
            
            return points
            
        }
        
        function checkDefensivePlayersPoints(i: number, team: Team, arrayOfUbications: any[] | [number[]], inPassLine: boolean) {
            //Check every player to know his defensive points for this situation
            team.players.forEach(player => {
                if(player.ubicationX == arrayOfUbications[i][0] && player.ubicationY == arrayOfUbications[i][1]) {
                    let defensivePlayerPoints = 0
                    defensivePlayerPoints = calculateDefensivePointsPerDefensor(player, inPassLine)
                    
                    if(player.lastAction == "Overwhelming waiting") {
                        defensivePlayerPoints = defensivePlayerPoints * 1.2
                    }
                    
                    totalDefensivePoints += defensivePlayerPoints
                    
                }
            });
        }
        
        //I loop on the tiles where the ball goes over to set the defender team points in this situation
        for(let i=0; i < tilesThatWillInfluenceInCalculations[0].length; i++) {
            if(teamDefending == this.teamA.name) {
                checkDefensivePlayersPoints(i, this.teamA, tilesThatWillInfluenceInCalculations[0], true)
                
            } else if(teamDefending == this.teamB.name) {
                checkDefensivePlayersPoints(i, this.teamB, tilesThatWillInfluenceInCalculations[0], true)
            }
            
        }
        
        //I loop on the tiles where the ball goes close to it to set the defender team points in this situation
        for(let i=0; i < tilesThatWillInfluenceInCalculations[1].length; i++) {
            if(teamDefending == this.teamA.name) {
                checkDefensivePlayersPoints(i, this.teamA, tilesThatWillInfluenceInCalculations[1], false)
                
            } else if(teamDefending == this.teamB.name) {
                checkDefensivePlayersPoints(i, this.teamB, tilesThatWillInfluenceInCalculations[1], false)
                
            }
        }

        passer.setLastAction("pass")
        passer.restActionPoints(0.5)
        passer.setHaveBall(false)

        //If the pass have more points than the defensive points
        if(passPoints >= totalDefensivePoints) {
            //The receiver gets the ball
            receiver.setHaveBall(true)

        //If the total defensive points are higher than pass points
        } else {
            //The player with the highest defensive points involved in this situation steal the ball
            defensorWithTheHighestDefensivePoints[0]!.setHaveBall(true)            
        }
    }
    
    calculateIfDribblingIsSuccesfull(dribbler: Player, endingUbication: number[], gameBoard: [[]]) {
        let tilesThatWillInfluenceInCalculations = checkTilesThatWillInfluenceInTheCalculations(gameBoard, [dribbler.ubicationX!, dribbler.ubicationY!], endingUbication)
        //TODO end this function (and remember to return the correct player, not the dribbler)
        
        
        //It returns a boolean saying if the dribbling is succesfull and the higher player defensive point to give him the ball in case the dribbling is not succesfull.
        return [true, dribbler]
    }
    
    calculateShotResult() {
        //First i get the shooter
        let shooter = this.getShooter()!

        //Then i get the defender team
        let defendingTeam = shooter.team == "TeamA" ? this.teamB : this.teamA
        
        //I get in what part of the field is him located to calculate with the propper math
        let shooterZoneUbication = playerZone(shooter, shooter.team == "TeamB")
        
        function getShooterPointsInShot() {
            let shooterPointsInShot = 0
            
            let multiplier = 1
            if(shooter.lastAction == "Triple threat") {
                multiplier = 1.2
            }

            //TODO Do math to calculate points on each sector
            if(shooterZoneUbication == "error") {
                shooterPointsInShot = 0
                
            } else if(/*TODO isFreeThrow*/ false) {
                shooterPointsInShot = 0
                
            } else if(shooterZoneUbication == ranges.closeToTheRim.id) {
                shooterPointsInShot = (shooter.insideScoring * 5 + shooter.playMaking * 0.5 + shooter.atleticism * 3 + shooter.getWeightPoints() * 2 + shooter.getHeightPoints() * 2 + roll20SidesDice() * 5) * multiplier
                
            } else if(shooterZoneUbication == ranges.inShortRange.id || shooterZoneUbication == ranges.behindTheBoard.id) {
                shooterPointsInShot = (shooter.insideScoring * 4 + shooter.perimetrerScoring * 0.5 + shooter.playMaking * 1.5 + shooter.atleticism * 3 + shooter.getWeightPoints() + shooter.getHeightPoints() + roll20SidesDice() * 5) * multiplier
                
            } else if(shooterZoneUbication == ranges.inMidRange.id) {
                shooterPointsInShot = (shooter.insideScoring + shooter.perimetrerScoring * 4 + shooter.playMaking * 1.5 + shooter.getHeightPoints() + roll20SidesDice() * 5) * multiplier
                
            } else if(shooterZoneUbication == ranges.outsideThe3PointLine.id) {
                shooterPointsInShot = (shooter.perimetrerScoring * 6 + shooter.playMaking - shooter.getHeightPoints() * 0.5 - shooter.getWeightPoints() * 0.5 + roll20SidesDice() * 4.5) * multiplier
                
            } else if(shooterZoneUbication == ranges.long3Range.id) {
                shooterPointsInShot = (shooter.perimetrerScoring * 5 + shooter.playMaking * 0.5 - shooter.getHeightPoints() * 0.5 - shooter.getWeightPoints() + roll20SidesDice() * 3.5) * multiplier
                
            } else if(shooterZoneUbication == ranges.halfCourt.id) {
                shooterPointsInShot = (shooter.perimetrerScoring * 4 - shooter.getHeightPoints() * 0.5 - shooter.getWeightPoints() + roll20SidesDice() * 2) * multiplier
                
            } else if(shooterZoneUbication == ranges.behindHalfCourt.id) {
                shooterPointsInShot = (shooter.perimetrerScoring * 3 - shooter.getHeightPoints() - shooter.getWeightPoints() + roll20SidesDice()) * multiplier
                
            } else if(shooterZoneUbication == ranges.theOtherRim.id) {
                shooterPointsInShot = (shooter.perimetrerScoring * 2 - shooter.getHeightPoints() - shooter.getWeightPoints() * 1.5 + roll20SidesDice() * 0.5) * multiplier
                
            }

            
            return shooterPointsInShot
        }
        
        function getDefendersPointsInShot() {
            let totalDefendersPoints = 0
            
            //If it is a free throw ther's no defenders so totalDefendersPoints is going to be 0
            if(!false/*TODO isFreeThrow*/) {
                //If it was a field shot attempt it cheks the tiles around the shooter. To do so we use one loop for the X direction and one for the Y direction
                for(let positionX = -2; positionX < 3; positionX++) {
                    for(let positionY = -2; positionY < 3; positionY++) {
                        //Then i ckeck if ther's a defender in the scanned ubication using the shooter ubication as center
                        let defenderInThisUbication = defendingTeam.returnPlayerInThisPosition((shooter.ubicationX! + positionX), (shooter.ubicationY! + positionY))
                        let defenderPoints = 0
                        
                        //If there's a player located in this position
                        if(defenderInThisUbication != undefined) {
                            //I get in what part of the field is him located to calculate with the propper math
                            let defenderZoneUbication = playerZone(defenderInThisUbication, defenderInThisUbication.team == "TeamB")
                            
                            let multiplier = 1
                            if(defenderInThisUbication.lastAction == "overwhelming waiting") {
                                multiplier = 1.4
                            }
                            //TODO Do math to calculate points on each sector
                            if(defenderZoneUbication == "error") {
                                defenderPoints = 0
                                
                            } else if(defenderZoneUbication == ranges.closeToTheRim.id) {
                                defenderPoints = (defenderInThisUbication.insideDefence * 4 + defenderInThisUbication.atleticism * 2 + defenderInThisUbication.getWeightPoints() + defenderInThisUbication.getHeightPoints() + roll20SidesDice() * 6) * multiplier
                                
                            } else if(defenderZoneUbication == ranges.inShortRange.id || defenderZoneUbication == ranges.behindTheBoard.id) {
                                defenderPoints = (defenderInThisUbication.insideDefence * 3 + defenderInThisUbication.perimetrerDefence * 0.5 + defenderInThisUbication.atleticism * 2.5 + defenderInThisUbication.getWeightPoints() * 0.5 + defenderInThisUbication.getHeightPoints() + roll20SidesDice() * 5) * multiplier
                                
                            } else if(defenderZoneUbication == ranges.inMidRange.id) {
                                defenderPoints = (defenderInThisUbication.insideDefence + defenderInThisUbication.perimetrerDefence * 4 - shooter.getWeightPoints() + defenderInThisUbication.getHeightPoints() + roll20SidesDice() * 5) * multiplier
                                
                            } else if(defenderZoneUbication == ranges.outsideThe3PointLine.id) {
                                defenderPoints = (0) * multiplier
                                
                            } else if(defenderZoneUbication == ranges.long3Range.id) {
                                defenderPoints = (0) * multiplier
                                
                            } else if(defenderZoneUbication == ranges.halfCourt.id) {
                                defenderPoints = (0) * multiplier
                                
                            } else if(defenderZoneUbication == ranges.behindHalfCourt.id) {
                                defenderPoints = (0) * multiplier
                                
                            } else if(defenderZoneUbication == ranges.theOtherRim.id) {
                                defenderPoints = (0) * multiplier
                                
                            }
                            
                            //If the defender is right next to the shooter he gets a bonus for his defensive points
                            if(Math.pow(positionX, 2) == 1 && Math.pow(positionY, 2) == 1) {
                                defenderPoints = defenderPoints * 1.5
                            }
                        }
                        
                        totalDefendersPoints += defenderPoints
                    }
                }
            }
            
            return totalDefendersPoints
        }
        
        function calculateIfGoesIn() {
            let isItIn = false
            //I get the difference between the shooter points and the defenders points
            let pointsComparation = getShooterPointsInShot() - getDefendersPointsInShot()
            //I get a dice roll
            let shotDiceRoll = roll20SidesDice()
            
            //TODO Use both prev data to calculate if it goes in
            
            return isItIn            
        }

        let pointsToAdd = 0;
        
        if(calculateIfGoesIn()) {
            if(/*TODO isFreeThrow*/ false) {
                pointsToAdd = 1
            } else if(
                shooterZoneUbication == ranges.closeToTheRim.id ||
                shooterZoneUbication == ranges.inShortRange.id ||
                shooterZoneUbication == ranges.behindTheBoard.id ||
                shooterZoneUbication == ranges.inMidRange.id
            ) {
                pointsToAdd = 2
            } else {
                pointsToAdd = 3
            }
            //After that i handle who get's the ball after the shot
        } else {
            //If it doesn't goes in handle who get's the rebound
        }

        return pointsToAdd
    }

    setShotHasBeenAttempted(value: boolean) {
        this.shotHasBeenAttempted = value
    }

    //------------------------------------END PLAYER ACTIONS METHODS----------------------------------------------------------------------------------------------------------


    //-----------------------------------START MATCH HANDLER METHODS----------------------------------------------------------------------------------------------------------
    setTeamTurn(team: string) {
        this.teamTurn = team
    }
    
    handleSelectedPlayersStatus(playerSillHaveTurnLeft: boolean) {
        
        let activePlayer = this.getActivePlayer()

        activePlayer!.setActivePlayer(false)
        activePlayer!.setPlayerSelected(false)
        
        if(!playerSillHaveTurnLeft) {
            activePlayer!.resetActionPoints()
            activePlayer!.setPlayerHaveTurn (false)
            activePlayer!.setMovementLeft(false)
        }
        
        let selectedPlayers = this.getSelectedPlayers()
    
        if(selectedPlayers[0] || selectedPlayers[1]) {

            if(selectedPlayers[0]) {
                selectedPlayers[0].setPlayerSelected(false)
                selectedPlayers[0].setActivePlayer(true)              
            }

            if(selectedPlayers[1]) {
                selectedPlayers[1].setPlayerSelected(false)
                selectedPlayers[1].setActivePlayer(true)

            }
        } else if(this.teamA.doesPlayersHaveMovement() || this.teamB.doesPlayersHaveMovement()) {
            if(this.teamA.doesPlayersHaveMovement()) {
                this.teamA.setTeamTurnLeft(true)
            }

            if(this.teamB.doesPlayersHaveMovement()) {
                this.teamB.setTeamTurnLeft(true)
            }

            if(this.teamA.teamHaveTheBall()) {
                this.setTeamTurn("TeamB")
                this.teamB.setTeamTurn(true)
                
            } else {
                this.setTeamTurn("TeamA")
                this.teamA.setTeamTurn(true)
            }
            
        } else {
            this.runClock()

            if(this.teamA.teamHaveTheBall()) {
                this.setTeamTurn("TeamA")
                this.teamA.setTeamTurn(true)

            } else {
                this.setTeamTurn("TeamB")
                this.teamB.setTeamTurn(true)
            }
        }
    
    }

    shotAttemptedStatus() {
        let activePlayer = this.getActivePlayer()!
        
        activePlayer!.setActivePlayer(false)
        activePlayer!.setPlayerSelected(false)
        activePlayer!.resetActionPoints()
        activePlayer!.setPlayerHaveTurn (false)
        activePlayer!.setMovementLeft(false)

        this.setShotHasBeenAttempted(true)
        activePlayer.setShotAttempt(true)
    }
    
    runClock() {
        if(this.timeLeft.seconds == 0) {
            this.timeLeft.minutes--
            this.timeLeft.seconds = 59
        } else {
            this.timeLeft.seconds--
        }

        if(this.timeLeft.minutes == 0 && this.timeLeft.seconds == 0) {
            if(this.quarter < 4) {
                this.quarter++
                this.timeLeft.minutes = 6

            } else if(this.teamA.stats.points == this.teamB.stats.points) {
                this.quarter++
                this.timeLeft.minutes = 3
                
            } else {
                this.gameOver = true
            }
        }

        if(this.shotHasBeenAttempted) {
            this.calculateShotResult()
        }

        if(!this.gameOver) {

            //Give players action points and movement left
            this.teamA.giveActionPointsToTeam()
            this.teamA.giveMovementLeftToAllPlayers()
            this.teamA.givePlayerHaveTurnToAllPlayers()
            
            this.teamB.giveActionPointsToTeam()
            this.teamB.giveMovementLeftToAllPlayers()
            this.teamB.givePlayerHaveTurnToAllPlayers()

        }
    }

    //------------------------------------END MATCH HANDLER METHODS-----------------------------------------------------------------------------------------------------------
            
}