import { Player } from "./players";

export class Team {
    name: string;
    players: Player[]

    //Team status
    teamTurn: boolean;
    teamTurnLeft: boolean

    //Team stats
    stats: {
        points: number,
        fieldGoalsMade: number,
        fieldGoalsattempt: number,
        triplesMade: number,
        triplesAttempt: number,
        freeThrowsMade: number,
        freeThrowsAttempt: number,
        assists: number,
        turnOvers: number,
        rebounds: number,
        offensiveRebounds: number,
        blocks: number,
        steals: number,
        fouls: number,
    }

    constructor(name: string, players: Player[]) {
        this.name = name;
        this.players = players
        this.players.forEach((player: Player) => {
            player.team = this.name
        })

        //Team status
        this.teamTurn = false
        this.teamTurnLeft = true
        
        //Team stats
        this.stats = {
            points: 0,
            fieldGoalsMade: 0,
            fieldGoalsattempt: 0,
            triplesMade: 0,
            triplesAttempt: 0,
            freeThrowsMade: 0,
            freeThrowsAttempt: 0,
            assists: 0,
            turnOvers: 0,
            rebounds: 0,
            offensiveRebounds: 0,
            blocks: 0,
            steals: 0,
            fouls: 0,
        }
    }

    //--------------------------------------START GET INFO METHODS------------------------------------------------------------------------------------------------------------

    doesPlayersHaveMovement() {
        let movementRemaining = false
        this.players.forEach(player => {
            !movementRemaining && (movementRemaining = player.movementLeft)
        });
        return movementRemaining
    }

    getPlayerWithBallOrUndefined() {
        let playerWithBall = undefined
        this.players.forEach(player => {
            if(player.playerHaveTheBall()) {
                playerWithBall = player
            }
        });
        return playerWithBall
    }

        isAnyPlayerSelected() {
        let anySelected = false

        this.players.forEach(player => {
            player.playerSelected && (anySelected = true)
        })

        return anySelected
    }
    
    getSelectedPlayer() {
        let selectedPlayer: Player|undefined
        
        this.players.forEach(player => {
            player.playerSelected && (selectedPlayer = player)
        })
        return selectedPlayer
    }

    isAPlayerActive() {
        let anyActive = false

        this.players.forEach(player => {
            player.playerActive && (anyActive = true)
        })

        return anyActive
    }
    
    returnActivePlayer() {
        let activePlayer: Player|undefined

        this.players.forEach(player => {
            player.playerActive && (activePlayer = player)
        })

        return activePlayer
    }

    returnSelectedPlayer() {
        let playerSelected
        this.players.forEach(player => {
            if(player.playerSelected) {
                playerSelected = player
            }
        })
        return playerSelected
    }

    returnPlayerInThisPosition(positionX: number, positionY: number) {
        let playerInThisPosition : Player|undefined
        //IMPORTANT First i check if that ubication is inside the board
        if(positionX > 0 && positionX < 29 && positionY > 0 && positionY < 16) {

            //If it is inside the board i check every player ubication
            this.players.forEach(player => {
                //I use the first condition to cut the loop faster if a player is founded
                if(playerInThisPosition == undefined && (player.ubicationX == positionX && player.ubicationY == positionY)) {
                    //If there's a player in that ubication i return it
                    playerInThisPosition = player
                }
            })
        }
        return playerInThisPosition
    }

    returnPlayerWithBall() {
        let playerWithBall: Player|undefined

        this.players.forEach(player => {
            if(player.haveBall) {
                playerWithBall = player
            }
        })
        return playerWithBall
    }
    //---------------------------------------END GET INFO METHODS-------------------------------------------------------------------------------------------------------------

    //---------------------------------START SET PLAYER STATUS METHODS--------------------------------------------------------------------------------------------------------

    setTeamTurn(value: boolean) {
        this.teamTurn = value
    }

    setTeamTurnLeft(value: boolean) {
        this.teamTurnLeft = value
    }

    //----------------------------------END SET PLAYER STATUS METHODS---------------------------------------------------------------------------------------------------------


    //---------------------------------------START STATS METHODS--------------------------------------------------------------------------------------------------------------

    statsAddShotAttempt(pointsIfMade: number, isItMade: boolean, isItAnAssist: boolean, wasThereAFoul: boolean) {
        if(pointsIfMade == 1) {
            this.stats.freeThrowsAttempt++

            if(isItMade) {
                this.stats.freeThrowsMade++
                this.stats.points++

            }
        } else if(pointsIfMade == 2) {
            this.stats.fieldGoalsattempt++

            if(isItMade) {
                this.stats.fieldGoalsMade++
                this.stats.points += 2

                if(isItAnAssist) {
                    this.stats.assists++

                }
            }

            if(wasThereAFoul && !isItMade) {
                this.stats.fieldGoalsattempt--
            }

        } else if(pointsIfMade == 3) {
            this.stats.fieldGoalsattempt++
            this.stats.triplesAttempt++
            
            if(isItMade) {
                this.stats.fieldGoalsMade++
                this.stats.triplesMade++
                this.stats.points += 3

                if(isItAnAssist) {
                    this.stats.assists++

                }

            } else if(wasThereAFoul && !isItMade) {
                this.stats.fieldGoalsattempt--
                this.stats.triplesAttempt--
            }
            

        }
    }

    statsAddRebound() {
        if(this.getPlayerWithBallOrUndefined()) {
            this.stats.offensiveRebounds++

        } else {
            this.stats.rebounds++

        }
    }

    statsAddFoul() {
        this.stats.fouls++

    }

    statsAddTurnOver() {
        this.stats.turnOvers++

    }

    statsAddBlock() {
        this.stats.blocks++

    }

    statsAddSteal() {
        this.stats.steals++

    }

    teamHaveTheBall() {
        let doesTeamHaveTheBall = false
        this.players.forEach(player => {
            if(!doesTeamHaveTheBall && player.playerHaveTheBall()) {
                doesTeamHaveTheBall = true
            }
        });
        return doesTeamHaveTheBall
    }

    giveActionPointsToTeam() {
        this.players.forEach(player => {
            player.giveActionPointsToPlayer()
        });
    }

    //----------------------------------END SET PLAYER STATUS METHODS---------------------------------------------------------------------------------------------------------

}