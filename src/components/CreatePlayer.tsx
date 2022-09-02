import React, { useState } from 'react'
import { PlayerStat } from '../entities/myInterfaces'
import {getMinStatPerPosition, getMaxStatPerPosition, getValue, playerPositionDetection, firstLetterToUpper, separateCamelCaseBySpace, numberEntire} from '../utilities/exportableFunctions';

interface Props {
    player: PlayerStat,
    playerSetter: React.Dispatch<React.SetStateAction<PlayerStat>>,
    totalTeamPoints: number,
    setTotalTeamPoints: React.Dispatch<React.SetStateAction<number>>
    pointsUsedInPlayer: number,
    setPointsUsedInPlayer: React.Dispatch<React.SetStateAction<number>>
}

function CreatePlayer( { player, playerSetter, totalTeamPoints, setTotalTeamPoints, pointsUsedInPlayer, setPointsUsedInPlayer} : Props ) {

    const [pointsUsedInHeight, setPointsUsedInHeight] = useState(0)
    const [pointsUsedInWeight, setPointsUsedInWeight] = useState(0)
    const [pointsUsedInAtleticism, setPointsUsedInAtleticism] = useState(0)
    const [pointsUsedInPerDef, setPointsUsedInPerDef] = useState(0)
    const [pointsUsedInInsDef, setPointsUsedInInsDef] = useState(0)
    const [pointsUsedInReb, setPointsUsedInReb] = useState(0)
    const [pointsUsedInPerScor, setPointsUsedInPerScor] = useState(0)
    const [pointsUsedInInsScor, setPointsUsedInInsScor] = useState(0)
    const [pointsUsedInPlmkn, setPointsUsedInPlmkn] = useState(0)

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

    function pointsUsedOnThisSkill(statType: string){
        if(statType == "height"){
            return pointsUsedInHeight

        } else if(statType == "weight"){
            return pointsUsedInWeight

        } else if(statType == "atleticism"){
            return pointsUsedInAtleticism

        } else if(statType == "perimeterDefence"){
            return pointsUsedInPerDef

        } else if(statType == "insideDefence"){
            return pointsUsedInInsDef

        } else if(statType == "rebounding"){
            return pointsUsedInReb

        } else if(statType == "perimeterScoring"){
            return pointsUsedInPerScor

        } else if(statType == "insideScoring"){
            return pointsUsedInInsScor

        } else if(statType == "playMaking"){
            return pointsUsedInPlmkn

        } else {
            return 0
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
                        let pointsUsedOnThisSkillOld = pointsUsedInHeight
                        let pointsUsedOnThisSkill = ((inputValue - minStatValue) * 100) / statRange
                        setPointsUsedInHeight(pointsUsedOnThisSkill)
                        setPointsUsedInPlayer(pointsUsedInPlayer + pointsUsedOnThisSkill - pointsUsedOnThisSkillOld)
                    }
                }
                
            } else if(statType == "weight"){
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.weight || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.weight - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0){
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.weight = inputValue
                        let pointsUsedOnThisSkillOld = pointsUsedInWeight
                        let pointsUsedOnThisSkill = ((inputValue - minStatValue) * 100) / statRange
                        setPointsUsedInWeight(pointsUsedOnThisSkill)
                        setPointsUsedInPlayer(pointsUsedInPlayer + pointsUsedOnThisSkill - pointsUsedOnThisSkillOld)
                    }
                }
                
            } else if(statType == "atleticism"){
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.atleticism || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.atleticism - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0){
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.atleticism = inputValue
                        let pointsUsedOnThisSkillOld = pointsUsedInAtleticism
                        let pointsUsedOnThisSkill = ((inputValue - minStatValue) * 100) / statRange
                        setPointsUsedInAtleticism(pointsUsedOnThisSkill)
                        setPointsUsedInPlayer(pointsUsedInPlayer + pointsUsedOnThisSkill - pointsUsedOnThisSkillOld)
                    }
                }
                
            } else if(statType == "perimeterDefence"){
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.perimeterDefence || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.perimeterDefence - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0){
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.perimeterDefence = inputValue
                        let pointsUsedOnThisSkillOld = pointsUsedInPerDef
                        let pointsUsedOnThisSkill = ((inputValue - minStatValue) * 100) / statRange
                        setPointsUsedInPerDef(pointsUsedOnThisSkill)
                        setPointsUsedInPlayer(pointsUsedInPlayer + pointsUsedOnThisSkill - pointsUsedOnThisSkillOld)
                    }
                }
                
            } else if(statType == "insideDefence"){
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.insideDefence || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.insideDefence - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0){
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.insideDefence = inputValue
                        let pointsUsedOnThisSkillOld = pointsUsedInInsDef
                        let pointsUsedOnThisSkill = ((inputValue - minStatValue) * 100) / statRange
                        setPointsUsedInInsDef(pointsUsedOnThisSkill)
                        setPointsUsedInPlayer(pointsUsedInPlayer + pointsUsedOnThisSkill - pointsUsedOnThisSkillOld)
                    }
                }
                
            } else if(statType == "rebounding"){
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.rebounding || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.rebounding - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0){
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.rebounding = inputValue
                        let pointsUsedOnThisSkillOld = pointsUsedInReb
                        let pointsUsedOnThisSkill = ((inputValue - minStatValue) * 100) / statRange
                        setPointsUsedInReb(pointsUsedOnThisSkill)
                        setPointsUsedInPlayer(pointsUsedInPlayer + pointsUsedOnThisSkill - pointsUsedOnThisSkillOld)
                    }
                }
                
            } else if(statType == "perimeterScoring"){
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.perimeterScoring || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.perimeterScoring - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0){
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.perimeterScoring = inputValue
                        let pointsUsedOnThisSkillOld = pointsUsedInPerScor
                        let pointsUsedOnThisSkill = ((inputValue - minStatValue) * 100) / statRange
                        setPointsUsedInPerScor(pointsUsedOnThisSkill)
                        setPointsUsedInPlayer(pointsUsedInPlayer + pointsUsedOnThisSkill - pointsUsedOnThisSkillOld)
                    }
                }
                
            } else if(statType == "insideScoring"){
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.insideScoring || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.insideScoring - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0){
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.insideScoring = inputValue
                        let pointsUsedOnThisSkillOld = pointsUsedInInsScor
                        let pointsUsedOnThisSkill = ((inputValue - minStatValue) * 100) / statRange
                        setPointsUsedInInsScor(pointsUsedOnThisSkill)
                        setPointsUsedInPlayer(pointsUsedInPlayer + pointsUsedOnThisSkill - pointsUsedOnThisSkillOld)
                    }
                }
                
            } else if(statType == "playMaking"){
                if(totalTeamPoints <= 0 && inputValue < newPlayerStats.playMaking || totalTeamPoints > 0) {
                    let teamPointsCost = ((newPlayerStats.playMaking - inputValue) *  100) / statRange
                    if(totalTeamPoints + teamPointsCost >= 0){
                        setTotalTeamPoints(totalTeamPoints + teamPointsCost)
                        newPlayerStats.playMaking = inputValue
                        let pointsUsedOnThisSkillOld = pointsUsedInPlmkn
                        let pointsUsedOnThisSkill = ((inputValue - minStatValue) * 100) / statRange
                        setPointsUsedInPlmkn(pointsUsedOnThisSkill)
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
            <div className='name-input-container'>
                <input type="text" name='name' placeholder='Player full name' className="name-input" value={player.name} onChange={nameOnkeydownHandler}/>
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