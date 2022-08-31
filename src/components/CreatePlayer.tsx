import React, { Key } from 'react'

interface Props {
    player: {
        name: string,
        position: string,
        height: number,
        weight: number,
        atleticism: number,
        perimeterDefence: number,
        insideDefence: number,
        rebounding: number,
        perimeterScoring: number,
        insideScoring: number,
        playMaking: number
    },
    playerSetter: React.Dispatch<React.SetStateAction<{
        name: string,
        position: string,
        height: number,
        weight: number,
        atleticism: number,
        perimeterDefence: number,
        insideDefence: number,
        rebounding: number,
        perimeterScoring: number,
        insideScoring: number,
        playMaking: number
    }>>
}

function CreatePlayer( { player, playerSetter } : Props ) {


    const nameOnkeydownHandler = (e :  React.ChangeEvent<HTMLInputElement>) => {
        let inputModified = e.target as HTMLInputElement
        let inputValue = inputModified.value as string

        let newPlayerStats = {...player}
        newPlayerStats.name = inputValue
        
        playerSetter(newPlayerStats)
    }

    const playerPositionDetection = (playerPosition : string)=> {
        if(playerPosition == "1"){
            return "G"
        } else if(playerPosition == "2"){
            return "SG"
        } else if(playerPosition == "3") {
            return "SF"
        } else if(playerPosition == "4") {
            return "PF"
        } else if(playerPosition == "5") {
            return "C"
        }
    }

    const inputOnChangeHandler = (statType: String)=> {
        return (e: React.ChangeEvent<HTMLInputElement>)=> {
            let inputModified = e.target as HTMLInputElement
            let inputValue = inputModified.value as String

            let newPlayerStats = {...player}
            if(statType == "height"){
                newPlayerStats.height = Number(inputValue)

            } else if(statType == "weight"){
                newPlayerStats.weight = Number(inputValue)
                
            } else if(statType == "atleticism"){
                newPlayerStats.atleticism = Number(inputValue)

            } else if(statType == "perimeterDefence"){
                newPlayerStats.perimeterDefence = Number(inputValue)

            } else if(statType == "insideDefence"){
                newPlayerStats.insideDefence = Number(inputValue)

            } else if(statType == "rebounding"){
                newPlayerStats.rebounding = Number(inputValue)

            } else if(statType == "perimeterScoring"){
                newPlayerStats.perimeterScoring = Number(inputValue)

            } else if(statType == "insideScoring"){
                newPlayerStats.insideScoring = Number(inputValue)

            } else if(statType == "playMaking"){
                newPlayerStats.playMaking = Number(inputValue)
            }

            
            playerSetter(newPlayerStats)
        }
    }

    const getValue = (key: string)=> {
        if(key == "height") {
            return player.height

        } else if(key == "weigth") {
            return player.weight
            
        } else if(key == "atleticism") {
            return player.atleticism

        } else if(key == "perimeterDefence") {
            return player.perimeterDefence

        } else if(key == "insideDefence") {
            return player.insideDefence

        } else if(key == "rebounding") {
            return player.rebounding

        } else if(key == "perimeterScoring") {
            return player.perimeterScoring

        } else if(key == "insideScoring") {
            return player.insideScoring

        } else if(key == "playMaking") {
            return player.playMaking
        } 
        
    }
    
    let arrayOfKeysOfNumericProperties = [] as string[]
    for(let key in player) {
        if(key != "name" && key != "position") {
            arrayOfKeysOfNumericProperties.push(key)
        }
    }

  return (
    <div className={`player-${player.position}-customization-container player-customization-container`}>
        <div className="player-header">
            <div className='name-input-container'>
                <input type="text" placeholder='Player full name' className="name-input" value={player.name} onChange={nameOnkeydownHandler}/>
            </div>
            <div className="position-input-container">
                <input type="text" className="position-input" value={playerPositionDetection(player.position)} disabled/>
            </div>
        </div>

        <div className="player-stats">
            {
                arrayOfKeysOfNumericProperties.map((key, i) => {
                    return (
                        <div key={`${key}${i}`} className={`${key}-input-container`}>
                            <label htmlFor={`${key}`}>{`${key}: `}</label>
                            <input type="range" name={`${key}`} id={`${key}-input`} value={getValue(key)} onChange={inputOnChangeHandler(key)}/>
                        </div>
                    )
                })
            }
        </div>

    </div>
  )
}

export default CreatePlayer