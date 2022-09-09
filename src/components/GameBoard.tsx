import React, { useContext } from 'react'
import { Match } from '../entities/match'
import { TeamAStats, TeamBStats } from '../entities/myInterfaces'
import { Player } from '../entities/players'
import { Team } from '../entities/team'


interface Props {
    teamAStats: TeamAStats,
    teamBStats: TeamBStats
}

function GameBoard( { teamAStats, teamBStats } : Props) {

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
    
    const playerA1: Player = new Player(teamAStats.playerA1Stats.name, "1", teamAStats.playerA1Stats.height, teamAStats.playerA1Stats.weight, teamAStats.playerA1Stats.atleticism, teamAStats.playerA1Stats.perimeterDefence, teamAStats.playerA1Stats.insideDefence, teamAStats.playerA1Stats.rebounding, teamAStats.playerA1Stats.perimeterScoring, teamAStats.playerA1Stats.insideScoring, teamAStats.playerA1Stats.playMaking, 24, 0)
    const playerA2: Player = new Player(teamAStats.playerA2Stats.name, "2", teamAStats.playerA2Stats.height, teamAStats.playerA2Stats.weight, teamAStats.playerA2Stats.atleticism, teamAStats.playerA2Stats.perimeterDefence, teamAStats.playerA2Stats.insideDefence, teamAStats.playerA2Stats.rebounding, teamAStats.playerA2Stats.perimeterScoring, teamAStats.playerA2Stats.insideScoring, teamAStats.playerA2Stats.playMaking, 23, 0)
    const playerA3: Player = new Player(teamAStats.playerA3Stats.name, "3", teamAStats.playerA3Stats.height, teamAStats.playerA3Stats.weight, teamAStats.playerA3Stats.atleticism, teamAStats.playerA3Stats.perimeterDefence, teamAStats.playerA3Stats.insideDefence, teamAStats.playerA3Stats.rebounding, teamAStats.playerA3Stats.perimeterScoring, teamAStats.playerA3Stats.insideScoring, teamAStats.playerA3Stats.playMaking, 22, 0)
    const playerA4: Player = new Player(teamAStats.playerA4Stats.name, "4", teamAStats.playerA4Stats.height, teamAStats.playerA4Stats.weight, teamAStats.playerA4Stats.atleticism, teamAStats.playerA4Stats.perimeterDefence, teamAStats.playerA4Stats.insideDefence, teamAStats.playerA4Stats.rebounding, teamAStats.playerA4Stats.perimeterScoring, teamAStats.playerA4Stats.insideScoring, teamAStats.playerA4Stats.playMaking, 21, 0)
    const playerA5: Player = new Player(teamAStats.playerA5Stats.name, "5", teamAStats.playerA5Stats.height, teamAStats.playerA5Stats.weight, teamAStats.playerA5Stats.atleticism, teamAStats.playerA5Stats.perimeterDefence, teamAStats.playerA5Stats.insideDefence, teamAStats.playerA5Stats.rebounding, teamAStats.playerA5Stats.perimeterScoring, teamAStats.playerA5Stats.insideScoring, teamAStats.playerA5Stats.playMaking, 20, 0)
    
    const playerB1: Player = new Player(teamBStats.playerB1Stats.name, "1", teamBStats.playerB1Stats.height, teamBStats.playerB1Stats.weight, teamBStats.playerB1Stats.atleticism, teamBStats.playerB1Stats.perimeterDefence, teamBStats.playerB1Stats.insideDefence, teamBStats.playerB1Stats.rebounding, teamBStats.playerB1Stats.perimeterScoring, teamBStats.playerB1Stats.insideScoring, teamBStats.playerB1Stats.playMaking, 24, 1)
    const playerB2: Player = new Player(teamBStats.playerB2Stats.name, "2", teamBStats.playerB2Stats.height, teamBStats.playerB2Stats.weight, teamBStats.playerB2Stats.atleticism, teamBStats.playerB2Stats.perimeterDefence, teamBStats.playerB2Stats.insideDefence, teamBStats.playerB2Stats.rebounding, teamBStats.playerB2Stats.perimeterScoring, teamBStats.playerB2Stats.insideScoring, teamBStats.playerB2Stats.playMaking, 23, 1)
    const playerB3: Player = new Player(teamBStats.playerB3Stats.name, "3", teamBStats.playerB3Stats.height, teamBStats.playerB3Stats.weight, teamBStats.playerB3Stats.atleticism, teamBStats.playerB3Stats.perimeterDefence, teamBStats.playerB3Stats.insideDefence, teamBStats.playerB3Stats.rebounding, teamBStats.playerB3Stats.perimeterScoring, teamBStats.playerB3Stats.insideScoring, teamBStats.playerB3Stats.playMaking, 22, 1)
    const playerB4: Player = new Player(teamBStats.playerB4Stats.name, "4", teamBStats.playerB4Stats.height, teamBStats.playerB4Stats.weight, teamBStats.playerB4Stats.atleticism, teamBStats.playerB4Stats.perimeterDefence, teamBStats.playerB4Stats.insideDefence, teamBStats.playerB4Stats.rebounding, teamBStats.playerB4Stats.perimeterScoring, teamBStats.playerB4Stats.insideScoring, teamBStats.playerB4Stats.playMaking, 21, 1)
    const playerB5: Player = new Player(teamBStats.playerB5Stats.name, "5", teamBStats.playerB5Stats.height, teamBStats.playerB5Stats.weight, teamBStats.playerB5Stats.atleticism, teamBStats.playerB5Stats.perimeterDefence, teamBStats.playerB5Stats.insideDefence, teamBStats.playerB5Stats.rebounding, teamBStats.playerB5Stats.perimeterScoring, teamBStats.playerB5Stats.insideScoring, teamBStats.playerB5Stats.playMaking, 20, 1)
    
    const playersteamA: Player[] = [playerA1, playerA2, playerA3, playerA4, playerA5]
    const playersteamB: Player[] = [playerB1, playerB2, playerB3, playerB4, playerB5]
    
    const teamA: Team = new Team("Sacachispas", playersteamA)
    const teamB: Team = new Team("Danichispas", playersteamB)
    
    const match: Match = new Match(teamA, teamB)
    
    match.start()

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