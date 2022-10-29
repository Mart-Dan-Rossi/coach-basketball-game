import React from 'react'
import {Team} from '../entities/team';
import {Player} from '../entities/players';

interface Props {
    team: Team,
    col: number,
    row: number,
    teamLetterProps: string
}

function PlayerTileContainer({team, col, row, teamLetterProps} : Props) {    

    function playerTileContainerClickHandler() {
        return (e: React.MouseEvent)=>{
            e.preventDefault()
            e.currentTarget!.classList.toggle("expand")
        }
    }
    
    let playerImg = ""

    function drawPlayer() {
        return (
            team.teamHaveTheBall() ?
                team.players.map(player => {
                    playerImg = ""
                    let playerUbication = [player.ubicationX, player.ubicationY]
                    let thisUbication = [col, row]

                    
                    if(playerUbication[0] == thisUbication[0] && playerUbication[1] == thisUbication[1]) {

                        if(player.playerHaveTheBall()) {
                            playerImg = `./img/players-img/${teamLetterProps.toUpperCase()}AtackWBall.png`
                            return (
                                <img key={"ubication" + thisUbication[0] + "-" + thisUbication[1] + "" + player.position} className="player-img" src={playerImg} alt={`team ${teamLetterProps.toUpperCase()} player atacking with ball in column ${col+1} row ${row+1}`}/>
                                )
                            } else {
                            playerImg = `./img/players-img/${teamLetterProps.toUpperCase()}Atack.png`
                            return (
                                <img key={"ubication" + thisUbication[0] + "-" + thisUbication[1] + "" + player.position} className="player-img" src={playerImg} alt={`team ${teamLetterProps.toUpperCase()} player atacking in column ${col+1} row ${row+1}`}/>
                            )
                        }
                    }
                })
                :
                <img className="player-img" src={`./img/players-img/${teamLetterProps.toUpperCase()}Defend.png`} alt={`team ${teamLetterProps.toUpperCase()} player defending in column ${col+1} row ${row+1}`}/>
        )
    }

    function drawPlayerInfoPopupInBoard(player: Player){
        return (
            <div key={"player-info-popup-in-board" + player.team + player.name + player.position} className={`player-info-popup-in-board team-${teamLetterProps.toLowerCase()}`}>
                <div className='player-basic-info'>
                    <h4 className='player-position'>{player.playerPositionDetection()}</h4>
                </div>
                <div className="player-stats-icon-container">
                    { drawSkillsIconsInPlayers(player.atleticism, "./img/players-img/athlete.png", "this player is an athlete") }

                    { drawSkillsIconsInPlayers(player.perimetrerDefence, './img/players-img/perimeterDefender.png', 'this player is a good perimeter defender') }

                    { drawSkillsIconsInPlayers(player.insideDefence, './img/players-img/insideDefender.png', 'this player is a good paint defender') }

                    { drawSkillsIconsInPlayers(player.rebounding, './img/players-img/rebounder.png', 'this player is a good rebounder') }

                    { drawSkillsIconsInPlayers(player.perimetrerScoring, './img/players-img/perimeterScorer.png', 'this player is a good perimeter scorer') }

                    { drawSkillsIconsInPlayers(player.insideScoring, './img/players-img/insideScorer.png', 'this player is a good inside scorer') }

                    { drawSkillsIconsInPlayers(player.playMaking, './img/players-img/playmaker.png', 'this player is a good playmaker') }

                </div>
                { drawStatRowOfPopup("Heigth", player.height) }

                { drawStatRowOfPopup("Weight", player.weight) }

                { drawStatRowOfPopup("Atleticism", player.atleticism) }

                { drawStatRowOfPopup("Per def", player.perimetrerDefence) }

                { drawStatRowOfPopup("Ins def", player.insideDefence) }

                { drawStatRowOfPopup("Rebs", player.rebounding) }

                { drawStatRowOfPopup("Per scor", player.perimetrerScoring) }

                { drawStatRowOfPopup("Ins scor", player.insideScoring) }

                { drawStatRowOfPopup("Playmkn", player.playMaking) }

                { drawStatRowOfPopup("Action pts", player.actionPoints) }
                
                { drawStatRowOfPopup("Have turn", player.movementLeft) }



            </div>
        )
    }

    function drawStatRowOfPopup(skillName: string, statValue: number|boolean) {
        if(skillName != "Have turn") {
            return (
                <div>
                    <h4>{skillName}:</h4>
                    <span className="stat-value">{statValue.toString()}</span>
                </div>
            )
        } else {
            return (
                <div>
                    <h4>{skillName}:</h4>
                    <span className="stat-value">{statValue ? "Yes" : "No"}</span>
                </div>
            )
        }
    }

    function drawSkillsIconsInPlayers(skillPoints: number, imgSrc: string, text: string) {
        return (skillPoints >= 65 && 
        <img src={imgSrc} alt={text}
            className={
                skillPoints <= 75 ?
                 "bronze" 
                 : 
                 skillPoints > 75 && skillPoints < 85 ?
                 "silver"
                 :
                 "gold"
            }/>
        )
    }

  return (
    <div>
        <div className='player-tile-container' onMouseLeave={playerTileContainerClickHandler()} onMouseEnter={playerTileContainerClickHandler()}>
            {drawPlayer()}
            {
                team.players.map(player =>{
                    if(player.ubicationX == col && player.ubicationY == row){
                        return (
                            drawPlayerInfoPopupInBoard(player)
                        )
                    }
                })
            }
        </div>
    </div>
  )
}

export default PlayerTileContainer