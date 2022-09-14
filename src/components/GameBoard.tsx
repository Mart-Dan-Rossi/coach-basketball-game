import React, { useContext } from 'react'
import { Match } from '../entities/match'
import { TeamAStats, TeamBStats } from '../entities/myInterfaces'
import { Player } from '../entities/players'
import { Team } from '../entities/team'
import './GameBoard.css'


interface Props {
    teamAStats: TeamAStats,
    teamBStats: TeamBStats
}

function GameBoard( { teamAStats, teamBStats } : Props) {

    let gameBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    const teamAInitialPositions = [[13, 1], [13, 5], [13, 9], [13, 14], [14, 8]]
    const teamBInitialPositions = [[16, 2], [16, 6], [16, 10], [16, 15], [15, 8]]

    teamAInitialPositions.forEach(position => {
        gameBoard[position[1]-1][position[0]-1] = 1
    });

    teamBInitialPositions.forEach(position => {
        gameBoard[position[1]-1][position[0]-1] = 2
    });
    
    const playerA1: Player = new Player(
        teamAStats.playerA1Stats.name,
        "1",
        teamAStats.playerA1Stats.height,
        teamAStats.playerA1Stats.weight,
        teamAStats.playerA1Stats.atleticism,
        teamAStats.playerA1Stats.perimeterDefence,
        teamAStats.playerA1Stats.insideDefence,
        teamAStats.playerA1Stats.rebounding,
        teamAStats.playerA1Stats.perimeterScoring,
        teamAStats.playerA1Stats.insideScoring,
        teamAStats.playerA1Stats.playMaking,
        teamAInitialPositions[0][0],
        teamAInitialPositions[0][1]
    )
    
    const playerA2: Player = new Player(
        teamAStats.playerA2Stats.name,
        "2",
        teamAStats.playerA2Stats.height,
        teamAStats.playerA2Stats.weight,
        teamAStats.playerA2Stats.atleticism,
        teamAStats.playerA2Stats.perimeterDefence,
        teamAStats.playerA2Stats.insideDefence,
        teamAStats.playerA2Stats.rebounding,
        teamAStats.playerA2Stats.perimeterScoring,
        teamAStats.playerA2Stats.insideScoring,
        teamAStats.playerA2Stats.playMaking,
        teamAInitialPositions[1][0],
        teamAInitialPositions[1][1]
    )
    
    const playerA3: Player = new Player(
        teamAStats.playerA3Stats.name,
        "3",
        teamAStats.playerA3Stats.height,
        teamAStats.playerA3Stats.weight,
        teamAStats.playerA3Stats.atleticism,
        teamAStats.playerA3Stats.perimeterDefence,
        teamAStats.playerA3Stats.insideDefence,
        teamAStats.playerA3Stats.rebounding,
        teamAStats.playerA3Stats.perimeterScoring,
        teamAStats.playerA3Stats.insideScoring,
        teamAStats.playerA3Stats.playMaking,
        teamAInitialPositions[2][0],
        teamAInitialPositions[2][1]
    )
    
    const playerA4: Player = new Player(
        teamAStats.playerA4Stats.name,
        "4",
        teamAStats.playerA4Stats.height,
        teamAStats.playerA4Stats.weight,
        teamAStats.playerA4Stats.atleticism,
        teamAStats.playerA4Stats.perimeterDefence,
        teamAStats.playerA4Stats.insideDefence,
        teamAStats.playerA4Stats.rebounding,
        teamAStats.playerA4Stats.perimeterScoring,
        teamAStats.playerA4Stats.insideScoring,
        teamAStats.playerA4Stats.playMaking,
        teamAInitialPositions[3][0],
        teamAInitialPositions[3][1]
    )
    
    const playerA5: Player = new Player(
        teamAStats.playerA5Stats.name,
        "5",
        teamAStats.playerA5Stats.height,
        teamAStats.playerA5Stats.weight,
        teamAStats.playerA5Stats.atleticism,
        teamAStats.playerA5Stats.perimeterDefence,
        teamAStats.playerA5Stats.insideDefence,
        teamAStats.playerA5Stats.rebounding,
        teamAStats.playerA5Stats.perimeterScoring,
        teamAStats.playerA5Stats.insideScoring,
        teamAStats.playerA5Stats.playMaking,
        teamAInitialPositions[4][0],
        teamAInitialPositions[4][1]
    )
    
    
    const playerB1: Player = new Player(
        teamBStats.playerB1Stats.name,
        "1",
        teamBStats.playerB1Stats.height,
        teamBStats.playerB1Stats.weight,
        teamBStats.playerB1Stats.atleticism,
        teamBStats.playerB1Stats.perimeterDefence,
        teamBStats.playerB1Stats.insideDefence,
        teamBStats.playerB1Stats.rebounding,
        teamBStats.playerB1Stats.perimeterScoring,
        teamBStats.playerB1Stats.insideScoring,
        teamBStats.playerB1Stats.playMaking,
        teamBInitialPositions[0][0],
        teamBInitialPositions[0][1]
    )
    
    const playerB2: Player = new Player(
        teamBStats.playerB2Stats.name,
        "2",
        teamBStats.playerB2Stats.height,
        teamBStats.playerB2Stats.weight,
        teamBStats.playerB2Stats.atleticism,
        teamBStats.playerB2Stats.perimeterDefence,
        teamBStats.playerB2Stats.insideDefence,
        teamBStats.playerB2Stats.rebounding,
        teamBStats.playerB2Stats.perimeterScoring,
        teamBStats.playerB2Stats.insideScoring,
        teamBStats.playerB2Stats.playMaking,
        teamBInitialPositions[1][0],
        teamBInitialPositions[1][1]
    )
    
    const playerB3: Player = new Player(
        teamBStats.playerB3Stats.name,
        "3",
        teamBStats.playerB3Stats.height,
        teamBStats.playerB3Stats.weight,
        teamBStats.playerB3Stats.atleticism,
        teamBStats.playerB3Stats.perimeterDefence,
        teamBStats.playerB3Stats.insideDefence,
        teamBStats.playerB3Stats.rebounding,
        teamBStats.playerB3Stats.perimeterScoring,
        teamBStats.playerB3Stats.insideScoring,
        teamBStats.playerB3Stats.playMaking,
        teamBInitialPositions[2][0],
        teamBInitialPositions[2][1]
    )
    
    const playerB4: Player = new Player(
        teamBStats.playerB4Stats.name,
        "4",
        teamBStats.playerB4Stats.height,
        teamBStats.playerB4Stats.weight,
        teamBStats.playerB4Stats.atleticism,
        teamBStats.playerB4Stats.perimeterDefence,
        teamBStats.playerB4Stats.insideDefence,
        teamBStats.playerB4Stats.rebounding,
        teamBStats.playerB4Stats.perimeterScoring,
        teamBStats.playerB4Stats.insideScoring,
        teamBStats.playerB4Stats.playMaking,
        teamBInitialPositions[3][0],
        teamBInitialPositions[3][1]
    )
    
    const playerB5: Player = new Player(
        teamBStats.playerB5Stats.name,
        "5",
        teamBStats.playerB5Stats.height,
        teamBStats.playerB5Stats.weight,
        teamBStats.playerB5Stats.atleticism,
        teamBStats.playerB5Stats.perimeterDefence,
        teamBStats.playerB5Stats.insideDefence,
        teamBStats.playerB5Stats.rebounding,
        teamBStats.playerB5Stats.perimeterScoring,
        teamBStats.playerB5Stats.insideScoring,
        teamBStats.playerB5Stats.playMaking,
        teamBInitialPositions[4][0],
        teamBInitialPositions[4][1]
    )
    
    const playersTeamA: Player[] = [playerA1, playerA2, playerA3, playerA4, playerA5]
    const playersTeamB: Player[] = [playerB1, playerB2, playerB3, playerB4, playerB5]
    
    const teamA: Team = new Team("TeamA", playersTeamA)
    const teamB: Team = new Team("TeamB", playersTeamB)
    
    const match: Match = new Match(teamA, teamB)
    let playerImg = ""

    function playerTileContainerClickHandler() {
        return (e: React.MouseEvent)=>{
            e.preventDefault()
            e.currentTarget!.classList.toggle("expand")
        }
    }
    
    match.start()

  return (
    <div id='gameboard-container'>
        <div id="gameboard">
            {
                gameBoard!.map((rowContent, rowIndex)=> {
                    return (rowContent.map((player, colIndex)=> {
                        return (
                            <div key={`tile-${colIndex+1}-${rowIndex+1}`} className={`tile ROW${rowIndex + 1} COL${colIndex +1}`}>
                                {
                                    player == 0 ?
                                        <></>
                                        :
                                        player == 1 ?
                                            <div className='player-tile-container' onClick={playerTileContainerClickHandler()}>
                                                {
                                                    teamA.teamHaveTheBall() ?
                                                        teamA.players.map(element => {
                                                            playerImg = ""
                                                            let playerUbication = [element.ubicationX, element.ubicationY]
                                                            let thisUbication = [colIndex+1, rowIndex+1]

                                                            if(playerUbication == thisUbication) {
                                                                if(element.playerHaveTheBall()) {
                                                                    playerImg = "./img/players-img/AAtackWBall.png"
                                                                    return (
                                                                        <img className="player-img" src={playerImg} alt={`team A player atacking with ball in column ${colIndex+1} row ${rowIndex+1}`}/>
                                                                    )
                                                                } else {
                                                                    playerImg = "./img/players-img/AAtack.png"
                                                                    return (
                                                                        <img className="player-img" src={playerImg} alt={`team A player atacking in column ${colIndex+1} row ${rowIndex+1}`}/>
                                                                    )
                                                                }
                                                            }
                                                        })
                                                        :
                                                        <img className="player-img" src={`./img/players-img/ADefend.png`} alt={`team A player defending in column ${colIndex+1} row ${rowIndex+1}`}/>

                                                }
                                                {
                                                    teamA.players.map(element =>{
                                                        if(element.ubicationX == colIndex+1 && element.ubicationY == rowIndex+1){
                                                            return (
                                                                <div key={"player-info-popup-in-board" + element.team + element.name + element.position} className='player-info-popup-in-board team-a'>
                                                                    <div className='player-basic-info'>
                                                                    <h4 className='player-position'>{element.playerPositionDetection()}</h4>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Heigth:</h4>
                                                                        <span className="stat-value">{element.height.toString()}</span>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Weight:</h4>
                                                                        <span className='stat-value'>{element.weight.toString()}</span>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Atleticism:</h4>
                                                                        <span className='stat-value'>{element.atleticism.toString()}</span>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Per def:</h4>
                                                                        <span className='stat-value'>{element.perimetrerDefence.toString()}</span>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Ins def:</h4>
                                                                        <span className='stat-value'>{element.insideDefence.toString()}</span>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Rebounding:</h4>
                                                                        <span className='stat-value'>{element.rebounding.toString()}</span>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Per scor:</h4>
                                                                        <span className='stat-value'>{element.perimetrerScoring.toString()}</span>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Ins scor:</h4>
                                                                        <span className='stat-value'>{element.insideScoring.toString()}</span>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Playmkn:</h4>
                                                                        <span className='stat-value'>{element.playMaking.toString()}</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>                                            
                                            :
                                            <div className='player-tile-container' onClick={playerTileContainerClickHandler()}>
                                                {
                                                    teamB.teamHaveTheBall() ?
                                                        teamB.players.map(element => {
                                                            playerImg = ""
                                                            let playerUbication = [element.ubicationX, element.ubicationY]
                                                            let thisUbication = [colIndex+1, rowIndex+1]

                                                            if(playerUbication == thisUbication) {
                                                                if(element.playerHaveTheBall()) {
                                                                    playerImg = "./img/players-img/BAtackWBall.png"
                                                                    return (
                                                                        <img key={"player img" + element.name + element.team + element.position} className="player-img" src={playerImg} alt={`team B player atacking with ball in column ${colIndex+1} row ${rowIndex+1}`}/>
                                                                    )
                                                                } else {
                                                                    playerImg = "./img/players-img/BAtack.png"
                                                                    return (
                                                                        <img key={"player img" + element.name + element.team + element.position} className="player-img" src={playerImg} alt={`team B player atacking in column ${colIndex+1} row ${rowIndex+1}`}/>
                                                                    )
                                                                }
                                                            }
                                                        })
                                                        :
                                                        <img className="player-img" src={`./img/players-img/BDefend.png`} alt={`team B player defending in column ${colIndex+1} row ${rowIndex+1}`}/>

                                                }
                                                {
                                                    teamB.players.map(element =>{
                                                        if(element.ubicationX == colIndex+1 && element.ubicationY == rowIndex+1){
                                                            return (
                                                                <div key={"player-info-popup-in-board" + element.team + element.name + element.position} className='player-info-popup-in-board team-b'>
                                                                    <div className='player-basic-info'>
                                                                        <h4 className='player-position'>{element.playerPositionDetection()}</h4>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Heigth:</h4>
                                                                        <span className="stat-value">{element.height.toString()} cm</span>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Weight:</h4>
                                                                        <span className='stat-value'>{element.weight.toString()} kg</span>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Atleticism:</h4>
                                                                        <span className='stat-value'>{element.atleticism.toString()}</span>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Per def:</h4>
                                                                        <span className='stat-value'>{element.perimetrerDefence.toString()}</span>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Ins def:</h4>
                                                                        <span className='stat-value'>{element.insideDefence.toString()}</span>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Rebounding:</h4>
                                                                        <span className='stat-value'>{element.rebounding.toString()}</span>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Per scor:</h4>
                                                                        <span className='stat-value'>{element.perimetrerScoring.toString()}</span>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Ins scor:</h4>
                                                                        <span className='stat-value'>{element.insideScoring.toString()}</span>
                                                                    </div>
                                                                    <div>
                                                                        <h4>Playmkn:</h4>
                                                                        <span className='stat-value'>{element.playMaking.toString()}</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
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