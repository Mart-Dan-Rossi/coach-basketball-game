import React, { useContext, useState } from 'react'
import { GameContext } from '../context/GameContext';
import {calculatePlayerOverallRating, numberEntire, playerPositionDetection} from '../utilities/exportableFunctions';
import CreatePlayer from './CreatePlayer'
import {SwitchTransition, CSSTransition} from 'react-transition-group';

interface Props {
    totalTeamAPoints: number,
    setTotalTeamAPoints: React.Dispatch<React.SetStateAction<number>>,
    totalTeamBPoints: number,
    setTotalTeamBPoints: React.Dispatch<React.SetStateAction<number>>,
    maxTeamPoints: number,
    team: string
}

function CreateTeam( { totalTeamAPoints, setTotalTeamAPoints, totalTeamBPoints, setTotalTeamBPoints, maxTeamPoints, team }: Props) {

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
        setTeamsCreated,
        pointsUsedInPlayerA1,
        pointsUsedInPlayerA2,
        pointsUsedInPlayerA3,
        pointsUsedInPlayerA4,
        pointsUsedInPlayerA5,
        pointsUsedInPlayerB1,
        pointsUsedInPlayerB2,
        pointsUsedInPlayerB3,
        pointsUsedInPlayerB4,
        pointsUsedInPlayerB5,
        setPointsUsedInPlayerA1,
        setPointsUsedInPlayerA2,
        setPointsUsedInPlayerA3,
        setPointsUsedInPlayerA4,
        setPointsUsedInPlayerA5,
        setPointsUsedInPlayerB1,
        setPointsUsedInPlayerB2,
        setPointsUsedInPlayerB3,
        setPointsUsedInPlayerB4,
        setPointsUsedInPlayerB5,
        pointsUsedInStatsPlayerA1,
        pointsUsedInStatsPlayerA2,
        pointsUsedInStatsPlayerA3,
        pointsUsedInStatsPlayerA4,
        pointsUsedInStatsPlayerA5,
        pointsUsedInStatsPlayerB1,
        pointsUsedInStatsPlayerB2,
        pointsUsedInStatsPlayerB3,
        pointsUsedInStatsPlayerB4,
        pointsUsedInStatsPlayerB5,
        setPointsUsedInStatsPlayerA1,
        setPointsUsedInStatsPlayerA2,
        setPointsUsedInStatsPlayerA3,
        setPointsUsedInStatsPlayerA4,
        setPointsUsedInStatsPlayerA5,
        setPointsUsedInStatsPlayerB1,
        setPointsUsedInStatsPlayerB2,
        setPointsUsedInStatsPlayerB3,
        setPointsUsedInStatsPlayerB4,
        setPointsUsedInStatsPlayerB5,
    } = useContext(GameContext)

    let pointsUsedOnPlayersAArray = [pointsUsedInPlayerA1, pointsUsedInPlayerA2, pointsUsedInPlayerA3, pointsUsedInPlayerA4, pointsUsedInPlayerA5]

    let pointsUsedOnPlayersBArray = [pointsUsedInPlayerB1, pointsUsedInPlayerB2, pointsUsedInPlayerB3, pointsUsedInPlayerB4, pointsUsedInPlayerB5]

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
                <div key={`player-selector-${i}-${team}-${playerSelector}`} className={isThisPlayerSelected ? 'player-selector selected' : 'player-selector'} onClick={selectPlayer(i)}>
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
        if(totalTeamAPoints < 1 && totalTeamBPoints < 1) {
            setTeamAStats({playerA1Stats, playerA2Stats, playerA3Stats, playerA4Stats, playerA5Stats})
            setTeamBStats({playerB1Stats, playerB2Stats, playerB3Stats, playerB4Stats, playerB5Stats})
            setTeamsCreated(true)
        }
    }
    
    return (
        <div className={`team-${team}-customization-container team-customization-container`}>
            <div className='max-team-points-input-container'>
                <label htmlFor='maxTeamPoints'>Max team points</label>
                <input type="range" name="maxTeamPoints" id='maxTeamPoints-input' min="0" max={maxTeamPoints} value={team == "A" ? totalTeamAPoints : totalTeamBPoints} readOnly/>
                <span className='maxTeamPoints-number'>{team == "A" ? numberEntire(totalTeamAPoints) : numberEntire(totalTeamBPoints)}</span>
            </div>

            {
                addPlayersSelectors()
            }

            <div className='all-player-customization-container'>
                {
                    <SwitchTransition>
                        <CSSTransition classNames="fade" key={`fade-${team}-player-${createPlayer.toString()}`} addEndListener={(node, done) =>{node.addEventListener("transitionend", done, false)}}>
                            {
                            team == "A" ?
                                createPlayer == 1 ?
                                <CreatePlayer team={team} playerPosition={playerPositionDetection(createPlayer.toString())} player={playerA1Stats} playerSetter={setPlayerA1Stats} totalTeamPoints={totalTeamAPoints} setTotalTeamPoints={setTotalTeamAPoints} pointsUsedInPlayer={pointsUsedInPlayerA1} setPointsUsedInPlayer={setPointsUsedInPlayerA1} pointsUsedInStats={pointsUsedInStatsPlayerA1} setPointsUsedInStats={setPointsUsedInStatsPlayerA1}/>
                                : createPlayer == 2 ?
                                <CreatePlayer team={team} playerPosition={playerPositionDetection(createPlayer.toString())} player={playerA2Stats} playerSetter={setPlayerA2Stats} totalTeamPoints={totalTeamAPoints} setTotalTeamPoints={setTotalTeamAPoints} pointsUsedInPlayer={pointsUsedInPlayerA2} setPointsUsedInPlayer={setPointsUsedInPlayerA2} pointsUsedInStats={pointsUsedInStatsPlayerA2} setPointsUsedInStats={setPointsUsedInStatsPlayerA2}/>
                                : createPlayer == 3 ?
                                <CreatePlayer team={team} playerPosition={playerPositionDetection(createPlayer.toString())} player={playerA3Stats} playerSetter={setPlayerA3Stats} totalTeamPoints={totalTeamAPoints} setTotalTeamPoints={setTotalTeamAPoints} pointsUsedInPlayer={pointsUsedInPlayerA3} setPointsUsedInPlayer={setPointsUsedInPlayerA3} pointsUsedInStats={pointsUsedInStatsPlayerA3} setPointsUsedInStats={setPointsUsedInStatsPlayerA3}/>
                                : createPlayer == 4 ?
                                <CreatePlayer team={team} playerPosition={playerPositionDetection(createPlayer.toString())} player={playerA4Stats} playerSetter={setPlayerA4Stats} totalTeamPoints={totalTeamAPoints} setTotalTeamPoints={setTotalTeamAPoints} pointsUsedInPlayer={pointsUsedInPlayerA4} setPointsUsedInPlayer={setPointsUsedInPlayerA4} pointsUsedInStats={pointsUsedInStatsPlayerA4} setPointsUsedInStats={setPointsUsedInStatsPlayerA4}/>
                                : createPlayer == 5 ?
                                <CreatePlayer team={team} playerPosition={playerPositionDetection(createPlayer.toString())} player={playerA5Stats} playerSetter={setPlayerA5Stats} totalTeamPoints={totalTeamAPoints} setTotalTeamPoints={setTotalTeamAPoints} pointsUsedInPlayer={pointsUsedInPlayerA5} setPointsUsedInPlayer={setPointsUsedInPlayerA5} pointsUsedInStats={pointsUsedInStatsPlayerA5} setPointsUsedInStats={setPointsUsedInStatsPlayerA5}/>
                                : createPlayer == 0 &&
                                <p>Remember, you have 3150 points to spend among your 5 players. You can balance the score between them or enhance any of them.</p>
                            :
                                createPlayer == 1 ?
                                <CreatePlayer team={team} playerPosition={playerPositionDetection(createPlayer.toString())} player={playerB1Stats} playerSetter={setPlayerB1Stats} totalTeamPoints={totalTeamBPoints} setTotalTeamPoints={setTotalTeamBPoints} pointsUsedInPlayer={pointsUsedInPlayerB1} setPointsUsedInPlayer={setPointsUsedInPlayerB1} pointsUsedInStats={pointsUsedInStatsPlayerB1} setPointsUsedInStats={setPointsUsedInStatsPlayerB1}/>
                                : createPlayer == 2 ?
                                <CreatePlayer team={team} playerPosition={playerPositionDetection(createPlayer.toString())} player={playerB2Stats} playerSetter={setPlayerB2Stats} totalTeamPoints={totalTeamBPoints} setTotalTeamPoints={setTotalTeamBPoints} pointsUsedInPlayer={pointsUsedInPlayerB2} setPointsUsedInPlayer={setPointsUsedInPlayerB2} pointsUsedInStats={pointsUsedInStatsPlayerB2} setPointsUsedInStats={setPointsUsedInStatsPlayerB2}/>
                                : createPlayer == 3 ?
                                <CreatePlayer team={team} playerPosition={playerPositionDetection(createPlayer.toString())} player={playerB3Stats} playerSetter={setPlayerB3Stats} totalTeamPoints={totalTeamBPoints} setTotalTeamPoints={setTotalTeamBPoints} pointsUsedInPlayer={pointsUsedInPlayerB3} setPointsUsedInPlayer={setPointsUsedInPlayerB3} pointsUsedInStats={pointsUsedInStatsPlayerB3} setPointsUsedInStats={setPointsUsedInStatsPlayerB3}/>
                                : createPlayer == 4 ?
                                <CreatePlayer team={team} playerPosition={playerPositionDetection(createPlayer.toString())} player={playerB4Stats} playerSetter={setPlayerB4Stats} totalTeamPoints={totalTeamBPoints} setTotalTeamPoints={setTotalTeamBPoints} pointsUsedInPlayer={pointsUsedInPlayerB4} setPointsUsedInPlayer={setPointsUsedInPlayerB4} pointsUsedInStats={pointsUsedInStatsPlayerB4} setPointsUsedInStats={setPointsUsedInStatsPlayerB4}/>
                                : createPlayer == 5 ?
                                <CreatePlayer team={team} playerPosition={playerPositionDetection(createPlayer.toString())} player={playerB5Stats} playerSetter={setPlayerB5Stats} totalTeamPoints={totalTeamBPoints} setTotalTeamPoints={setTotalTeamBPoints} pointsUsedInPlayer={pointsUsedInPlayerB5} setPointsUsedInPlayer={setPointsUsedInPlayerB5} pointsUsedInStats={pointsUsedInStatsPlayerB5} setPointsUsedInStats={setPointsUsedInStatsPlayerB5}/>
                                : createPlayer == 0 &&
                                <p>Remember, you have 3150 points to spend among your 5 players. You can balance the score between them or enhance any of them.</p>
                            }
                        </CSSTransition>
                    </SwitchTransition>
                }                
            </div>
            <div className="confirm-teams">
                <button className={totalTeamAPoints < 2 && totalTeamBPoints < 2 ? "true" : "false"} onClick={confirmTeamButtonHandler}>Confirm both teams</button>
                {totalTeamAPoints < 2 && totalTeamBPoints < 2 ?
                    <span className='valid'>Ready to canfirm</span>
                    :
                    <span className='error'>You have to use all your points to confirm</span>
                }
            </div>
        </div>
    )
}

export default CreateTeam