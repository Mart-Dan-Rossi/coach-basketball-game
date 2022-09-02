import React, { useState } from 'react'
import {calculatePlayerOverallRating, numberEntire, playerPositionDetection} from '../utilities/exportableFunctions';
import CreatePlayer from './CreatePlayer'

interface Props {
    team: string
}

function CreateTeam( { team }: Props) {
    let maxTeamPoints = 70*5*9

    const [totalTeamPoints, setTotalTeamPoints] = useState(maxTeamPoints)

    //Use the min values per position to fill this info
    const [player1Stats, setPlayer1Stats] = useState({
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
    const [pointsUsedInPlayer1, setPointsUsedInPlayer1] = useState(0)

    //Use the min values per position to fill this info
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
    const [pointsUsedInPlayer2, setPointsUsedInPlayer2] = useState(0)

    //Use the min values per position to fill this info
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
    const [pointsUsedInPlayer3, setPointsUsedInPlayer3] = useState(0)

    //Use the min values per position to fill this info
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
    const [pointsUsedInPlayer4, setPointsUsedInPlayer4] = useState(0)

    //Use the min values per position to fill this info
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
    const [pointsUsedInPlayer5, setPointsUsedInPlayer5] = useState(0)

    let pointsUsedOnPlayersArray = [pointsUsedInPlayer1, pointsUsedInPlayer2, pointsUsedInPlayer3, pointsUsedInPlayer4, pointsUsedInPlayer5]

    const [teamStats, setTeamStats] = useState({
        player1Stats,
        player2Stats,
        player3Stats,
        player4Stats,
        player5Stats
    })

    const [createPlayer, setCreatePlayer] = useState(0)

    function selectPlayer(player: number) {
        return ()=> {
            if(player != createPlayer) {
                setCreatePlayer(player)
            } else {
                setCreatePlayer(0)
            }
        }
    }

    function addPlayersSelectors() {
        let playerSelector = []
        let isThisPlayerSelected: boolean
        for(let i = 1; i<=5; i++){
            if(createPlayer == i) {
                isThisPlayerSelected = true
            } else {
                isThisPlayerSelected = false
            }
            playerSelector.push(
                <div key={i} className={isThisPlayerSelected ? 'player-selector selected' : 'player-selector'} onClick={selectPlayer(i)}>
                    <h3>{playerPositionDetection(i.toString())}</h3>
                    <h4>Player valoration <span>{calculatePlayerOverallRating(i, pointsUsedOnPlayersArray)}</span></h4>
                </div>
            )
        }
        return <div className='all-players-selectors'>{playerSelector}</div>
    }

    function confirmTeamButtonHandler() {
        setTeamStats({player1Stats, player2Stats, player3Stats, player4Stats, player5Stats})
    }
    
    return (
        <div className={`team-${team}-customization-container team-customization-container`}>
            <div className='max-team-points-input-container'>
                <label htmlFor='maxTeamPoints'>Max team points</label>
                <input type="range" name="maxTeamPoints" id='maxTeamPoints-input' min="0" max={maxTeamPoints} value={totalTeamPoints} readOnly/>
                <span className='maxTeamPoints-number'>{numberEntire(totalTeamPoints)}</span>
            </div>

            {
                addPlayersSelectors()
            }

            <div className='all-player-customization-container'>
                {
                    createPlayer == 1 ?
                    <CreatePlayer player={player1Stats} playerSetter={setPlayer1Stats} totalTeamPoints={totalTeamPoints} setTotalTeamPoints={setTotalTeamPoints} pointsUsedInPlayer={pointsUsedInPlayer1} setPointsUsedInPlayer={setPointsUsedInPlayer1}/>
                    : createPlayer == 2 ?
                    <CreatePlayer player={player2Stats} playerSetter={setPlayer2Stats} totalTeamPoints={totalTeamPoints} setTotalTeamPoints={setTotalTeamPoints} pointsUsedInPlayer={pointsUsedInPlayer2} setPointsUsedInPlayer={setPointsUsedInPlayer2}/>
                    : createPlayer == 3 ?
                    <CreatePlayer player={player3Stats} playerSetter={setPlayer3Stats} totalTeamPoints={totalTeamPoints} setTotalTeamPoints={setTotalTeamPoints} pointsUsedInPlayer={pointsUsedInPlayer3} setPointsUsedInPlayer={setPointsUsedInPlayer3}/>
                    : createPlayer == 4 ?
                    <CreatePlayer player={player4Stats} playerSetter={setPlayer4Stats} totalTeamPoints={totalTeamPoints} setTotalTeamPoints={setTotalTeamPoints} pointsUsedInPlayer={pointsUsedInPlayer4} setPointsUsedInPlayer={setPointsUsedInPlayer4}/>
                    : createPlayer == 5 ?
                    <CreatePlayer player={player5Stats} playerSetter={setPlayer5Stats} totalTeamPoints={totalTeamPoints} setTotalTeamPoints={setTotalTeamPoints} pointsUsedInPlayer={pointsUsedInPlayer5} setPointsUsedInPlayer={setPointsUsedInPlayer5}/>
                    : createPlayer == 0 &&
                    <p>Remember, you have 3150 points to spend among your 5 players. You can balance the score between them or enhance any of them.</p>
                }                
            </div>
            <div className="confirm-team">
                <span>You have to use all your points to confirm</span>
                <button className={totalTeamPoints < 1 ? "confirm-team true" : "confirm-team"} onClick={confirmTeamButtonHandler}>Confirm team</button>
            </div>
        </div>
    )
}

export default CreateTeam