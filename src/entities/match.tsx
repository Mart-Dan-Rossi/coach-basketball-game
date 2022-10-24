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
        this.querter = 1
        this.timeLeft = { minutes: 10, seconds: 0 }
        this.shotClock = 24
    }
    
    jumpBall(gameNarration: string[], setGameNarration: React.Dispatch<React.SetStateAction<string[]>>) {        
        let pointsObteinedInTheJumpBallA = 0
        let pointsObteinedInTheJumpBallB = 0

        let newGameNarration = [...gameNarration]

        while (pointsObteinedInTheJumpBallA === pointsObteinedInTheJumpBallB) {
            this.teamA.players.forEach(player => {
                if(player.position === "5") {
                    pointsObteinedInTheJumpBallA = numberEntire(roll20SidesDice() + player.height + player.atleticism)

                    newGameNarration.unshift(`${player.name === "" ? "The center of team A" : player.name}, get ${pointsObteinedInTheJumpBallA} points in the jump`)
                    setGameNarration(newGameNarration)
                }
            });
            
            this.teamB.players.forEach(player =>{
                if(player.position === "5") {
                    pointsObteinedInTheJumpBallB = numberEntire(roll20SidesDice() + player.height + player.atleticism)

                    newGameNarration.unshift(`${player.name === "" ? "The center of team B" : player.name}, get ${pointsObteinedInTheJumpBallB} points in the jump`) 
                    setGameNarration(newGameNarration)
                }
            })

            let whoWinTheJump = pointsObteinedInTheJumpBallA - pointsObteinedInTheJumpBallB;

            console.log(pointsObteinedInTheJumpBallA, "-", pointsObteinedInTheJumpBallB, "=", whoWinTheJump)

            if (whoWinTheJump > 0){
                this.teamA.players.forEach(player => {
                    if(player.position === "1") {
                        player.haveBall = true
                        
                        newGameNarration.unshift(`${this.teamA.name} won the jump. Now ${player.name === "" ? "the PG of team A" : player.name} have the ball.`)
                        setGameNarration(newGameNarration)

                    }
                });
            } else if (whoWinTheJump < 0){
                this.teamB.players.forEach(player => {
                    if(player.position === "1") {
                        player.haveBall = true

                        newGameNarration.unshift(`${this.teamB.name} won the jump. Now ${player.name === "" ? "the PG of team B" : player.name} have the ball.`)
                        setGameNarration(newGameNarration)

                    }
                });
            } else{
                newGameNarration.unshift(`Both players touch the ball at the same time! The jump ball continues`)
                setGameNarration(newGameNarration)
            }
        };        
    }
}