import React, { useContext } from 'react'
import { Match } from '../entities/match'
import { Player } from '../entities/players'
import { Team } from '../entities/team'




let gameBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

const playerA1: Player = new Player("Dani", "1", 165, 60, 60, 60, 10, 20, 50, 30, 80, 24, 0)
const playerA2: Player = new Player("Dani", "2", 170, 65, 55, 50, 30, 30, 60, 40, 80, 23, 0)
const playerA3: Player = new Player("Dani", "3", 175, 70, 50, 50, 50, 40, 40, 50, 80, 22, 0)
const playerA4: Player = new Player("Dani", "4", 185, 80, 35, 30, 50, 50, 30, 50, 80, 21, 0)
const playerA5: Player = new Player("Dani", "5", 200, 90, 20, 10, 60, 60, 5, 60, 80, 20, 0)

const playerB1: Player = new Player("Dani", "1", 199, 90, 80, 70, 40, 40, 80, 70, 80, 24, 1)
const playerB2: Player = new Player("Dani", "2", 199, 90, 80, 70, 40, 40, 80, 70, 80, 23, 1)
const playerB3: Player = new Player("Dani", "3", 199, 90, 80, 70, 40, 40, 80, 70, 80, 22, 1)
const playerB4: Player = new Player("Dani", "4", 199, 90, 80, 70, 40, 40, 80, 70, 80, 21, 1)
const playerB5: Player = new Player("Dani", "5", 199, 90, 80, 70, 40, 40, 80, 70, 80, 20, 1)

const playersteamA: Player[] = [playerA1, playerA2, playerA3, playerA4, playerA5]
const playersteamB: Player[] = [playerB1, playerB2, playerB3, playerB4, playerB5]

const teamA: Team = new Team("Sacachispas", playersteamA)
const teamB: Team = new Team("Danichispas", playersteamB)

const match: Match = new Match(teamA, teamB)

match.start()



function GameBoard() {
  return (
    <div id='gameboard-container'>
        <div id="tile">
            {
                gameBoard!.map((rowContent, rowIndex)=> {
                    return (rowContent.map((player, colIndex)=> {
                        return (
                            <div key={`tile-${colIndex}-${rowIndex}`} className={`tile ROW${rowIndex + 1} COL${colIndex +1}`}>
                                {
                                    player == 0 ?
                                        <></>
                                        :
                                        player == 1 ?
                                            <div><img src={``} alt={``}/></div>
                                            :
                                            <div><img src={``} alt={``}/></div>
                                }
                            </div>
                        )
                    }))
                })
            }
        </div>
    </div>
  )
}

export default GameBoard