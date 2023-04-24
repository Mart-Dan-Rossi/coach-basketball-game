import { PlayerEditableInfo, PlayerStats } from "../entities/myInterfaces"
import { Player } from "../entities/players"
import { Match } from '../entities/match';

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

export const ranges = {
    closeToTheRim: {
        id: 0,
        text: "close to the rim"
    },
    behindTheBoard: {
        id: 1,
        text: "behind the board"
    },
    inShortRange: {
        id: 2,
        text: "in short range"
    },
    inMidRange: {
        id: 3,
        text: "in mid range"
    },
    outsideThe3PointLine: {
        id: 4,
        text: "outside the 3 point line"
    },
    long3Range: {
        id: 5,
        text: "long 3 range"
    },
    halfCourt: {
        id: 6,
        text: "half court"
    },
    behindHalfCourt: {
        id: 7,
        text: "behind the half court"
    },
    theOtherRim: {
        id: 8,
        text: "the other rim"
    }
}

export function playerZone(player: Player, teamAAtacking: boolean) {

    //TODO check if zones are written correctly
    if(
        (!teamAAtacking && ((player.ubicationX! < 3) && (player.ubicationY! > 5) && (player.ubicationY! < 11) || (player.ubicationX! < 5) && (player.ubicationY! > 6) && (player.ubicationY! < 10)))
        || (teamAAtacking && ((player.ubicationX! > 26) && (player.ubicationY! > 5) && (player.ubicationY! < 11) || (player.ubicationX! > 24) && (player.ubicationY! > 6) && (player.ubicationY! < 10)))
        ) {
        return ranges.closeToTheRim.id

    } else if(
        !teamAAtacking
        || teamAAtacking) {
        return ranges.behindTheBoard.id

    } else if(
        (!teamAAtacking && (player.ubicationX! < 4) && (player.ubicationY! == 5) || (player.ubicationX! < 6) && (player.ubicationX! > 2) && (player.ubicationY! == 6) || (player.ubicationX! == 5) && (player.ubicationY! > 6) && (player.ubicationY! < 10) || (player.ubicationX! < 6) && (player.ubicationX! > 2) && (player.ubicationY! == 10) || (player.ubicationX! < 4) && (player.ubicationY! == 11))
        || (teamAAtacking && (player.ubicationX! > 24) && (player.ubicationY! == 5) || (player.ubicationX! > 22) && (player.ubicationX! < 27) && (player.ubicationY! == 6) || (player.ubicationX! == 24) && (player.ubicationY! > 6) && (player.ubicationY! < 10) || (player.ubicationX! > 22) && (player.ubicationX! < 27) && (player.ubicationY! == 10) || (player.ubicationX! > 25) && (player.ubicationY! == 11))) {
        return ranges.inShortRange.id

    } else if(
        (!teamAAtacking && (player.ubicationX! < 2) && (player.ubicationY! == 3) || (player.ubicationX! < 5) && (player.ubicationY! == 4) || (player.ubicationX! < 6) && (player.ubicationX! > 3) && (player.ubicationY! == 5) || (player.ubicationX! == 6) && (player.ubicationY! > 5) && (player.ubicationY! < 11) || (player.ubicationX! < 6) && (player.ubicationX! > 3) && (player.ubicationY! == 11) || (player.ubicationX! < 5) && (player.ubicationY! == 12) || (player.ubicationX! == 1) && (player.ubicationY! == 13))
        || teamAAtacking && (player.ubicationX! > 27) && (player.ubicationY! == 3) || (player.ubicationX! > 24) && (player.ubicationY! == 4) || (player.ubicationX! > 23) && (player.ubicationX! < 26) && (player.ubicationY! == 5) || (player.ubicationX! == 23) && (player.ubicationY! > 5) && (player.ubicationY! < 11) || (player.ubicationX! > 23) && (player.ubicationX! < 26) && (player.ubicationY! == 11) || (player.ubicationX! > 24) && (player.ubicationY! == 12) || (player.ubicationX! == 28) && (player.ubicationY! == 13)) {
        return ranges.inMidRange.id

    } else if(
        (!teamAAtacking && (player.ubicationY! == 1) || (player.ubicationY! == 2) || (player.ubicationY! == 14) || (player.ubicationY! == 15) || (player.ubicationX! > 1) && (player.ubicationY! == 3) || (player.ubicationX! > 4) && (player.ubicationY! == 4) || (player.ubicationX! > 5) && (player.ubicationY! == 5) || (player.ubicationX! > 6) && (player.ubicationY! > 5) && (player.ubicationY! < 11) || (player.ubicationX! > 5) && (player.ubicationY! == 11) || (player.ubicationX! > 4) && (player.ubicationY! == 12) || (player.ubicationX! > 1) && (player.ubicationY! == 13))
        || teamAAtacking && (player.ubicationY! == 1) || (player.ubicationY! == 2) || (player.ubicationY! == 14) || (player.ubicationY! == 15) || (player.ubicationX! < 28) && (player.ubicationY! == 3) || (player.ubicationX! < 25) && (player.ubicationY! == 4) || (player.ubicationX! < 24) && (player.ubicationY! == 5) || (player.ubicationX! < 23) && (player.ubicationY! > 5) && (player.ubicationY! < 11) || (player.ubicationX! < 24) && (player.ubicationY! == 11) || (player.ubicationX! < 25) && (player.ubicationY! == 12) || (player.ubicationX! < 28) && (player.ubicationY! == 13)) {
        return ranges.outsideThe3PointLine.id

    } else if(
        !teamAAtacking
        || teamAAtacking) {
        return ranges.long3Range.id

    } else if(
        !teamAAtacking
        || teamAAtacking
    ) {
        return ranges.halfCourt.id

    } else if(
        !teamAAtacking
        || teamAAtacking
    ) {
        return ranges.behindHalfCourt.id

    } else if(
        !teamAAtacking
        || teamAAtacking
    ) {
        return ranges.theOtherRim.id

    } else {
        return "error"

    }
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
            
            if(playerZone(defender, !isTeamAAtacking) == "error") {
                defenderIniciative = 0
            }
            //If the player is close to the rim
            else if (playerZone(defender, !isTeamAAtacking) == ranges.closeToTheRim.id) {
                calculationIfDefensorIsCloseToTheRim();
            }
            //If the player is in short range
            else if (playerZone(defender, !isTeamAAtacking) == ranges.inShortRange.id || playerZone(defender, !isTeamAAtacking) == ranges.behindTheBoard.id) {
                calculationIfDefenderIsInShortRange();
            }
            //If the player is in mid range
            else if (playerZone(defender, !isTeamAAtacking) == ranges.inMidRange.id) {
                calculationIfDefenderIsInMidRange();
            }
            //If he is outside 3 point range or farther away
            else if (playerZone(defender, !isTeamAAtacking) as number <= ranges.outsideThe3PointLine.id) {
                calculationIfDefenderIsOutsideThe3PointLine();
            }
        
            if(playerZone(atacker, !isTeamAAtacking) == "error") {
                atackerInisiative = 0
            }
            //If the player is close to the rim
            else if (playerZone(atacker, !isTeamAAtacking) == ranges.closeToTheRim.id) {
                calculationIfAtackerIsCloseToTheRim();
            }
            //If the player is in short range
            else if (playerZone(atacker, !isTeamAAtacking) == ranges.inShortRange.id || playerZone(atacker, !isTeamAAtacking) == ranges.behindTheBoard.id) {
                calculationIfAtackerIsInShortRange();
            }
            //If the player is in mid range
            else if (playerZone(atacker, !isTeamAAtacking) == ranges.inMidRange.id) {
                calculationIfAtackerIsInMidRange();
            }
            //If he is outside 3 point range or farther away
            else if (playerZone(atacker, !isTeamAAtacking) as number <= ranges.outsideThe3PointLine.id) {
                calculationIfAtackerIsOutsideThe3PointLine();
            }

            //If teah B is defending
        } else if (isTeamAAtacking) {

            if(playerZone(defender, isTeamAAtacking) == "error") {
                defenderIniciative = 0
            }
            //If the player is close to the rim
            else if (playerZone(defender, isTeamAAtacking) == ranges.closeToTheRim.id) {
                calculationIfDefensorIsCloseToTheRim();
            }
            //If the player is in short range
            else if (playerZone(defender, isTeamAAtacking) == ranges.inShortRange.id || playerZone(defender, isTeamAAtacking) == ranges.behindTheBoard.id) {
                calculationIfAtackerIsInShortRange();
            }
            //If the player is in mid range
            else if (playerZone(defender, isTeamAAtacking) == ranges.inMidRange.id) {
                calculationIfAtackerIsInMidRange();
            }
            //If he is outside 3 point range or farther away
            else if (playerZone(defender, isTeamAAtacking) as number <= ranges.outsideThe3PointLine.id) {
                calculationIfDefenderIsOutsideThe3PointLine();
            }
        
            if(playerZone(atacker, !isTeamAAtacking) == "error") {
                atackerInisiative = 0
            }
            //If the player is close to the rim
            else if (playerZone(atacker, !isTeamAAtacking) == ranges.closeToTheRim.id) {
                calculationIfAtackerIsCloseToTheRim();
            }
            //If the player is in short range
            else if (playerZone(atacker, !isTeamAAtacking) == ranges.inShortRange.id || playerZone(atacker, !isTeamAAtacking) == ranges.behindTheBoard.id) {
                calculationIfAtackerIsInShortRange();
            }
            //If the player is in mid range
            else if (playerZone(atacker, !isTeamAAtacking) == ranges.inMidRange.id) {
                calculationIfAtackerIsInMidRange();
            }
            //If he is outside 3 point range or farther away
            else if (playerZone(atacker, !isTeamAAtacking) as number <= ranges.outsideThe3PointLine.id) {
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

export function checkTilesThatWillInfluenceInTheCalculations(gameBoard: number[][], startingUbication: number[], endingUbication: number[]) {
    const [width, height] = [gameBoard[0].length, gameBoard.length];

    const x1 = startingUbication[0];
    const y1 = startingUbication[1];
    
    const x2 = endingUbication[0];
    const y2 = endingUbication[1];

    let dx = x2! - x1!;
    let dy = y2! - y1!;

    let steps = Math.max(Math.abs(dx), Math.abs(dy));

    let xIncrement = dx / steps;
    let yIncrement = dy / steps;

    let ballGoesOverThisPositions = [] as any[]|[number[]];
    let ballGoesCloseToThisPositions = [] as any[]|[number[]];
        
    for (let i = 0; i <= steps; i++) {
      let x = Math.round(x1! + i * xIncrement);
      let y = Math.round(y1! + i * yIncrement);

      if (x >= 0 && x < width && y >= 0 && y < height) {

        ballGoesOverThisPositions.push([x, y]);

        for (let j = -1; j <= 1; j++) {
          for (let k = -1; k <= 1; k++) {
            if (j === 0 && k === 0) {
              continue;
            }
            let x2 = x + j;
            let y2 = y + k;
            if (x2 >= 0 && x2 < width && y2 >= 0 && y2 < height) {
              ballGoesCloseToThisPositions.push([x2, y2]);
            }
          }
        }
      }
    }
    return [ballGoesOverThisPositions, ballGoesCloseToThisPositions]
}


//TODO Add this function
export function moveButtonFunction(match: Match) {
    return console.log("moveButtonFunction")
}

//TODO Add this function
export function stealAttemptButtonFunction() {
    return console.log("stealAttemptButtonFunction")
}

//TODO Add this function
export function interceptPassAttemptButtonFunction() {
    return console.log("interceptPassAttemptButtonFunction")
}

//TODO Add this function
export function overwhelmingWaitingButtonFunction() {
    return console.log("overwhelmingWaitingButtonFunction")
}

//TODO Add this function
export function waitWithCautionButtonFunction() {
    return console.log("waitWithCautionButtonFunction")
}

//TODO Add this function
export function passButtonFunction() {
    return console.log("passButtonFunction")
}

//TODO Add this function
export function dribblingButtonFunction() {
    return console.log("dribblingButtonFunction")
}

//TODO Add this function
export function waitWithoutTheBallButtonFunction() {
    return console.log("waitWithoutTheBallButtonFunction")
}

//TODO Add this function
export function tripleThreatButtonFunction() {
    return console.log("tripleThreatButtonFunction")
}

//TODO Add this function
export function shootButtonFunction() {
    return console.log("shootButtonFunction")
}

//TODO Add this function
export function endTurnButtonFunction() {
    return console.log("endTurnButtonFunction")

}
