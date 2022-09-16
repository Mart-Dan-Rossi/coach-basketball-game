import React from 'react'
import GameBoard from './GameBoard';
import {useContext} from 'react';
import {GameContext} from '../context/GameContext';
import './GameContainer.css'
import MatchInfo from './MatchInfo';
import MatchActionsContainer from './MatchActionsContainer';

export default function GameContainer() {
    const {
        teamAStats,
        teamBStats
      } = useContext(GameContext)
  return (
    <div className='game-container'>
        <MatchInfo />
        <GameBoard teamAStats={teamAStats} teamBStats={teamBStats}/>
        <MatchActionsContainer />
    </div>
  )
}
