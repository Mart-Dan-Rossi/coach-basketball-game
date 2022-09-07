import { GameContext } from "./GameContext"
import React from 'react'
import {useState} from 'react';

interface props {
    children: JSX.Element | JSX.Element[]
}

export const GameContextProvider = ({ children }: props) =>{

    //Use the min values per position to fill this info
    const [playerA1Stats, setPlayerA1Stats] = useState({
        name: "",
        position: "1",
        height: 165,
        weight: 60,
        atleticism: 60,
        perimeterDefence: 50,
        insideDefence: 10,
        rebounding: 10,
        perimeterScoring: 50,
        insideScoring: 30,
        playMaking: 40
    })

    //Use the min values per position to fill this info
    const [playerA2Stats, setPlayerA2Stats] = useState({
        name: "",
        position: "2",
        height: 170,
        weight: 65,
        atleticism: 40,
        perimeterDefence: 45,
        insideDefence: 15,
        rebounding: 15,
        perimeterScoring: 50,
        insideScoring: 30,
        playMaking: 40
    })   

    //Use the min values per position to fill this info
    const [playerA3Stats, setPlayerA3Stats] = useState({
        name: "",
        position: "3",
        height: 175,
        weight: 70,
        atleticism: 40,
        perimeterDefence: 40,
        insideDefence: 30,
        rebounding: 30,
        perimeterScoring: 30,
        insideScoring: 40,
        playMaking: 10
    })    

    //Use the min values per position to fill this info
    const [playerA4Stats, setPlayerA4Stats] = useState({
        name: "",
        position: "4",
        height: 190,
        weight: 80,
        atleticism: 30,
        perimeterDefence: 20,
        insideDefence: 40,
        rebounding: 50,
        perimeterScoring: 10,
        insideScoring: 60,
        playMaking: 5
    })

    //Use the min values per position to fill this info
    const [playerA5Stats, setPlayerA5Stats] = useState({
        name: "",
        position: "5",
        height: 205,
        weight: 90,
        atleticism: 15,
        perimeterDefence: 5,
        insideDefence: 60,
        rebounding: 60,
        perimeterScoring: 5,
        insideScoring: 65,
        playMaking: 1
    }) 

    const [teamAStats, setTeamAStats] = useState({
        playerA1Stats,
        playerA2Stats,
        playerA3Stats,
        playerA4Stats,
        playerA5Stats
    })

    //Use the min values per position to fill this info
    const [playerB1Stats, setPlayerB1Stats] = useState({
        name: "",
        position: "1",
        height: 165,
        weight: 60,
        atleticism: 60,
        perimeterDefence: 50,
        insideDefence: 10,
        rebounding: 10,
        perimeterScoring: 50,
        insideScoring: 30,
        playMaking: 40
    })

    //Use the min values per position to fill this info
    const [playerB2Stats, setPlayerB2Stats] = useState({
        name: "",
        position: "2",
        height: 170,
        weight: 65,
        atleticism: 40,
        perimeterDefence: 45,
        insideDefence: 15,
        rebounding: 15,
        perimeterScoring: 50,
        insideScoring: 30,
        playMaking: 40
    })   

    //Use the min values per position to fill this info
    const [playerB3Stats, setPlayerB3Stats] = useState({
        name: "",
        position: "3",
        height: 175,
        weight: 70,
        atleticism: 40,
        perimeterDefence: 40,
        insideDefence: 30,
        rebounding: 30,
        perimeterScoring: 30,
        insideScoring: 40,
        playMaking: 10
    })    

    //Use the min values per position to fill this info
    const [playerB4Stats, setPlayerB4Stats] = useState({
        name: "",
        position: "4",
        height: 190,
        weight: 80,
        atleticism: 30,
        perimeterDefence: 20,
        insideDefence: 40,
        rebounding: 50,
        perimeterScoring: 10,
        insideScoring: 60,
        playMaking: 5
    })

    //Use the min values per position to fill this info
    const [playerB5Stats, setPlayerB5Stats] = useState({
        name: "",
        position: "5",
        height: 205,
        weight: 90,
        atleticism: 15,
        perimeterDefence: 5,
        insideDefence: 60,
        rebounding: 60,
        perimeterScoring: 5,
        insideScoring: 65,
        playMaking: 1
    }) 

    const [teamBStats, setTeamBStats] = useState({
        playerB1Stats,
        playerB2Stats,
        playerB3Stats,
        playerB4Stats,
        playerB5Stats
    })

    return (
        <GameContext.Provider 
        value={
            {playerA1Stats, playerA2Stats, playerA3Stats, playerA4Stats, playerA5Stats, setPlayerA1Stats, setPlayerA2Stats, setPlayerA3Stats, setPlayerA4Stats, setPlayerA5Stats, teamAStats, setTeamAStats,
            playerB1Stats, playerB2Stats, playerB3Stats, playerB4Stats, playerB5Stats, setPlayerB1Stats, setPlayerB2Stats, setPlayerB3Stats, setPlayerB4Stats, setPlayerB5Stats, teamBStats, setTeamBStats}}>
            { children }
        </GameContext.Provider>
    )
}