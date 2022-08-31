import React, { useState } from 'react'
import { numberEntire } from '../utilities/exportableFunctions'
import CreatePlayer from './CreatePlayer'

interface Props {
    team: string
}

function CreateTeam( { team }: Props) {
    let maxTeamPoints = 70*5*9

    const [totalTeamPoints, setTotalTeamPoints] = useState(maxTeamPoints)

    const [player1Stats, setPlayer1Stats] = useState({
        name: "",
        position: "1",
        height: 165,
        weight: 60,
        atleticism: 50,
        perimeterDefence: 50,
        insideDefence: 10,
        rebounding: 10,
        perimeterScoring: 50,
        insideScoring: 30,
        playMaking: 40
    })    

    const [player2Stats, setPlayer2Stats] = useState({
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

    const [player3Stats, setPlayer3Stats] = useState({
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

    const [player4Stats, setPlayer4Stats] = useState({
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

    const [player5Stats, setPlayer5Stats] = useState({
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

    const [teamStats, setTeamStats] = useState({
        player1Stats,
        player2Stats,
        player3Stats,
        player4Stats,
        player5Stats
    })
    
    return (
        <div className={`team-${team}-customization-container team-customization-container`}>
            <div className='max-team-points-input-container'>
                <label htmlFor='maxTeamPoints'>Max team points</label>
                <input type="range" name="maxTeamPoints" id='maxTeamPoints-input' min="0" max={maxTeamPoints} value={totalTeamPoints} readOnly/>
                <span className='maxTeamPoints-number'>{numberEntire(totalTeamPoints)}</span>
            </div>

            <div className='all-player-customization-container'>
                <CreatePlayer player={player1Stats} playerSetter={setPlayer1Stats} totalTeamPoints={totalTeamPoints} setTotalTeamPoints={setTotalTeamPoints}/>
                <CreatePlayer player={player2Stats} playerSetter={setPlayer2Stats} totalTeamPoints={totalTeamPoints} setTotalTeamPoints={setTotalTeamPoints}/>
                <CreatePlayer player={player3Stats} playerSetter={setPlayer3Stats} totalTeamPoints={totalTeamPoints} setTotalTeamPoints={setTotalTeamPoints}/>
                <CreatePlayer player={player4Stats} playerSetter={setPlayer4Stats} totalTeamPoints={totalTeamPoints} setTotalTeamPoints={setTotalTeamPoints}/>
                <CreatePlayer player={player5Stats} playerSetter={setPlayer5Stats} totalTeamPoints={totalTeamPoints} setTotalTeamPoints={setTotalTeamPoints}/>
            </div>
        </div>
    )
}

export default CreateTeam