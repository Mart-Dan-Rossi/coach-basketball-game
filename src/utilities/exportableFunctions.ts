import { PlayerEditableInfo, PlayerStats } from "../entities/myInterfaces"
import { Player } from "../entities/players"

export function getMinStatPerPosition(thisStat: string, playerPosition: string) {
    if(thisStat == "height") {
        if(playerPosition == "1") {
            return (165)
        } else if(playerPosition == "2") {
            return (170)
        } else if(playerPosition == "3") {
            return (175)
        } else if(playerPosition == "4") {
            return (190)
        } else {
            return (205)
        }
    } else if(thisStat == "weight") {
        if(playerPosition == "1") {
            return (60)
        } else if(playerPosition == "2") {
            return (65)
        } else if(playerPosition == "3") {
            return (70)
        } else if(playerPosition == "4") {
            return (80)
        } else {
            return (90)
        }
    } else if(thisStat == "atleticism") {
        if(playerPosition == "1") {
            return (60)
        } else if(playerPosition == "2") {
            return (40)
        } else if(playerPosition == "3") {
            return (40)
        } else if(playerPosition == "4") {
            return (30)
        } else {
            return (15)
        }
    } else if(thisStat == "perimeterDefence") {
        if(playerPosition == "1") {
            return (50)
        } else if(playerPosition == "2") {
            return (45)
        } else if(playerPosition == "3") {
            return (40)
        } else if(playerPosition == "4") {
            return (20)
        } else {
            return (5)
        }
    } else if(thisStat == "insideDefence") {
        if(playerPosition == "1") {
            return (10)
        } else if(playerPosition == "2") {
            return (15)
        } else if(playerPosition == "3") {
            return (30)
        } else if(playerPosition == "4") {
            return (40)
        } else {
            return (60)
        }
    } else if(thisStat == "rebounding") {
        if(playerPosition == "1") {
            return (10)
        } else if(playerPosition == "2") {
            return (15)
        } else if(playerPosition == "3") {
            return (30)
        } else if(playerPosition == "4") {
            return (50)
        } else {
            return (60)
        }
    } else if(thisStat == "perimeterScoring") {
        if(playerPosition == "1") {
            return (50)
        } else if(playerPosition == "2") {
            return (50)
        } else if(playerPosition == "3") {
            return (30)
        } else if(playerPosition == "4") {
            return (10)
        } else {
            return (5)
        }
    } else if(thisStat == "insideScoring") {
        if(playerPosition == "1") {
            return (30)
        } else if(playerPosition == "2") {
            return (30)
        } else if(playerPosition == "3") {
            return (40)
        } else if(playerPosition == "4") {
            return (60)
        } else {
            return (65)
        }
    } else if(thisStat == "playMaking") {
        if(playerPosition == "1") {
            return (40)
        } else if(playerPosition == "2") {
            return (40)
        } else if(playerPosition == "3") {
            return (10)
        } else if(playerPosition == "4") {
            return (5)
        } else {
            return (1)
        }
    } else {
        return(0)
    }
}

