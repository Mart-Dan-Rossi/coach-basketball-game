import React from 'react'
import { Match } from '../entities/match';

interface Props {
  match: Match
}

function MatchInfo( { match }: Props) {

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
        <span className='team-score'>{match.teamA.stats.points}</span>
        <span className="team-name team-a-name-in-scoreboard">{setDisplayableTeamName("TeamA")}</span>

        <div className="clocks-container">
          <div className="match-moment-container">
            <div className="game-clock-container">
              <span className='game-clock'>{match.timeLeft.minutes}</span>
              <span>:</span>
              <span className='game-clock'>{match.timeLeft.seconds < 10 ? `0${match.timeLeft.seconds}` : match.timeLeft.seconds}</span>
            </div>
            <span className="quarter-counter">{match.querter}{match.querter == 1 ? "RST" : match.querter == 2 ? "ND" : match.querter == 3 ? "RD" : "RTH"}</span>
          </div>
          <span className="shot-clock">{match.shotClock}</span>
        </div>

        <span className="team-name team-b-name-in-scoreboard">{setDisplayableTeamName("TeamB")}</span>
        <span className='team-score'>{match.teamB.stats.points}</span>
    </div>
  )
}

export default MatchInfo