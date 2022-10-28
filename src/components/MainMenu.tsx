import React from 'react'
import { Link } from 'react-router-dom'
import './MainMenu.css'

function MainMenu() {
  return (
    <div className='main-menu'>
        <div className="flex-index">
            <div className="game-logo-container">
                <img className="logo" src="./Img/18679.png" alt="Basketball tactics logo"/>
            </div>
            <div>
                <span className="title">Basketball Tactics</span>
            </div>
            <main>
                <div className="main-options">
                    <Link to={"/game-started"}>
                        <p>New Game</p>
                    </Link>
                    <Link to={"/"}>
                        <p>Continue game</p>
                    </Link>
                    <Link to={"/rules"}>
                        <p>Rules</p>
                    </Link>
                </div>
            </main>
            <footer>
                <a target={'_blank'} href='https://www.freepik.es/vectores/fondo'>Vector created by brgfx - www.freepik.es</a>
            </footer>
        </div>
    </div>
  )
}

export default MainMenu