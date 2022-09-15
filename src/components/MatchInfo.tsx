import React, { useContext } from 'react'
import { GameContext } from '../context/GameContext'

function MatchInfo() {
    const {
        teamAScore,
        teamBScore,
        gameClockMin,
        gameClockSec,
        gameQuarter
      } = useContext(GameContext)
  return (
    <div className='match-info-container'>
        <span className='team-score'>{teamAScore}</span>
        <span className='game-clock'>{gameClockMin}</span>
        <span className='game-clock'>{gameClockSec < 10 ? `0${gameClockSec}` : gameClockSec}</span>
        <span className="quarter-counter">{gameQuarter}</span>
        <span className='team-score'>{teamBScore}</span>
    </div>
  )
}

export default MatchInfo