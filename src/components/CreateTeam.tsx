import React, { useContext, useState } from 'react'
import { GameContext } from '../context/GameContext';
import {calculatePlayerOverallRating, numberEntire, playerPositionDetection} from '../utilities/exportableFunctions';
import CreatePlayer from './CreatePlayer'
import {SwitchTransition, CSSTransition} from 'react-transition-group';

interface Props {
    team: string
}

function CreateTeam( { team }: Props) {
    let maxTeamPoints = 70*5*9

    const {
        playerA1Stats,
        playerA2Stats,
        playerA3Stats,
        playerA4Stats,
        playerA5Stats,
        setPlayerA1Stats,
        setPlayerA2Stats,
        setPlayerA3Stats,
        setPlayerA4Stats,
        setPlayerA5Stats,
        setTeamAStats,
        playerB1Stats,
        playerB2Stats,
        playerB3Stats,
        playerB4Stats,
        playerB5Stats,
        setPlayerB1Stats,
        setPlayerB2Stats,
        setPlayerB3Stats,
        setPlayerB4Stats,
        setPlayerB5Stats,
        setTeamBStats,
    } = useContext(GameContext)

    const [totalTeamAPoints, setTotalTeamAPoints] = useState(maxTeamPoints)

    const [pointsUsedInPlayerA1, setPointsUsedInPlayerA1] = useState(0)
    const [pointsUsedInStatsPlayerA1, setPointsUsedInStatsPlayerA1] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    const [pointsUsedInPlayerA2, setPointsUsedInPlayerA2] = useState(0)
    const [pointsUsedInStatsPlayerA2, setPointsUsedInStatsPlayerA2] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    const [pointsUsedInPlayerA3, setPointsUsedInPlayerA3] = useState(0)
    const [pointsUsedInStatsPlayerA3, setPointsUsedInStatsPlayerA3] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    const [pointsUsedInPlayerA4, setPointsUsedInPlayerA4] = useState(0)
    const [pointsUsedInStatsPlayerA4, setPointsUsedInStatsPlayerA4] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    const [pointsUsedInPlayerA5, setPointsUsedInPlayerA5] = useState(0)
    const [pointsUsedInStatsPlayerA5, setPointsUsedInStatsPlayerA5] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    let pointsUsedOnPlayersAArray = [pointsUsedInPlayerA1, pointsUsedInPlayerA2, pointsUsedInPlayerA3, pointsUsedInPlayerA4, pointsUsedInPlayerA5]

    const [totalTeamBPoints, setTotalTeamBPoints] = useState(maxTeamPoints)

    const [pointsUsedInPlayerB1, setPointsUsedInPlayerB1] = useState(0)
    const [pointsUsedInStatsPlayerB1, setPointsUsedInStatsPlayerB1] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    const [pointsUsedInPlayerB2, setPointsUsedInPlayerB2] = useState(0)
    const [pointsUsedInStatsPlayerB2, setPointsUsedInStatsPlayerB2] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    const [pointsUsedInPlayerB3, setPointsUsedInPlayerB3] = useState(0)
    const [pointsUsedInStatsPlayerB3, setPointsUsedInStatsPlayerB3] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    const [pointsUsedInPlayerB4, setPointsUsedInPlayerB4] = useState(0)
    const [pointsUsedInStatsPlayerB4, setPointsUsedInStatsPlayerB4] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    const [pointsUsedInPlayerB5, setPointsUsedInPlayerB5] = useState(0)
    const [pointsUsedInStatsPlayerB5, setPointsUsedInStatsPlayerB5] = useState({height: 0, weight: 0, atleticism: 0, perDef: 0, insDef: 0, reb: 0, perScor: 0, insScor: 0, plmkn: 0})

    let pointsUsedOnPlayersBArray = [pointsUsedInPlayerB1, pointsUsedInPlayerB2, pointsUsedInPlayerB3, pointsUsedInPlayerB4, pointsUsedInPlayerB5]
    // console.log("pointsUsedOnPlayersBArray", pointsUsedOnPlayersBArray)

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
                    {
                        team=="A" ? 
                        <h4>Player valoration <span>{calculatePlayerOverallRating(pointsUsedOnPlayersAArray[i-1])}</span></h4>
                        :
                        <h4>Player valoration <span>{calculatePlayerOverallRating(pointsUsedOnPlayersBArray[i-1])}</span></h4>
                    }
                </div>
            )
        }
        return <div className='all-players-selectors'>{playerSelector}</div>
    }

    function confirmTeamButtonHandler() {
        if(team == "A"){
            setTeamAStats({playerA1Stats, playerA2Stats, playerA3Stats, playerA4Stats, playerA5Stats})

        } else if(team == "B"){
            setTeamBStats({playerB1Stats, playerB2Stats, playerB3Stats, playerB4Stats, playerB5Stats})
        }
    }
    
    return (
        <div className={`team-${team}-customization-container team-customization-container`}>
            <div className='max-team-points-input-container'>
                <label htmlFor='maxTeamPoints'>Max team points</label>
                <input type="range" name="maxTeamPoints" id='maxTeamPoints-input' min="0" max={maxTeamPoints} value={totalTeamAPoints} readOnly/>
                <span className='maxTeamPoints-number'>{numberEntire(totalTeamAPoints)}</span>
            </div>

            {
                addPlayersSelectors()
            }

            <div className='all-player-customization-container'>
                {
                    <SwitchTransition>
                        <CSSTransition classNames="fade" key={team + "player" + createPlayer.toString()} addEndListener={(node, done) =>{node.addEventListener("transitionend", done, false)}}>
                            {
                            team == "A" ?
                                createPlayer == 1 ?
                                <CreatePlayer playerPosition={playerPositionDetection(createPlayer.toString())} player={playerA1Stats} playerSetter={setPlayerA1Stats} totalTeamPoints={totalTeamAPoints} setTotalTeamPoints={setTotalTeamAPoints} pointsUsedInPlayer={pointsUsedInPlayerA1} setPointsUsedInPlayer={setPointsUsedInPlayerA1} pointsUsedInStats={pointsUsedInStatsPlayerA1} setPointsUsedInStats={setPointsUsedInStatsPlayerA1}/>
                                : createPlayer == 2 ?
                                <CreatePlayer playerPosition={playerPositionDetection(createPlayer.toString())} player={playerA2Stats} playerSetter={setPlayerA2Stats} totalTeamPoints={totalTeamAPoints} setTotalTeamPoints={setTotalTeamAPoints} pointsUsedInPlayer={pointsUsedInPlayerA2} setPointsUsedInPlayer={setPointsUsedInPlayerA2} pointsUsedInStats={pointsUsedInStatsPlayerA2} setPointsUsedInStats={setPointsUsedInStatsPlayerA2}/>
                                : createPlayer == 3 ?
                                <CreatePlayer playerPosition={playerPositionDetection(createPlayer.toString())} player={playerA3Stats} playerSetter={setPlayerA3Stats} totalTeamPoints={totalTeamAPoints} setTotalTeamPoints={setTotalTeamAPoints} pointsUsedInPlayer={pointsUsedInPlayerA3} setPointsUsedInPlayer={setPointsUsedInPlayerA3} pointsUsedInStats={pointsUsedInStatsPlayerA3} setPointsUsedInStats={setPointsUsedInStatsPlayerA3}/>
                                : createPlayer == 4 ?
                                <CreatePlayer playerPosition={playerPositionDetection(createPlayer.toString())} player={playerA4Stats} playerSetter={setPlayerA4Stats} totalTeamPoints={totalTeamAPoints} setTotalTeamPoints={setTotalTeamAPoints} pointsUsedInPlayer={pointsUsedInPlayerA4} setPointsUsedInPlayer={setPointsUsedInPlayerA4} pointsUsedInStats={pointsUsedInStatsPlayerA4} setPointsUsedInStats={setPointsUsedInStatsPlayerA4}/>
                                : createPlayer == 5 ?
                                <CreatePlayer playerPosition={playerPositionDetection(createPlayer.toString())} player={playerA5Stats} playerSetter={setPlayerA5Stats} totalTeamPoints={totalTeamAPoints} setTotalTeamPoints={setTotalTeamAPoints} pointsUsedInPlayer={pointsUsedInPlayerA5} setPointsUsedInPlayer={setPointsUsedInPlayerA5} pointsUsedInStats={pointsUsedInStatsPlayerA5} setPointsUsedInStats={setPointsUsedInStatsPlayerA5}/>
                                : createPlayer == 0 &&
                                <p>Remember, you have 3150 points to spend among your 5 players. You can balance the score between them or enhance any of them.</p>
                            :
                                createPlayer == 1 ?
                                <CreatePlayer playerPosition={playerPositionDetection(createPlayer.toString())} player={playerB1Stats} playerSetter={setPlayerB1Stats} totalTeamPoints={totalTeamBPoints} setTotalTeamPoints={setTotalTeamBPoints} pointsUsedInPlayer={pointsUsedInPlayerB1} setPointsUsedInPlayer={setPointsUsedInPlayerB1} pointsUsedInStats={pointsUsedInStatsPlayerB1} setPointsUsedInStats={setPointsUsedInStatsPlayerB1}/>
                                : createPlayer == 2 ?
                                <CreatePlayer playerPosition={playerPositionDetection(createPlayer.toString())} player={playerB2Stats} playerSetter={setPlayerB2Stats} totalTeamPoints={totalTeamBPoints} setTotalTeamPoints={setTotalTeamBPoints} pointsUsedInPlayer={pointsUsedInPlayerB2} setPointsUsedInPlayer={setPointsUsedInPlayerB2} pointsUsedInStats={pointsUsedInStatsPlayerB2} setPointsUsedInStats={setPointsUsedInStatsPlayerB2}/>
                                : createPlayer == 3 ?
                                <CreatePlayer playerPosition={playerPositionDetection(createPlayer.toString())} player={playerB3Stats} playerSetter={setPlayerB3Stats} totalTeamPoints={totalTeamBPoints} setTotalTeamPoints={setTotalTeamBPoints} pointsUsedInPlayer={pointsUsedInPlayerB3} setPointsUsedInPlayer={setPointsUsedInPlayerB3} pointsUsedInStats={pointsUsedInStatsPlayerB3} setPointsUsedInStats={setPointsUsedInStatsPlayerB3}/>
                                : createPlayer == 4 ?
                                <CreatePlayer playerPosition={playerPositionDetection(createPlayer.toString())} player={playerB4Stats} playerSetter={setPlayerB4Stats} totalTeamPoints={totalTeamBPoints} setTotalTeamPoints={setTotalTeamBPoints} pointsUsedInPlayer={pointsUsedInPlayerB4} setPointsUsedInPlayer={setPointsUsedInPlayerB4} pointsUsedInStats={pointsUsedInStatsPlayerB4} setPointsUsedInStats={setPointsUsedInStatsPlayerB4}/>
                                : createPlayer == 5 ?
                                <CreatePlayer playerPosition={playerPositionDetection(createPlayer.toString())} player={playerB5Stats} playerSetter={setPlayerB5Stats} totalTeamPoints={totalTeamBPoints} setTotalTeamPoints={setTotalTeamBPoints} pointsUsedInPlayer={pointsUsedInPlayerB5} setPointsUsedInPlayer={setPointsUsedInPlayerB5} pointsUsedInStats={pointsUsedInStatsPlayerB5} setPointsUsedInStats={setPointsUsedInStatsPlayerB5}/>
                                : createPlayer == 0 &&
                                <p>Remember, you have 3150 points to spend among your 5 players. You can balance the score between them or enhance any of them.</p>
                            }
                        </CSSTransition>
                    </SwitchTransition>
                }                
            </div>
            <div className="confirm-team">
                <span>You have to use all your points to confirm</span>
                <button className={totalTeamAPoints < 1 ? "confirm-team true" : "confirm-team"} onClick={confirmTeamButtonHandler}>Confirm team</button>
            </div>
        </div>
    )
}

export default CreateTeam