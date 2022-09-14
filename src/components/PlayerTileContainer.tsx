import React from 'react'
import {Team} from '../entities/team';
import {Player} from '../entities/players';

interface Props {
    team: Team,
    colIndex: number,
    rowIndex: number,
    teamLetterProps: string
}

function PlayerTileContainer({team, colIndex, rowIndex, teamLetterProps} : Props) {

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
            team.players.map(element => {
                playerImg = ""
                let playerUbication = [element.ubicationX, element.ubicationY]
                let thisUbication = [colIndex+1, rowIndex+1]

                if(playerUbication == thisUbication) {
                    if(element.playerHaveTheBall()) {
                        playerImg = `./img/players-img/${teamLetterProps.toUpperCase()}AtackWBall.png`
                        return (
                            <img className="player-img" src={playerImg} alt={`team ${teamLetterProps.toUpperCase()} player atacking with ball in column ${colIndex+1} row ${rowIndex+1}`}/>
                        )
                    } else {
                        playerImg = `./img/players-img/${teamLetterProps.toUpperCase()}Atack.png`
                        return (
                            <img className="player-img" src={playerImg} alt={`team ${teamLetterProps.toUpperCase()} player atacking in column ${colIndex+1} row ${rowIndex+1}`}/>
                        )
                    }
                }
            })
            :
            <img className="player-img" src={`./img/players-img/${teamLetterProps.toUpperCase()}Defend.png`} alt={`team ${teamLetterProps.toUpperCase()} player defending in column ${colIndex+1} row ${rowIndex+1}`}/>
        )
    }

    function drawPlayerInfoPopupInBoard(element: Player){
        return (
            <div key={"player-info-popup-in-board" + element.team + element.name + element.position} className={`player-info-popup-in-board team-${teamLetterProps.toLowerCase()}`}>
                <div className='player-basic-info'>
                    <h4 className='player-position'>{element.playerPositionDetection()}</h4>
                </div>
                <div className="player-stats-icon-container">
                    { drawSkillsIconsInPlayers(element.atleticism, "./img/players-img/athlete.png", "this player is an athlete") }

                    { drawSkillsIconsInPlayers(element.perimetrerDefence, './img/players-img/perimeterDefender.png', 'this player is a good perimeter defender') }

                    { drawSkillsIconsInPlayers(element.insideDefence, './img/players-img/insideDefender.png', 'this player is a good paint defender') }

                    { drawSkillsIconsInPlayers(element.rebounding, './img/players-img/rebounder.png', 'this player is a good rebounder') }

                    { drawSkillsIconsInPlayers(element.perimetrerScoring, './img/players-img/perimeterScorer.png', 'this player is a good perimeter scorer') }

                    { drawSkillsIconsInPlayers(element.insideScoring, './img/players-img/insideScorer.png', 'this player is a good inside scorer') }

                    { drawSkillsIconsInPlayers(element.playMaking, './img/players-img/playmaker.png', 'this player is a good playmaker') }

                </div>
                { drawStatRowOfPopup("Heigth", element.height) }

                { drawStatRowOfPopup("Weight", element.weight) }

                { drawStatRowOfPopup("Atleticism", element.atleticism) }

                { drawStatRowOfPopup("Per def", element.perimetrerDefence) }

                { drawStatRowOfPopup("Ins def", element.insideDefence) }

                { drawStatRowOfPopup("Rebounding", element.rebounding) }

                { drawStatRowOfPopup("Per scor", element.perimetrerScoring) }

                { drawStatRowOfPopup("Ins scor", element.insideScoring) }

                { drawStatRowOfPopup("Playmkn", element.playMaking) }

            </div>
        )
    }

    function drawStatRowOfPopup(skillName: string, statValue: number) {
        return (
            <div>
                <h4>{skillName}:</h4>
                <span className="stat-value">{statValue.toString()}</span>
            </div>
        )
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
                    if(player.ubicationX == colIndex+1 && player.ubicationY == rowIndex+1){
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