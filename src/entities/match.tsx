import { QuarterTimeLeft } from "./myInterfaces";
import { Team } from "./team";
import {roll20SidesDice, numberEntire} from '../utilities/exportableFunctions';
import React from "react";


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
    
    jumpBall(gameNarration: string[], setGameNarration: React.Dispatch<React.SetStateAction<string[]>>, teamA: Team, teamB: Team) {        
        let pointsObteinedInTheJumpBallA = 0
        let pointsObteinedInTheJumpBallB = 0

        let newGameNarration = [...gameNarration]

        while (pointsObteinedInTheJumpBallA === pointsObteinedInTheJumpBallB) {
            teamA.players.forEach(player => {
                if(player.position === "5") {
                    pointsObteinedInTheJumpBallA = numberEntire(roll20SidesDice() + player.height + player.atleticism)

                    newGameNarration.unshift(`${player.name === "" ? "the center of team A" : player.name}, get ${pointsObteinedInTheJumpBallA} points in the jump`)
                    setGameNarration(newGameNarration)
                }
            });
            
            teamB.players.forEach(player =>{
                if(player.position === "5") {
                    pointsObteinedInTheJumpBallB = numberEntire(roll20SidesDice() + player.height + player.atleticism)

                    newGameNarration.unshift(`${player.name === "" ? "the center of team B" : player.name}, get ${pointsObteinedInTheJumpBallB} points in the jump`) 
                    setGameNarration(newGameNarration)
                }
            })

            let whoWinTheJump = pointsObteinedInTheJumpBallA - pointsObteinedInTheJumpBallB;
            if (whoWinTheJump > 0){
                teamA.players.forEach(player => {
                    if(player.position === "1") {
                        newGameNarration.unshift(`${teamA.name} won the jump. Now ${player.name === "" ? "the PG of team A" : player.name} have the ball.`)
                        setGameNarration(newGameNarration)

                        player.haveBall = true;
                    }
                });
            } else if (whoWinTheJump < 0){
                teamB.players.forEach(player => {
                    if(player.position === "1") {
                        newGameNarration.unshift(`${teamB.name} won the jump. Now ${player.name === "" ? "the PG of team B" : player.name} have the ball.`)
                        setGameNarration(newGameNarration)

                        player.haveBall = true;
                    }
                });
            } else{
                newGameNarration.unshift(`Both players touch the ball at the same time! The jump ball continues`)
                setGameNarration(newGameNarration)
            }
        };        
    }
}