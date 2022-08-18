import { Team } from "./team";

export class Match {
    teamA: Team;
    teamB: Team;

    constructor(teamA: Team, teamB: Team){
        //Change validation
        // if(teams.length != 2) throw new Error(`Match can stast only with 2 teams. You have ${teams.length}`)
        this.teamA = teamA
        this.teamB = teamB
    }

    start() {
        
    }
}