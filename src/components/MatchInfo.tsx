import React, { useContext } from 'react'
import { GameContext } from '../context/GameContext'

function MatchInfo() {
    const {
        teamAScore,
        teamBScore,
        gameClockMin,
        gameClockSec,
        gameQuarter,
        shotClock
      } = useContext(GameContext)

      function setDisplayableTeamName(teamName: string) {
        if(teamName.length <= 11){
          return teamName
        } else {
          let displayableTeamName = teamName.slice(0, 6) + "..."
          return displayableTeamName
        }
      }

  return (
    <div className='match-info-container'>
        <span className='team-score'>{teamAScore}</span>
        <span className="team-name team-a-name-in-scoreboard">{setDisplayableTeamName("TeamA")}</span>

        <div className="clocks-container">
          <div className="match-moment-container">
            <div className="game-clock-container">
              <span className='game-clock'>{gameClockMin}</span>
              <span>:</span>
              <span className='game-clock'>{gameClockSec < 10 ? `0${gameClockSec}` : gameClockSec}</span>
            </div>
            <span className="quarter-counter">{gameQuarter}{gameQuarter == 1 ? "RST" : gameQuarter == 2 ? "ND" : gameQuarter == 3 ? "RD" : "RTH"}</span>
          </div>
          <span className="shot-clock">{shotClock}</span>
        </div>

        <span className="team-name team-b-name-in-scoreboard">{setDisplayableTeamName("TeamB")}</span>
        <span className='team-score'>{teamBScore}</span>
    </div>
  )
}

export default MatchInfo