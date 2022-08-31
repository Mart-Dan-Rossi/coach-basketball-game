import { PlayerStat } from "../entities/myInterfaces"
import { Player } from "../entities/players"
import React from 'react';

export function getMinStatPerPosition(thisStat: string, playerPosition: string){
    if(thisStat == "height") {
        if(playerPosition == "1"){
            return (165)
        } else if(playerPosition == "2"){
            return (170)
        } else if(playerPosition == "3"){
            return (175)
        } else if(playerPosition == "4"){
            return (190)
        } else {
            return (205)
        }
    } else if(thisStat == "weight") {
        if(playerPosition == "1"){
            return (60)
        } else if(playerPosition == "2"){
            return (65)
        } else if(playerPosition == "3"){
            return (70)
        } else if(playerPosition == "4"){
            return (80)
        } else {
            return (90)
        }
    } else if(thisStat == "atleticism") {
        if(playerPosition == "1"){
            return (60)
        } else if(playerPosition == "2"){
            return (40)
        } else if(playerPosition == "3"){
            return (40)
        } else if(playerPosition == "4"){
            return (30)
        } else {
            return (15)
        }
    } else if(thisStat == "perimeterDefence") {
        if(playerPosition == "1"){
            return (50)
        } else if(playerPosition == "2"){
            return (45)
        } else if(playerPosition == "3"){
            return (40)
        } else if(playerPosition == "4"){
            return (20)
        } else {
            return (5)
        }
    } else if(thisStat == "insideDefence") {
        if(playerPosition == "1"){
            return (10)
        } else if(playerPosition == "2"){
            return (15)
        } else if(playerPosition == "3"){
            return (30)
        } else if(playerPosition == "4"){
            return (40)
        } else {
            return (60)
        }
    } else if(thisStat == "rebounding") {
        if(playerPosition == "1"){
            return (10)
        } else if(playerPosition == "2"){
            return (15)
        } else if(playerPosition == "3"){
            return (30)
        } else if(playerPosition == "4"){
            return (50)
        } else {
            return (60)
        }
    } else if(thisStat == "perimeterScoring") {
        if(playerPosition == "1"){
            return (50)
        } else if(playerPosition == "2"){
            return (50)
        } else if(playerPosition == "3"){
            return (30)
        } else if(playerPosition == "4"){
            return (10)
        } else {
            return (5)
        }
    } else if(thisStat == "insideScoring") {
        if(playerPosition == "1"){
            return (30)
        } else if(playerPosition == "2"){
            return (30)
        } else if(playerPosition == "3"){
            return (40)
        } else if(playerPosition == "4"){
            return (60)
        } else {
            return (65)
        }
    } else if(thisStat == "playMaking") {
        if(playerPosition == "1"){
            return (40)
        } else if(playerPosition == "2"){
            return (40)
        } else if(playerPosition == "3"){
            return (10)
        } else if(playerPosition == "4"){
            return (5)
        } else {
            return (1)
        }
    } else {
        return(0)
    }
}

export function getMaxStatPerPosition(thisStat: string, playerPosition: string){
    if(thisStat == "height") {
        if(playerPosition == "1"){
            return (200)
        } else if(playerPosition == "2"){
            return (206)
        } else if(playerPosition == "3"){
            return (213)
        } else if(playerPosition == "4"){
            return (229)
        } else {
            return (231)
        }
    } else if(thisStat == "weight") {
        if(playerPosition == "1"){
            return (100)
        } else if(playerPosition == "2"){
            return (108)
        } else if(playerPosition == "3"){
            return (113)
        } else if(playerPosition == "4"){
            return (120)
        } else {
            return (127)
        }
    } else if(thisStat == "atleticism") {
        if(playerPosition == "1"){
            return (100)
        } else if(playerPosition == "2"){
            return (100)
        } else if(playerPosition == "3"){
            return (80)
        } else if(playerPosition == "4"){
            return (60)
        } else {
            return (50)
        }
    } else if(thisStat == "perimeterDefence") {
        if(playerPosition == "1"){
            return (100)
        } else if(playerPosition == "2"){
            return (95)
        } else if(playerPosition == "3"){
            return (90)
        } else if(playerPosition == "4"){
            return (70)
        } else {
            return (30)
        }
    } else if(thisStat == "insideDefence") {
        if(playerPosition == "1"){
            return (30)
        } else if(playerPosition == "2"){
            return (70)
        } else if(playerPosition == "3"){
            return (90)
        } else if(playerPosition == "4"){
            return (95)
        } else {
            return (100)
        }
    } else if(thisStat == "rebounding") {
        if(playerPosition == "1"){
            return (30)
        } else if(playerPosition == "2"){
            return (40)
        } else if(playerPosition == "3"){
            return (70)
        } else if(playerPosition == "4"){
            return (90)
        } else {
            return (100)
        }
    } else if(thisStat == "perimeterScoring") {
        if(playerPosition == "1"){
            return (100)
        } else if(playerPosition == "2"){
            return (100)
        } else if(playerPosition == "3"){
            return (90)
        } else if(playerPosition == "4"){
            return (80)
        } else {
            return (70)
        }
    } else if(thisStat == "insideScoring") {
        if(playerPosition == "1"){
            return (80)
        } else if(playerPosition == "2"){
            return (80)
        } else if(playerPosition == "3"){
            return (95)
        } else if(playerPosition == "4"){
            return (95)
        } else {
            return (100)
        }
    } else if(thisStat == "playMaking") {
        if(playerPosition == "1"){
            return (100)
        } else if(playerPosition == "2"){
            return (100)
        } else if(playerPosition == "3"){
            return (70)
        } else if(playerPosition == "4"){
            return (60)
        } else {
            return (60)
        }
    } else {
        return(0)
    }
}

export function getValue(key: string, player: PlayerStat) {
    if(key == "height") {
        return player.height

    } else if(key == "weight") {
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

export function playerPositionDetection(playerPosition : string) {
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

export function firstLetterToUpper(string: string) {
    const capitalized = string.charAt(0).toUpperCase() + string.slice(1);

    return capitalized;
}

export function separateCamelCaseBySpace(string: string) {    
    let separatedText = ""

    for(let letter of string) {
        if(letter.toUpperCase() === letter) {
            separatedText += ` ${letter.toLocaleLowerCase()}`
        } else {
            separatedText += letter
        }
    }

    return separatedText
}

export function numberEntire(number: number) {
    let numberInString = number.toString()
    let entireNumberInString = ""
    let entireNumber: number

    for(let character of numberInString) {
        if(character != ".") {
            entireNumberInString += character
        } else {
            break
        }
    }

    entireNumber = Number(entireNumberInString)
    
    return entireNumber
}