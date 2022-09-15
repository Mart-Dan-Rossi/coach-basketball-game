import React from 'react'
import {useContext} from 'react';
import {GameContext} from './context/GameContext';
import CustomizeGame from './components/CustomizeGame';
import GameBoard from './components/GameBoard';
import GameContainer from './components/GameContainer';

function Main() {
    const {
        teamsCreated
      } = useContext(GameContext)
  return (
    <>
        {
          !teamsCreated ?
            <GameContainer/>
            :
            <CustomizeGame />
        }
    </>
  )
}

export default Main