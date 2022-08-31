import React from 'react'
import CreateTeam from './CreateTeam'
import './CustomizeGame.css'

function CustomizeGame() {
  return (
    <div className='customize-game-container'>
        <CreateTeam team = {"A"}/>
        <CreateTeam team = {"B"}/>
    </div>
  )
}

export default CustomizeGame