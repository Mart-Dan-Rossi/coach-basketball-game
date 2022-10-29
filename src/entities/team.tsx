import { Player } from "./players";

export class Team {
    name: string;
    players: Player[]

    //Team status
    teamTurn: boolean;

    //Team stats
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

    constructor(name: string, players: Player[]) {
        this.name = name;
        this.players = players
        this.players.forEach((player: Player) => {
            player.team = this.name
        })

        //Team status
        this.teamTurn = false
        
        //Team stats
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

    coachSelectPlayer() {
        this.players.forEach(player => {
            
        });
    }

    isAPlayerSelected() {
        let anySelected = false

        this.players.forEach(player =>{
            player.playerSelected && (anySelected = true)
        })

        return anySelected
    }
}