export function getMaxStatPerPosition(thisStat: string, playerPosition: string) {
    if(thisStat == "height") {
        if(playerPosition == "1") {
            return (200)
        } else if(playerPosition == "2") {
            return (206)
        } else if(playerPosition == "3") {
            return (213)
        } else if(playerPosition == "4") {
            return (229)
        } else {
            return (231)
        }
    } else if(thisStat == "weight") {
        if(playerPosition == "1") {
            return (100)
        } else if(playerPosition == "2") {
            return (108)
        } else if(playerPosition == "3") {
            return (113)
        } else if(playerPosition == "4") {
            return (120)
        } else {
            return (127)
        }
    } else if(thisStat == "atleticism") {
        if(playerPosition == "1") {
            return (100)
        } else if(playerPosition == "2") {
            return (100)
        } else if(playerPosition == "3") {
            return (80)
        } else if(playerPosition == "4") {
            return (60)
        } else {
            return (50)
        }
    } else if(thisStat == "perimeterDefence") {
        if(playerPosition == "1") {
            return (100)
        } else if(playerPosition == "2") {
            return (95)
        } else if(playerPosition == "3") {
            return (90)
        } else if(playerPosition == "4") {
            return (70)
        } else {
            return (30)
        }
    } else if(thisStat == "insideDefence") {
        if(playerPosition == "1") {
            return (30)
        } else if(playerPosition == "2") {
            return (70)
        } else if(playerPosition == "3") {
            return (90)
        } else if(playerPosition == "4") {
            return (95)
        } else {
            return (100)
        }
    } else if(thisStat == "rebounding") {
        if(playerPosition == "1") {
            return (30)
        } else if(playerPosition == "2") {
            return (40)
        } else if(playerPosition == "3") {
            return (70)
        } else if(playerPosition == "4") {
            return (90)
        } else {
            return (100)
        }
    } else if(thisStat == "perimeterScoring") {
        if(playerPosition == "1") {
            return (100)
        } else if(playerPosition == "2") {
            return (100)
        } else if(playerPosition == "3") {
            return (90)
        } else if(playerPosition == "4") {
            return (80)
        } else {
            return (70)
        }
    } else if(thisStat == "insideScoring") {
        if(playerPosition == "1") {
            return (80)
        } else if(playerPosition == "2") {
            return (80)
        } else if(playerPosition == "3") {
            return (95)
        } else if(playerPosition == "4") {
            return (95)
        } else {
            return (100)
        }
    } else if(thisStat == "playMaking") {
        if(playerPosition == "1") {
            return (100)
        } else if(playerPosition == "2") {
            return (100)
        } else if(playerPosition == "3") {
            return (70)
        } else if(playerPosition == "4") {
            return (60)
        } else {
            return (60)
        }
    } else {
        return(0)
    }
}

