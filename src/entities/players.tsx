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
    }

    playerPositionDetection = (playerPosition : string)=> {
        if(playerPosition == "1"){
            return "G"
        } else if(playerPosition == "2"){
            return "SG"
        } else if(playerPosition == "3") {
            return "SF"
        } else if(playerPosition == "4") {
            return "PF"
        } else if(playerPosition == "5") {
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
