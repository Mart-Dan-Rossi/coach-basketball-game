export class Player {

    //Info
    name: string;
    team: string = "";
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

    //Player stats
    points: number;
    assists: number;
    rebounds: number;
    ofensiveRebounds: number;
    blocks: number;
    steals: number;
    turnOvers: number;
    fouls: number;
    fieldGoalsMade: number;
    fieldGoalsattempt: number;
    freeThrowsMade: number;
    freeThrowsAttempt: number;
    triplesMade: number;
    triplesAttempt: number;
    




    constructor(name: string, position: string, height: number, weight: number, atleticism: number, perimetrerDefence: number, insideDefence: number, rebounding: number, perimetrerScoring: number, insideScoring: number, playMaking: number, ubicationX: number, ubicationY: number){
        //Info
        this.name = name;
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

        //Player stats
        this.points = 0;
        this.assists = 0;
        this.rebounds = 0;
        this.ofensiveRebounds = 0;
        this.blocks = 0;
        this.steals = 0;
        this.turnOvers = 0;
        this.fouls = 0;
        this.fieldGoalsMade = 0;
        this.fieldGoalsattempt = 0;
        this.freeThrowsMade = 0;
        this.freeThrowsAttempt = 0;
        this.triplesMade = 0;
        this.triplesAttempt = 0;
    }

    playerPositionDetection = ()=> {
        if(this.position == "1"){
            return "G"
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
        if(this.haveBall == true) {
            return true
        } else {
            return false
        }
    }
}