export function getValue(key: string, player: PlayerEditableInfo) {
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
    if(playerPosition == "1") {
        return "G"
    } else if(playerPosition == "2") {
        return "SG"
    } else if(playerPosition == "3") {
        return "SF"
    } else if(playerPosition == "4") {
        return "PF"
    } else if(playerPosition == "5") {
        return "C"
    } else {
        return "Not detected"
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

export function calculatePlayerOverallRating(pointsUsedOnPlayer: number) {
    let overallRating : number
    //50 is the min overall rating
    overallRating = 50 + ((pointsUsedOnPlayer / 9))/2

    return numberEntire(overallRating).toString()
}

export function setPointsUsedOnThisSkill(statType: string, previousStats: PlayerStats, setter: React.Dispatch<React.SetStateAction<PlayerStats>>, pointsUsedOnThisSkill: number) {
    let previousStatsCopy = previousStats
    if(statType == "height") {
        previousStatsCopy.height = pointsUsedOnThisSkill
        setter(previousStatsCopy)

    } else if(statType == "weight") {
        previousStatsCopy.weight = pointsUsedOnThisSkill
        setter(previousStatsCopy)

    } else if(statType == "atleticism") {
        previousStatsCopy.atleticism = pointsUsedOnThisSkill
        setter(previousStatsCopy)

    } else if(statType == "perimeterDefence") {
        previousStatsCopy.perDef = pointsUsedOnThisSkill
        setter(previousStatsCopy)

    } else if(statType == "insideDefence") {
        previousStatsCopy.insDef = pointsUsedOnThisSkill
        setter(previousStatsCopy)

    } else if(statType == "rebounding") {
        previousStatsCopy.reb = pointsUsedOnThisSkill
        setter(previousStatsCopy)

    } else if(statType == "perimeterScoring") {
        previousStatsCopy.perScor = pointsUsedOnThisSkill
        setter(previousStatsCopy)

    } else if(statType == "insideScoring") {
        previousStatsCopy.insScor = pointsUsedOnThisSkill
        setter(previousStatsCopy)

    } else if(statType == "playMaking") {
        previousStatsCopy.plmkn = pointsUsedOnThisSkill
        setter(previousStatsCopy)
    }
}

export function roll20SidesDice() {
    return Math.random() * (21-1)+1;
}

export function compareIniciatives(playerA: Player, playerB: Player, isTeamAAtacking: boolean) {
    let defender = isTeamAAtacking ? playerB : playerA
    let atacker = isTeamAAtacking ? playerA : playerB

    let defenderIniciative = 0;
    let atackerInisiative = 0;
    
    let compareIniciatives = 0;
    
    function calculationIfDefensorIsCloseToTheRim() {
        defenderIniciative = roll20SidesDice() * 2 + ((defender.height - 165)/0.65) + ((defender.weight - 65)/0.55) + defender.atleticism * 1.2 + defender.insideDefence * 2;
    }

    function calculationIfDefenderIsInShortRange() {
        defenderIniciative = roll20SidesDice() * 2 + ((defender.height - 165)/0.65) * 0.75 + ((defender.weight - 65)/0.55) * 0.75 + defender.atleticism * 1.2 + defender.insideDefence * 2 * 0.75 + defender.perimetrerDefence * 2 * 0.25;
    }

    function calculationIfDefenderIsInMidRange() {
        defenderIniciative = roll20SidesDice() * 2 + ((defender.height - 165)/0.65) * 0.25 + ((defender.weight - 65)/0.55) * 0.25 + defender.atleticism * 1.2 + defender.insideDefence * 2 * 0.25 + defender.perimetrerDefence * 2 * 0.75;
    }

    function calculationIfDefenderIsOutsideThe3PointLine() {
        defenderIniciative = roll20SidesDice() * 2 + defender.atleticism * 1.2 + defender.perimetrerDefence * 2 * 2;
    }

    function calculationIfAtackerIsCloseToTheRim() {
        atackerInisiative = roll20SidesDice() * 2 + ((atacker.height - 165)/0.65) + ((atacker.weight - 65)/0.55) + atacker.atleticism * 1.2 + atacker.insideScoring + atacker.playMaking;
    }

    function calculationIfAtackerIsInShortRange() {
        atackerInisiative = roll20SidesDice() * 2 + ((atacker.height - 165)/0.65) * 0.75 + ((atacker.weight - 65)/0.55) * 0.75 + atacker.atleticism * 1.2 + atacker.insideScoring * 0.75 + atacker.perimetrerScoring * 0.25 + atacker.playMaking;
    }

    function calculationIfAtackerIsInMidRange() {
        atackerInisiative = roll20SidesDice() * 2 + ((atacker.height - 165)/0.65) * 0.25 + ((atacker.weight - 65)/0.55) * 0.25 + atacker.atleticism * 1.2 + atacker.insideScoring * 0.25 + atacker.perimetrerScoring * 0.75 + atacker.playMaking;
    }

    function calculationIfAtackerIsOutsideThe3PointLine() {
        atackerInisiative = roll20SidesDice() * 2 + atacker.atleticism * 1.2 + atacker.perimetrerScoring * 2 * 2 + atacker.playMaking;
    }

    while (compareIniciatives ==  0) {
        //If teah A is defending
        if (!isTeamAAtacking) {
            
            //If the player is close to the rim
            if ((defender.ubicationX! < 3) && (defender.ubicationY! > 5) && (defender.ubicationY! < 11) || (defender.ubicationX! < 5) && (defender.ubicationY! > 6) && (defender.ubicationY! < 10)) {
                calculationIfDefensorIsCloseToTheRim();
            }
            //If the player is in short range
            else if ((defender.ubicationX! < 4) && (defender.ubicationY! == 5) || (defender.ubicationX! < 6) && (defender.ubicationX! > 2) && (defender.ubicationY! == 6) || (defender.ubicationX! == 5) && (defender.ubicationY! > 6) && (defender.ubicationY! < 10) || (defender.ubicationX! < 6) && (defender.ubicationX! > 2) && (defender.ubicationY! == 10) || (defender.ubicationX! < 4) && (defender.ubicationY! == 11)) {
                calculationIfDefenderIsInShortRange();
            }
            //If the player is in mid range
            else if ((defender.ubicationX! < 2) && (defender.ubicationY! == 3) || (defender.ubicationX! < 5) && (defender.ubicationY! == 4) || (defender.ubicationX! < 6) && (defender.ubicationX! > 3) && (defender.ubicationY! == 5) || (defender.ubicationX! == 6) && (defender.ubicationY! > 5) && (defender.ubicationY! < 11) || (defender.ubicationX! < 6) && (defender.ubicationX! > 3) && (defender.ubicationY! == 11) || (defender.ubicationX! < 5) && (defender.ubicationY! == 12) || (defender.ubicationX! == 1) && (defender.ubicationY! == 13)) {
                calculationIfDefenderIsInMidRange();
            }
            //If he is outside 3 point range
            else if ((defender.ubicationY! == 1) || (defender.ubicationY! == 2) || (defender.ubicationY! == 14) || (defender.ubicationY! == 15) || (defender.ubicationX! > 1) && (defender.ubicationY! == 3) || (defender.ubicationX! > 4) && (defender.ubicationY! == 4) || (defender.ubicationX! > 5) && (defender.ubicationY! == 5) || (defender.ubicationX! > 6) && (defender.ubicationY! > 5) && (defender.ubicationY! < 11) || (defender.ubicationX! > 5) && (defender.ubicationY! == 11) || (defender.ubicationX! > 4) && (defender.ubicationY! == 12) || (defender.ubicationX! > 1) && (defender.ubicationY! == 13)) {
                calculationIfDefenderIsOutsideThe3PointLine();
            }
        
            //If the player is close to the rim
            if ((atacker.ubicationX! < 3) && (atacker.ubicationY! > 5) && (atacker.ubicationY! < 11) || (atacker.ubicationX! < 5) && (atacker.ubicationY! > 6) && (atacker.ubicationY! < 10)) {
                calculationIfAtackerIsCloseToTheRim();
            }
            //If the player is in short range
            else if ((atacker.ubicationX! < 4) && (atacker.ubicationY! == 5) || (atacker.ubicationX! < 6) && (atacker.ubicationX! > 2) && (atacker.ubicationY! == 6) || (atacker.ubicationX! == 5) && (atacker.ubicationY! > 6) && (atacker.ubicationY! < 10) || (atacker.ubicationX! < 6) && (atacker.ubicationX! > 2) && (atacker.ubicationY! == 10) || (atacker.ubicationX! < 4) && (atacker.ubicationY! == 11)) {
                calculationIfAtackerIsInShortRange();
            }
            //If the player is in mid range
            else if ((atacker.ubicationX! < 2) && (atacker.ubicationY! == 3) || (atacker.ubicationX! < 5) && (atacker.ubicationY! == 4) || (atacker.ubicationX! < 6) && (atacker.ubicationX! > 3) && (atacker.ubicationY! == 5) || (atacker.ubicationX! == 6) && (atacker.ubicationY! > 5) && (atacker.ubicationY! < 11) || (atacker.ubicationX! < 6) && (atacker.ubicationX! > 3) && (atacker.ubicationY! == 11) || (atacker.ubicationX! < 5) && (atacker.ubicationY! == 12) || (atacker.ubicationX! == 1) && (atacker.ubicationY! == 13)) {
                calculationIfAtackerIsInMidRange();
            }
            //If he is outside 3 point range
            else if ((atacker.ubicationY! == 1) || (atacker.ubicationY! == 2) || (atacker.ubicationY! == 14) || (atacker.ubicationY! == 15) || (atacker.ubicationX! > 1) && (atacker.ubicationY! == 3) || (atacker.ubicationX! > 4) && (atacker.ubicationY! == 4) || (atacker.ubicationX! > 5) && (atacker.ubicationY! == 5) || (atacker.ubicationX! > 6) && (atacker.ubicationY! > 5) && (atacker.ubicationY! < 11) || (atacker.ubicationX! > 5) && (atacker.ubicationY! == 11) || (atacker.ubicationX! > 4) && (atacker.ubicationY! == 12) || (atacker.ubicationX! > 1) && (atacker.ubicationY! == 13)) {
                calculationIfAtackerIsOutsideThe3PointLine();
            }

            //If teah B is defending
        } else if (isTeamAAtacking) {


            //If the player is close to the rim
            if ((defender.ubicationX! > 26) && (defender.ubicationY! > 5) && (defender.ubicationY! < 11) || (defender.ubicationX! > 24) && (defender.ubicationY! > 6) && (defender.ubicationY! < 10)) {
                calculationIfDefensorIsCloseToTheRim();
            }
            //If the player is in short range
            else if ((defender.ubicationX! > 24) && (defender.ubicationY! == 5) || (defender.ubicationX! > 22) && (defender.ubicationX! < 27) && (defender.ubicationY! == 6) || (defender.ubicationX! == 24) && (defender.ubicationY! > 6) && (defender.ubicationY! < 10) || (defender.ubicationX! > 22) && (defender.ubicationX! < 27) && (defender.ubicationY! == 10) || (defender.ubicationX! > 25) && (defender.ubicationY! == 11)) {
                calculationIfAtackerIsInShortRange();
            }
            //If the player is in mid range
            else if ((defender.ubicationX! > 27) && (defender.ubicationY! == 3) || (defender.ubicationX! > 24) && (defender.ubicationY! == 4) || (defender.ubicationX! > 23) && (defender.ubicationX! < 26) && (defender.ubicationY! == 5) || (defender.ubicationX! == 23) && (defender.ubicationY! > 5) && (defender.ubicationY! < 11) || (defender.ubicationX! > 23) && (defender.ubicationX! < 26) && (defender.ubicationY! == 11) || (defender.ubicationX! > 24) && (defender.ubicationY! == 12) || (defender.ubicationX! == 28) && (defender.ubicationY! == 13)) {
                calculationIfAtackerIsInMidRange();
            }
            //If he is outside 3 point range
            else if ((defender.ubicationY! == 1) || (defender.ubicationY! == 2) || (defender.ubicationY! == 14) || (defender.ubicationY! == 15) || (defender.ubicationX! < 28) && (defender.ubicationY! == 3) || (defender.ubicationX! < 25) && (defender.ubicationY! == 4) || (defender.ubicationX! < 24) && (defender.ubicationY! == 5) || (defender.ubicationX! < 23) && (defender.ubicationY! > 5) && (defender.ubicationY! < 11) || (defender.ubicationX! < 24) && (defender.ubicationY! == 11) || (defender.ubicationX! < 25) && (defender.ubicationY! == 12) || (defender.ubicationX! < 28) && (defender.ubicationY! == 13)) {
                calculationIfDefenderIsOutsideThe3PointLine();
            }
        
            //If the player is close to the rim
            if ((atacker.ubicationX! > 26) && (atacker.ubicationY! > 5) && (atacker.ubicationY! < 11) || (atacker.ubicationX! > 24) && (atacker.ubicationY! > 6) && (atacker.ubicationY! < 10)) {
                calculationIfAtackerIsCloseToTheRim();
            }
            //If the player is in short range
            else if ((atacker.ubicationX! > 24) && (atacker.ubicationY! == 5) || (atacker.ubicationX! > 22) && (atacker.ubicationX! < 27) && (atacker.ubicationY! == 6) || (atacker.ubicationX! == 24) && (atacker.ubicationY! > 6) && (atacker.ubicationY! < 10) || (atacker.ubicationX! > 22) && (atacker.ubicationX! < 27) && (atacker.ubicationY! == 10) || (atacker.ubicationX! > 25) && (atacker.ubicationY! == 11)) {
                calculationIfAtackerIsInShortRange();
            }
            //If the player is in mid range
            else if ((atacker.ubicationX! > 27) && (atacker.ubicationY! == 3) || (atacker.ubicationX! > 24) && (atacker.ubicationY! == 4) || (atacker.ubicationX! > 23) && (atacker.ubicationX! < 26) && (atacker.ubicationY! == 5) || (atacker.ubicationX! == 23) && (atacker.ubicationY! > 5) && (atacker.ubicationY! < 11) || (atacker.ubicationX! > 23) && (atacker.ubicationX! < 26) && (atacker.ubicationY! == 11) || (atacker.ubicationX! > 24) && (atacker.ubicationY! == 12) || (atacker.ubicationX! == 28) && (atacker.ubicationY! == 13)) {
                calculationIfAtackerIsInMidRange();
            }
            //If he is outside 3 point range
            else if ((atacker.ubicationY! == 1) || (atacker.ubicationY! == 2) || (atacker.ubicationY! == 14) || (atacker.ubicationY! == 15) || (atacker.ubicationX! < 28) && (atacker.ubicationY! == 3) || (atacker.ubicationX! < 25) && (atacker.ubicationY! == 4) || (atacker.ubicationX! < 24) && (atacker.ubicationY! == 5) || (atacker.ubicationX! < 23) && (atacker.ubicationY! > 5) && (atacker.ubicationY! < 11) || (atacker.ubicationX! < 24) && (atacker.ubicationY! == 11) || (atacker.ubicationX! < 25) && (atacker.ubicationY! == 12) || (atacker.ubicationX! < 28) && (atacker.ubicationY! == 13)) {
                calculationIfAtackerIsOutsideThe3PointLine();
            }
        }
    
        //Comparo las iniciativas
        compareIniciatives = defenderIniciative - atackerInisiative;
    }
    if(compareIniciatives > 0) {
        return defender
    } else {
        return atacker
    }
}