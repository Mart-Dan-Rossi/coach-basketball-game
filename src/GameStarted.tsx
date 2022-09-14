import React from 'react'
import {useContext} from 'react';
import {GameContext} from './context/GameContext';
import CustomizeGame from './components/CustomizeGame';
import GameBoard from './components/GameBoard';

function Main() {
    const {
        teamAStats,
        teamBStats,
        teamsCreated
      } = useContext(GameContext)
  return (
    <>
        {
          teamsCreated ?
            <GameBoard teamAStats={teamAStats} teamBStats={teamBStats}/>
            :
            <CustomizeGame />
        }
    </>
  )
}

export default Main