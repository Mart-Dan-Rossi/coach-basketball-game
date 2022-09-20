import { QuarterTimeLeft } from "./myInterfaces";
import { Team } from "./team";

export class Match {
    teamA: Team;
    teamB: Team;

    //Match basic info
    querter: number;
    timeLeft: QuarterTimeLeft;
    shotClock: number;

    constructor(teamA: Team, teamB: Team){
        //Change validation
        // if(teams.length != 2) throw new Error(`Match can stast only with 2 teams. You have ${teams.length}`)
        this.teamA = teamA
        this.teamB = teamB

        //Match basic info
        this.querter = 1;
        this.timeLeft = { minutes: 10, seconds: 0 }
        this.shotClock = 24
    }

    start() {
        
    }
}