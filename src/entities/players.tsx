import {playerPositionDetection, roll20SidesDice} from '../utilities/exportableFunctions';
import { Team } from './team';
export class Player {

    //Info
    name: string;
    team: string;
    position: string;

    //Fisicality
    height: number;
    weight: number;
    atleticism: number;

    //Defensive atributes
    perimetrerDefence: number;
    insideDefence: number;

    //Mix atribute
    rebounding: number;

     //Ofensive atributes
    perimetrerScoring: number;
    insideScoring: number;
    playMaking: number;

    //Player status
    ubicationX: number|undefined;
    ubicationY: number|undefined;
    haveBall: boolean;
    movementLeft: boolean;
    lastAction: string;
    actionPoints: number;
    playerSelected: boolean;
    playerActive: boolean;
    playerHaveTurn: boolean;

    //Player stats
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
    




    constructor(name: string, team: string, position: string, height: number, weight: number, atleticism: number, perimetrerDefence: number, insideDefence: number, rebounding: number, perimetrerScoring: number, insideScoring: number, playMaking: number, ubicationX: number, ubicationY: number){
        //Info
        this.name = name;
        this.team = team;
        this.position = position;

        //Fisicality
        this.height = height;
        this.weight = weight;
        this.atleticism = atleticism;

        //Defensive atributes
        this.perimetrerDefence = perimetrerDefence;
        this.insideDefence = insideDefence;

        //Mix atribute
        this.rebounding = rebounding;

        //Ofensive atributes
        this.perimetrerScoring = perimetrerScoring;
        this.insideScoring = insideScoring;
        this.playMaking = playMaking;

        //Player status
        this.ubicationX = ubicationX;/*X is the position in the width*/
        this.ubicationY = ubicationY;/*Y is position in the height*/    
        this.haveBall = false;
        this.movementLeft = true;
        this.lastAction = "Haven't do anithing yet";
        this.actionPoints = 0;
        this.playerSelected = false
        this.playerActive = false
        this.playerHaveTurn = true

        //Player stats
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

    //---------------------------------START GET INFO METHODS--------------------------------------------------------------------------------------------------------

    
    playerPositionDetection = ()=> {
        if(this.position == "1"){
            return "PG"
        } else if(this.position == "2"){
            return "SG"
        } else if(this.position == "3") {
            return "SF"
        } else if(this.position == "4") {
            return "PF"
        } else if(this.position == "5") {
            return "C"
        }
    }

    playerHaveTheBall() {
        return this.haveBall
    }

    //----------------------------------END GET INFO METHODS---------------------------------------------------------------------------------------------------------


    //----------------------------------START STATS METHODS----------------------------------------------------------------------------------------------------------
    
    statsAddShotAttempt(pointsIfMade: number, isItMade: boolean, wasThereAFoul: boolean) {
        if(pointsIfMade == 1) {
            this.stats.freeThrowsAttempt++

            if(isItMade){
                this.stats.freeThrowsMade++
                this.stats.points++

            }
        } else if(pointsIfMade == 2) {
            this.stats.fieldGoalsattempt++

            if(isItMade){
                this.stats.fieldGoalsMade++
                this.stats.points += 2
            }

            if(wasThereAFoul && !isItMade) {
                this.stats.fieldGoalsattempt--
            }

        } else if(pointsIfMade == 3) {
            this.stats.fieldGoalsattempt++
            this.stats.triplesAttempt++
            
            if(isItMade){
                this.stats.fieldGoalsMade++
                this.stats.triplesMade++
                this.stats.points += 3

            } else if(wasThereAFoul && !isItMade) {
                this.stats.fieldGoalsattempt--
                this.stats.triplesAttempt--
            }
            

        }
    }

    statsAddAssist() {
        this.stats.assists++
        
    }

    statsAddRebound(atackingTeam: Team) {
        if(atackingTeam.name == this.team) {
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
    //-----------------------------------END STATS METHODS-----------------------------------------------------------------------------------------------------------
    
    
    //----------------------------START SET PLAYER STATUS METHODS----------------------------------------------------------------------------------------------------

    giveActionPointsToPlayer() {
        this.actionPoints = 0
        let diceResult = 1

        if(this.height <= 192) {
            this.actionPoints = 2

            if(diceResult > 6) {
                this.actionPoints += 1
            }
        } else if (this.height > 192 && this.height <= 208) {
            this.actionPoints = 2

            if(diceResult > 10) {
                this.actionPoints += 1
            }
        } else if (this.height > 208) {
            this.actionPoints = 1

            if(diceResult > 3 && diceResult < 16) {
                this.actionPoints += 1
            } else if (diceResult >= 16) {
                this.actionPoints += 2
            }
        }
    }

    setActivePlayer(value: boolean) {
        this.playerActive = value
    }

    setPlayerSelected(value: boolean) {
        this.playerSelected = value
    }
    
    setHaveBall(value: boolean) {
        this.haveBall = value
    }

    
    //-----------------------------END SET PLAYER STATUS METHODS-----------------------------------------------------------------------------------------------------


    
    //----------------------------------START PLAYER ACTIONS---------------------------------------------------------------------------------------------------------
    
    movePlayer(dx: number, dy: number) {
        this.ubicationX! += dx
        this.ubicationY! += dy

    }

    restActionPoints(points: number) {
        this.actionPoints -= points
    }

    resetActionPoints() {
        this.actionPoints = 0
    }

    //-----------------------------------END PLAYER ACTIONS----------------------------------------------------------------------------------------------------------

}
