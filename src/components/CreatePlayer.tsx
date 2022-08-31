import React from 'react'
import { PlayerStat } from '../entities/myInterfaces'
import {getMinStatPerPosition, getMaxStatPerPosition, getValue, playerPositionDetection, firstLetterToUpper, separateCamelCaseBySpace} from '../utilities/exportableFunctions';

interface Props {
    player: PlayerStat,
    playerSetter: React.Dispatch<React.SetStateAction<PlayerStat>>,
    totalTeamPoints: number,
    setTotalTeamPoints: React.Dispatch<React.SetStateAction<number>>
}

function CreatePlayer( { player, playerSetter, totalTeamPoints, setTotalTeamPoints } : Props ) {

    const nameOnkeydownHandler = (e :  React.ChangeEvent<HTMLInputElement>) => {
        let inputModified = e.target as HTMLInputElement
        let inputValue = inputModified.value as string

        let newPlayerStats = {...player}
        newPlayerStats.name = inputValue
        
        playerSetter(newPlayerStats)
    }
    
    let arrayOfKeysOfNumericProperties = [] as string[]
    for(let key in player) {
        if(key != "name" && key != "position") {
            arrayOfKeysOfNumericProperties.push(key)
        }
    }


    function inputOnChangeHandler(statType: string){   
        return (e: React.ChangeEvent<HTMLInputElement>)=> {
            let inputModified = e.target as HTMLInputElement
            let inputValue = Number(inputModified.value) as number
    
            let newPlayerStats = {...player}

            let minStatValue = getMinStatPerPosition(statType, player.position)
            let maxStatValue = getMaxStatPerPosition(statType, player.position)
            let statRange = maxStatValue - minStatValue

            
            if(statType == "height"){
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.height || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.height - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0){
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.height = inputValue
                    }
                }
                
            } else if(statType == "weight"){
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.weight || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.weight - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0){
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.weight = inputValue
                    }
                }
                
            } else if(statType == "atleticism"){
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.atleticism || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.atleticism - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0){
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.atleticism = inputValue
                    }
                }
                
            } else if(statType == "perimeterDefence"){
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.perimeterDefence || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.perimeterDefence - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0){
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.perimeterDefence = inputValue
                    }
                }
                
            } else if(statType == "insideDefence"){
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.insideDefence || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.insideDefence - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0){
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.insideDefence = inputValue
                    }
                }
                
            } else if(statType == "rebounding"){
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.rebounding || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.rebounding - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0){
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.rebounding = inputValue
                    }
                }
                
            } else if(statType == "perimeterScoring"){
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.perimeterScoring || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.perimeterScoring - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0){
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.perimeterScoring = inputValue
                    }
                }
                
            } else if(statType == "insideScoring"){
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.insideScoring || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.insideScoring - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0){
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.insideScoring = inputValue
                    }
                }
                
            } else if(statType == "playMaking"){
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.playMaking || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.playMaking - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0){
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.playMaking = inputValue
                    }
                }
            }          
                
            playerSetter(newPlayerStats)
        }
    }

  return (
    <div className={`player-${player.position}-customization-container player-customization-container`}>
        <div className="player-header">
            <div className='name-input-container'>
                <label htmlFor='name'>Player name: </label>
                <input type="text" name='name' placeholder='Player full name' className="name-input" value={player.name} onChange={nameOnkeydownHandler}/>
            </div>
            <div className="position-input-container">
                <label htmlFor='position'>Player position: </label>
                <input type="text" className="position-input" value={playerPositionDetection(player.position)} disabled/>
            </div>
        </div>

        <div className="player-stats">
            {
                arrayOfKeysOfNumericProperties.map((stat, i) => {
                    return (
                        <div key={`${stat}${i}`} className={`${stat}-input-container create-player-stat-input`}>
                            <label htmlFor={`${stat}`}>{`${firstLetterToUpper(separateCamelCaseBySpace(stat))}: `}</label>
                            <input
                                type="range"
                                name={`${stat}`}
                                id={`${stat}-input`}
                                value={getValue(stat, player)}
                                min={getMinStatPerPosition(stat, player.position)}
                                max={getMaxStatPerPosition(stat, player.position)}
                                onChange={inputOnChangeHandler(stat)}
                            />
                        </div>
                    )
                })
            }
        </div>

    </div>
  )
}

export default CreatePlayer