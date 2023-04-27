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
        if(statType == "height") {
            return pointsUsedInStats.height

        } else if(statType == "weight") {
            return pointsUsedInStats.weight

        } else if(statType == "atleticism") {
            return pointsUsedInStats.atleticism

        } else if(statType == "perimeterDefence") {
            return pointsUsedInStats.perDef

        } else if(statType == "insideDefence") {
            return pointsUsedInStats.insDef

        } else if(statType == "rebounding") {
            return pointsUsedInStats.reb

        } else if(statType == "perimeterScoring") {
            return pointsUsedInStats.perScor

        } else if(statType == "insideScoring") {
            return pointsUsedInStats.insScor

        } else if(statType == "playMaking") {
            return pointsUsedInStats.plmkn

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

            
            if(statType == "height") {
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.height || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.height - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0) {
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.height = inputValue
                        let pointsUsedOnThisSkillOld = pointsUsedInStats.height
                        let pointsUsedOnThisSkill = ((inputValue - minStatValue) * 100) / statRange
                        setPointsUsedOnThisSkill(statType, pointsUsedInStats, setPointsUsedInStats, pointsUsedOnThisSkill)
                        setPointsUsedInPlayer(pointsUsedInPlayer + pointsUsedOnThisSkill - pointsUsedOnThisSkillOld)
                    }
                }
                
            } else if(statType == "weight") {
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.weight || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.weight - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0) {
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.weight = inputValue
                        let pointsUsedOnThisSkillOld = pointsUsedInStats.weight
                        let pointsUsedOnThisSkill = ((inputValue - minStatValue) * 100) / statRange
                        setPointsUsedOnThisSkill(statType, pointsUsedInStats, setPointsUsedInStats, pointsUsedOnThisSkill)
                        setPointsUsedInPlayer(pointsUsedInPlayer + pointsUsedOnThisSkill - pointsUsedOnThisSkillOld)
                    }
                }
                
            } else if(statType == "atleticism") {
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.atleticism || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.atleticism - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0) {
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.atleticism = inputValue
                        let pointsUsedOnThisSkillOld = pointsUsedInStats.atleticism
                        let pointsUsedOnThisSkill = ((inputValue - minStatValue) * 100) / statRange
                        setPointsUsedOnThisSkill(statType, pointsUsedInStats, setPointsUsedInStats, pointsUsedOnThisSkill)
                        setPointsUsedInPlayer(pointsUsedInPlayer + pointsUsedOnThisSkill - pointsUsedOnThisSkillOld)
                    }
                }
                
            } else if(statType == "perimeterDefence") {
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.perimeterDefence || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.perimeterDefence - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0) {
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.perimeterDefence = inputValue
                        let pointsUsedOnThisSkillOld = pointsUsedInStats.perDef
                        let pointsUsedOnThisSkill = ((inputValue - minStatValue) * 100) / statRange
                        setPointsUsedOnThisSkill(statType, pointsUsedInStats, setPointsUsedInStats, pointsUsedOnThisSkill)
                        setPointsUsedInPlayer(pointsUsedInPlayer + pointsUsedOnThisSkill - pointsUsedOnThisSkillOld)
                    }
                }
                
            } else if(statType == "insideDefence") {
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.insideDefence || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.insideDefence - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0) {
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.insideDefence = inputValue
                        let pointsUsedOnThisSkillOld = pointsUsedInStats.insDef
                        let pointsUsedOnThisSkill = ((inputValue - minStatValue) * 100) / statRange
                        setPointsUsedOnThisSkill(statType, pointsUsedInStats, setPointsUsedInStats, pointsUsedOnThisSkill)
                        setPointsUsedInPlayer(pointsUsedInPlayer + pointsUsedOnThisSkill - pointsUsedOnThisSkillOld)
                    }
                }
                
            } else if(statType == "rebounding") {
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.rebounding || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.rebounding - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0) {
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.rebounding = inputValue
                        let pointsUsedOnThisSkillOld = pointsUsedInStats.reb
                        let pointsUsedOnThisSkill = ((inputValue - minStatValue) * 100) / statRange
                        setPointsUsedOnThisSkill(statType, pointsUsedInStats, setPointsUsedInStats, pointsUsedOnThisSkill)
                        setPointsUsedInPlayer(pointsUsedInPlayer + pointsUsedOnThisSkill - pointsUsedOnThisSkillOld)
                    }
                }
                
            } else if(statType == "perimeterScoring") {
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.perimeterScoring || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.perimeterScoring - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0) {
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.perimeterScoring = inputValue
                        let pointsUsedOnThisSkillOld = pointsUsedInStats.perScor
                        let pointsUsedOnThisSkill = ((inputValue - minStatValue) * 100) / statRange
                        setPointsUsedOnThisSkill(statType, pointsUsedInStats, setPointsUsedInStats, pointsUsedOnThisSkill)
                        setPointsUsedInPlayer(pointsUsedInPlayer + pointsUsedOnThisSkill - pointsUsedOnThisSkillOld)
                    }
                }
                
            } else if(statType == "insideScoring") {
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.insideScoring || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.insideScoring - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0) {
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.insideScoring = inputValue
                        let pointsUsedOnThisSkillOld = pointsUsedInStats.insScor
                        let pointsUsedOnThisSkill = ((inputValue - minStatValue) * 100) / statRange
                        setPointsUsedOnThisSkill(statType, pointsUsedInStats, setPointsUsedInStats, pointsUsedOnThisSkill)
                        setPointsUsedInPlayer(pointsUsedInPlayer + pointsUsedOnThisSkill - pointsUsedOnThisSkillOld)
                    }
                }
                
            } else if(statType == "playMaking") {
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.playMaking || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.playMaking - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0) {
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.playMaking = inputValue
                        let pointsUsedOnThisSkillOld = pointsUsedInStats.plmkn
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