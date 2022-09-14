import { Player } from "./players";

export class Team {
    name: string;
    players: Player[]

    constructor(name: string, players: Player[]) {
        this.name = name;
        this.players = players
        this.players.forEach((player: Player) => {
            player.team = this.name
        })
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
}