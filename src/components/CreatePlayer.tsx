import React, { useState } from 'react'
import { PlayerEditableInfo, PlayerStats } from '../entities/myInterfaces'
import {getMinStatPerPosition, getMaxStatPerPosition, getValue, playerPositionDetection, firstLetterToUpper, separateCamelCaseBySpace, numberEntire, setPointsUsedOnThisSkill} from '../utilities/exportableFunctions';

interface Props {
    team: string,
    playerPosition: string,
    player: PlayerEditableInfo,
    playerSetter: React.Dispatch<React.SetStateAction<PlayerEditableInfo>>,
    totalTeamPoints: number,
    setTotalTeamPoints: React.Dispatch<React.SetStateAction<number>>
    pointsUsedInPlayer: number,
    setPointsUsedInPlayer: React.Dispatch<React.SetStateAction<number>>
    pointsUsedInStats: PlayerStats,
    setPointsUsedInStats: React.Dispatch<React.SetStateAction<PlayerStats>>
}

function CreatePlayer( { team, playerPosition, player, playerSetter, totalTeamPoints, setTotalTeamPoints, pointsUsedInPlayer, setPointsUsedInPlayer, pointsUsedInStats, setPointsUsedInStats} : Props ) {

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

    function pointsUsedOnThisSkill(statType: string) {
        if(
            statType == "height"
            || statType == "weight"
            || statType =="atleticism"
            || statType =="perimeterDefence"
            || statType =="insideDefence"
            || statType =="rebounding"
            || statType =="perimeterScoring"
            || statType =="insideScoring"
            || statType =="playMaking"
        ) {
            return pointsUsedInStats[statType]
        } else {
            return 0
        }
    }

    function inputOnChangeHandler(statType: string) {   
        return (e: React.ChangeEvent<HTMLInputElement>)=> {
            let inputModified = e.target as HTMLInputElement
            let inputValue = Number(inputModified.value) as number
    
            let newPlayerStats = {...player}
        

            let minStatValue = getMinStatPerPosition(statType, player.position)
            let maxStatValue = getMaxStatPerPosition(statType, player.position)
            let statRange = maxStatValue - minStatValue

            
            if(
                statType == "height"
                || statType == "weight"
                || statType =="atleticism"
                || statType =="perimeterDefence"
                || statType =="insideDefence"
                || statType =="rebounding"
                || statType =="perimeterScoring"
                || statType =="insideScoring"
                || statType =="playMaking"
            ) {
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats[statType] || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats[statType] - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0) {
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats[statType] = inputValue
                        let pointsUsedOnThisSkillOld = pointsUsedInStats[statType]
                        let pointsUsedOnThisSkill = ((inputValue - minStatValue) * 100) / statRange
                        setPointsUsedOnThisSkill(statType, pointsUsedInStats, setPointsUsedInStats, pointsUsedOnThisSkill)
                        setPointsUsedInPlayer(pointsUsedInPlayer + pointsUsedOnThisSkill - pointsUsedOnThisSkillOld)
                    }
                }
            }
                
            playerSetter(newPlayerStats)
        }
    }

  return (
    <div className={`player-${player.position}-customization-container player-customization-container`}>
        <div className="player-header">
            <h3>{playerPosition}</h3>
            <div className='name-input-container'>
                <input type="text" name='name' placeholder='Player full name' className="name-input" value={player.name} onChange={nameOnkeydownHandler}/>
            </div>
        </div>

        <div className="player-stats">
            {
                arrayOfKeysOfNumericProperties.map((stat, i) => {
                    return (
                        <div key={`create-player-${stat}-input-${playerPosition}-${team}`} className={`${stat}-input-container create-player-stat-input`}>
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
                            <span className="points-used-on-this-skill">{numberEntire(pointsUsedOnThisSkill(stat))}</span>
                        </div>
                    )
                })
            }
        </div>

    </div>
  )
}

export default CreatePlayer