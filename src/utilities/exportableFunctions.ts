import {
  Coordinate,
  PlayerEditableInfo,
  PlayerEditableStatsKeys,
  PlayerStats,
  ValidPositions,
} from "../entities/myInterfaces";
import { Player } from "../entities/players";

export const teamARimUbication: Coordinate = [2, 8];
export const teamBRimUbication: Coordinate = [27, 8];

export const maxTeamPointsInTeamCreation = 70 * 5 * 9;

export function isPlayerWaiting(player: Player): boolean {
  return (
    player.lastAction === "waitWithCaution" ||
    player.lastAction === "overwhelmingWaiting" ||
    player.lastAction === "waitWithoutTheBall" ||
    player.lastAction === "trippleThreat"
  );
}

export function getHeightPoints(
  playerPosition: string,
  playerHeight: number,
): number {
  let minHeight = getMinStatPerPosition("height", playerPosition);
  let maxHeight = getMaxStatPerPosition("height", playerPosition);

  let minMaxDifference = maxHeight - minHeight;
  let playerDifferenceToMax = maxHeight - playerHeight;

  return (playerDifferenceToMax * 100) / minMaxDifference;
}

export function getWeightPoints(
  playerPosition: string,
  playerWeight: number,
): number {
  let minWeight = getMinStatPerPosition("weight", playerPosition);
  let maxWeight = getMaxStatPerPosition("weight", playerPosition);

  let minMaxDifference = maxWeight - minWeight;
  let playerDifferenceToMax = maxWeight - playerWeight;

  return (playerDifferenceToMax * 100) / minMaxDifference;
}

export function getMinStatPerPosition(
  thisStat: PlayerEditableStatsKeys,
  playerPosition: string,
): number {
  if (thisStat == "height") {
    if (playerPosition == "1") {
      return 165;
    } else if (playerPosition == "2") {
      return 170;
    } else if (playerPosition == "3") {
      return 175;
    } else if (playerPosition == "4") {
      return 190;
    } else {
      return 205;
    }
  } else if (thisStat == "weight") {
    if (playerPosition == "1") {
      return 60;
    } else if (playerPosition == "2") {
      return 65;
    } else if (playerPosition == "3") {
      return 70;
    } else if (playerPosition == "4") {
      return 80;
    } else {
      return 90;
    }
  } else if (thisStat == "atleticism") {
    if (playerPosition == "1") {
      return 60;
    } else if (playerPosition == "2") {
      return 40;
    } else if (playerPosition == "3") {
      return 40;
    } else if (playerPosition == "4") {
      return 30;
    } else {
      return 15;
    }
  } else if (thisStat == "perimeterDefence") {
    if (playerPosition == "1") {
      return 50;
    } else if (playerPosition == "2") {
      return 45;
    } else if (playerPosition == "3") {
      return 40;
    } else if (playerPosition == "4") {
      return 20;
    } else {
      return 5;
    }
  } else if (thisStat == "insideDefence") {
    if (playerPosition == "1") {
      return 10;
    } else if (playerPosition == "2") {
      return 15;
    } else if (playerPosition == "3") {
      return 30;
    } else if (playerPosition == "4") {
      return 40;
    } else {
      return 60;
    }
  } else if (thisStat == "rebounding") {
    if (playerPosition == "1") {
      return 10;
    } else if (playerPosition == "2") {
      return 15;
    } else if (playerPosition == "3") {
      return 30;
    } else if (playerPosition == "4") {
      return 50;
    } else {
      return 60;
    }
  } else if (thisStat == "perimeterScoring") {
    if (playerPosition == "1") {
      return 50;
    } else if (playerPosition == "2") {
      return 50;
    } else if (playerPosition == "3") {
      return 30;
    } else if (playerPosition == "4") {
      return 10;
    } else {
      return 5;
    }
  } else if (thisStat == "insideScoring") {
    if (playerPosition == "1") {
      return 30;
    } else if (playerPosition == "2") {
      return 30;
    } else if (playerPosition == "3") {
      return 40;
    } else if (playerPosition == "4") {
      return 60;
    } else {
      return 65;
    }
  } else if (thisStat == "playMaking") {
    if (playerPosition == "1") {
      return 40;
    } else if (playerPosition == "2") {
      return 40;
    } else if (playerPosition == "3") {
      return 10;
    } else if (playerPosition == "4") {
      return 5;
    } else {
      return 1;
    }
  } else {
    return 0;
  }
}

export function getInitialPlayerStatsOnCreation(
  positionNumber: string,
): PlayerEditableInfo {
  return {
    name: "",
    position: positionNumber,
    height: getMinStatPerPosition("height", positionNumber),
    weight: getMinStatPerPosition("weight", positionNumber),
    atleticism: getMinStatPerPosition("atleticism", positionNumber),
    perimeterDefence: getMinStatPerPosition("perimeterDefence", positionNumber),
    insideDefence: getMinStatPerPosition("insideDefence", positionNumber),
    rebounding: getMinStatPerPosition("rebounding", positionNumber),
    perimeterScoring: getMinStatPerPosition("perimeterScoring", positionNumber),
    insideScoring: getMinStatPerPosition("insideScoring", positionNumber),
    playMaking: getMinStatPerPosition("playMaking", positionNumber),
  };
}

export function getMaxStatPerPosition(
  thisStat: PlayerEditableStatsKeys,
  playerPosition: string,
): number {
  if (thisStat == "height") {
    if (playerPosition == "1") {
      return 200;
    } else if (playerPosition == "2") {
      return 206;
    } else if (playerPosition == "3") {
      return 213;
    } else if (playerPosition == "4") {
      return 229;
    } else {
      return 231;
    }
  } else if (thisStat == "weight") {
    if (playerPosition == "1") {
      return 100;
    } else if (playerPosition == "2") {
      return 108;
    } else if (playerPosition == "3") {
      return 113;
    } else if (playerPosition == "4") {
      return 120;
    } else {
      return 127;
    }
  } else if (thisStat == "atleticism") {
    if (playerPosition == "1") {
      return 100;
    } else if (playerPosition == "2") {
      return 100;
    } else if (playerPosition == "3") {
      return 80;
    } else if (playerPosition == "4") {
      return 60;
    } else {
      return 50;
    }
  } else if (thisStat == "perimeterDefence") {
    if (playerPosition == "1") {
      return 100;
    } else if (playerPosition == "2") {
      return 95;
    } else if (playerPosition == "3") {
      return 90;
    } else if (playerPosition == "4") {
      return 70;
    } else {
      return 30;
    }
  } else if (thisStat == "insideDefence") {
    if (playerPosition == "1") {
      return 30;
    } else if (playerPosition == "2") {
      return 70;
    } else if (playerPosition == "3") {
      return 90;
    } else if (playerPosition == "4") {
      return 95;
    } else {
      return 100;
    }
  } else if (thisStat == "rebounding") {
    if (playerPosition == "1") {
      return 30;
    } else if (playerPosition == "2") {
      return 40;
    } else if (playerPosition == "3") {
      return 70;
    } else if (playerPosition == "4") {
      return 90;
    } else {
      return 100;
    }
  } else if (thisStat == "perimeterScoring") {
    if (playerPosition == "1") {
      return 100;
    } else if (playerPosition == "2") {
      return 100;
    } else if (playerPosition == "3") {
      return 90;
    } else if (playerPosition == "4") {
      return 80;
    } else {
      return 70;
    }
  } else if (thisStat == "insideScoring") {
    if (playerPosition == "1") {
      return 80;
    } else if (playerPosition == "2") {
      return 80;
    } else if (playerPosition == "3") {
      return 95;
    } else if (playerPosition == "4") {
      return 95;
    } else {
      return 100;
    }
  } else if (thisStat == "playMaking") {
    if (playerPosition == "1") {
      return 100;
    } else if (playerPosition == "2") {
      return 100;
    } else if (playerPosition == "3") {
      return 70;
    } else if (playerPosition == "4") {
      return 60;
    } else {
      return 60;
    }
  } else {
    return 0;
  }
}

export function getStatValue(
  key: PlayerEditableStatsKeys,
  player: PlayerEditableInfo,
): number {
  if (key) {
    if (player[key] === undefined) {
      console.error(`Stat ${key} not found in player object`, player);
      throw new Error(`Error: Stat ${key} not found in player object`);
    } else {
      return player[key];
    }
  } else {
    console.error(`Stat ${key} not passed to getStatValue`, player);
    throw new Error(`Error: Stat ${key} not passed to getStatValue`);
  }
}

export function playerPositionDetection(
  playerPosition: string | number,
): ValidPositions {
  if (playerPosition == "1") {
    return "G";
  } else if (playerPosition == "2") {
    return "SG";
  } else if (playerPosition == "3") {
    return "SF";
  } else if (playerPosition == "4") {
    return "PF";
  } else if (playerPosition == "5") {
    return "C";
  } else {
    return "Not detected";
  }
}

export function firstLetterToUpper(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function separateCamelCaseBySpace(
  string: PlayerEditableStatsKeys,
): string {
  let separatedText = "";

  if (string !== null) {
    for (let letter of string) {
      if (letter.toUpperCase() === letter) {
        separatedText += ` ${letter.toLocaleLowerCase()}`;
      } else {
        separatedText += letter;
      }
    }
  }

  return separatedText;
}

export function numberEntire(number: number): number {
  let numberInString = number.toString();
  let entireNumberInString = "";

  for (let character of numberInString) {
    if (character != ".") {
      entireNumberInString += character;
    } else {
      break;
    }
  }

  return Number(entireNumberInString);
}

export function calculatePlayerOverallRating(
  pointsUsedOnPlayer: number,
): string {
  let overallRating: number;
  //50 is the min overall rating
  overallRating = 50 + pointsUsedOnPlayer / 9 / 2;

  return numberEntire(overallRating).toString();
}

export function setPointsUsedOnThisSkill(
  statType: PlayerEditableStatsKeys,
  previousStats: PlayerStats,
  setter: React.Dispatch<React.SetStateAction<PlayerStats>>,
  pointsUsedOnThisSkill: number,
): void {
  let previousStatsCopy = previousStats;
  if (statType) {
    previousStatsCopy[statType] = pointsUsedOnThisSkill;
    setter(() => previousStatsCopy);
  }
}

export function roll20SidesDice(): number {
  return Math.random() * (21 - 1) + 1;
}

export function roll6SidesDice(): number {
  return Math.random() * (7 - 1) + 1;
}

export const ranges = {
  closeToTheRim: {
    id: 0,
    text: "close to the rim",
  },
  behindTheBoard: {
    id: 1,
    text: "behind the board",
  },
  inShortRange: {
    id: 2,
    text: "in short range",
  },
  inMidRange: {
    id: 3,
    text: "in mid range",
  },
  outsideThe3PointLine: {
    id: 4,
    text: "outside the 3 point line",
  },
  long3Range: {
    id: 5,
    text: "long 3 range",
  },
  halfCourt: {
    id: 6,
    text: "half court",
  },
  behindHalfCourt: {
    id: 7,
    text: "behind the half court",
  },
  theOtherRim: {
    id: 8,
    text: "the other rim",
  },
};

export function getRangeText(rangeId: number): string {
  for (const key in ranges) {
    const rangeObj = ranges[key as keyof typeof ranges];

    if (rangeObj.id === rangeId) {
      return rangeObj.text;
    }
  }

  throw new Error(`Range ${rangeId} text not found`);
}

export function isCloseToTheRim(
  teamAAtacking: boolean,
  coordinate: Coordinate,
): boolean {
  return (
    (!teamAAtacking &&
      ((coordinate[0] == 2 && coordinate[1] > 5 && coordinate[1] < 11) ||
        (coordinate[0] == 3 && coordinate[1] > 6 && coordinate[1] < 11))) ||
    (teamAAtacking &&
      ((coordinate[0] == 27 && coordinate[1] > 5 && coordinate[1] < 11) ||
        (coordinate[0] == 26 && coordinate[1] > 6 && coordinate[1] < 11)))
  );
}

export function isBehindTheBoard(
  teamAAtacking: boolean,
  coordinate: Coordinate,
): boolean {
  return (
    (!teamAAtacking &&
      coordinate[0] == 1 &&
      coordinate[1] > 5 &&
      coordinate[1] < 11) ||
    (teamAAtacking &&
      coordinate[0] == 28 &&
      coordinate[1] > 5 &&
      coordinate[1] < 11)
  );
}

export function isInShortRange(
  teamAAtacking: boolean,
  coordinate: Coordinate,
): boolean {
  return (
    (!teamAAtacking &&
      ((coordinate[0] < 5 &&
        coordinate[0] > 1 &&
        (coordinate[1] == 5 || coordinate[1] == 11)) ||
        (coordinate[0] < 6 &&
          coordinate[0] > 2 &&
          (coordinate[1] == 6 || coordinate[1] == 10)) ||
        (coordinate[0] == 5 && coordinate[1] > 5 && coordinate[1] < 11) ||
        (coordinate[0] == 7 && coordinate[1] == 8))) ||
    (teamAAtacking &&
      ((coordinate[0] > 24 &&
        coordinate[0] < 28 &&
        (coordinate[1] == 5 || coordinate[1] == 11)) ||
        (coordinate[0] > 23 &&
          coordinate[0] < 27 &&
          (coordinate[1] == 6 || coordinate[1] == 10)) ||
        (coordinate[0] == 5 && coordinate[1] > 5 && coordinate[1] < 11) ||
        (coordinate[0] == 7 && coordinate[1] == 8)))
  );
}

export function isInMidRange(
  teamAAtacking: boolean,
  coordinate: Coordinate,
): boolean {
  return (
    (!teamAAtacking &&
      coordinate[0] == 1 &&
      coordinate[1] > 1 &&
      coordinate[1] < 15) ||
    (coordinate[0] < 6 &&
      coordinate[0] > 1 &&
      ((coordinate[1] > 1 && coordinate[1] < 5) ||
        (coordinate[1] > 11 && coordinate[1] < 15))) ||
    (coordinate[0] == 6 &&
      ((coordinate[1] > 2 && coordinate[1] < 5) ||
        (coordinate[1] > 11 && coordinate[1] < 13))) ||
    ((coordinate[1] == 5 || coordinate[1] == 11) &&
      coordinate[0] < 9 &&
      coordinate[0] > 4) ||
    (coordinate[0] < 9 &&
      coordinate[0] > 5 &&
      (coordinate[1] == 6 ||
        coordinate[1] == 7 ||
        coordinate[1] == 9 ||
        coordinate[1] == 10)) ||
    (coordinate[0] < 9 && coordinate[0] > 6 && coordinate[1] == 8) ||
    (teamAAtacking &&
      coordinate[0] == 28 &&
      coordinate[1] > 1 &&
      coordinate[1] < 15) ||
    (coordinate[0] > 23 &&
      coordinate[0] < 28 &&
      ((coordinate[1] > 1 && coordinate[1] < 5) ||
        (coordinate[1] > 11 && coordinate[1] < 15))) ||
    (coordinate[0] == 23 &&
      ((coordinate[1] > 2 && coordinate[1] < 5) ||
        (coordinate[1] > 11 && coordinate[1] < 13))) ||
    ((coordinate[1] == 5 || coordinate[1] == 11) &&
      coordinate[0] > 20 &&
      coordinate[0] < 25) ||
    (coordinate[0] > 20 &&
      coordinate[0] < 24 &&
      (coordinate[1] == 6 ||
        coordinate[1] == 7 ||
        coordinate[1] == 9 ||
        coordinate[1] == 10)) ||
    (coordinate[0] > 20 && coordinate[0] < 23 && coordinate[1] == 8)
  );
}

export function isCloseToThe3PointLine(
  teamAAtacking: boolean,
  coordinate: Coordinate,
): boolean {
  return (
    (!teamAAtacking &&
      coordinate[0] > 7 &&
      (coordinate[1] == 1 || coordinate[1] == 15)) ||
    (coordinate[0] > 8 &&
      coordinate[0] < 5 &&
      (coordinate[1] == 2 || coordinate[1] == 14)) ||
    (coordinate[0] > 9 &&
      coordinate[0] < 6 &&
      (coordinate[1] == 3 || coordinate[1] == 13)) ||
    (coordinate[0] > 10 &&
      coordinate[0] < 7 &&
      (coordinate[1] == 4 || coordinate[1] == 12)) ||
    (coordinate[0] == 9 && (coordinate[1] == 5 || coordinate[1] == 11)) ||
    (coordinate[0] > 8 &&
      coordinate[0] < 11 &&
      coordinate[1] > 5 &&
      coordinate[1] < 11) ||
    (teamAAtacking &&
      coordinate[0] < 22 &&
      (coordinate[1] == 1 || coordinate[1] == 15)) ||
    (coordinate[0] < 21 &&
      coordinate[0] > 24 &&
      (coordinate[1] == 2 || coordinate[1] == 14)) ||
    (coordinate[0] < 20 &&
      coordinate[0] > 23 &&
      (coordinate[1] == 3 || coordinate[1] == 13)) ||
    (coordinate[0] < 19 &&
      coordinate[0] > 22 &&
      (coordinate[1] == 4 || coordinate[1] == 12)) ||
    (coordinate[0] == 20 && (coordinate[1] == 5 || coordinate[1] == 11)) ||
    (coordinate[0] < 21 &&
      coordinate[0] > 18 &&
      coordinate[1] > 5 &&
      coordinate[1] < 11)
  );
}

export function isInLong3Range(
  teamAAtacking: boolean,
  coordinate: Coordinate,
): boolean {
  return (
    (!teamAAtacking &&
      coordinate[0] < 10 &&
      coordinate[0] > 6 &&
      (coordinate[1] == 1 || coordinate[1] == 15)) ||
    (coordinate[0] < 11 &&
      coordinate[0] > 7 &&
      (coordinate[1] == 2 || coordinate[1] == 14)) ||
    (coordinate[0] < 12 &&
      coordinate[0] > 8 &&
      (coordinate[1] == 3 || coordinate[1] == 13)) ||
    (coordinate[0] < 12 &&
      coordinate[0] > 9 &&
      (coordinate[1] == 4 || coordinate[1] == 12)) ||
    (coordinate[0] < 13 &&
      coordinate[0] > 9 &&
      (coordinate[1] == 5 || coordinate[1] == 11)) ||
    (coordinate[0] < 14 &&
      coordinate[0] > 10 &&
      (coordinate[1] > 5 || coordinate[1] < 11)) ||
    (teamAAtacking &&
      coordinate[0] > 19 &&
      coordinate[0] < 23 &&
      (coordinate[1] == 1 || coordinate[1] == 15)) ||
    (coordinate[0] > 18 &&
      coordinate[0] < 22 &&
      (coordinate[1] == 2 || coordinate[1] == 14)) ||
    (coordinate[0] > 17 &&
      coordinate[0] < 21 &&
      (coordinate[1] == 3 || coordinate[1] == 13)) ||
    (coordinate[0] > 17 &&
      coordinate[0] < 20 &&
      (coordinate[1] == 4 || coordinate[1] == 12)) ||
    (coordinate[0] > 16 &&
      coordinate[0] < 20 &&
      (coordinate[1] == 5 || coordinate[1] == 11)) ||
    (coordinate[0] > 15 &&
      coordinate[0] < 19 &&
      (coordinate[1] > 5 || coordinate[1] < 11))
  );
}

export function isCloseToHalfCourt(
  teamAAtacking: boolean,
  coordinate: Coordinate,
): boolean {
  return (
    (!teamAAtacking &&
      ((coordinate[0] < 15 &&
        coordinate[0] > 9 &&
        (coordinate[1] == 1 || coordinate[1] == 15)) ||
        (coordinate[0] < 16 &&
          coordinate[0] > 10 &&
          (coordinate[1] == 2 || coordinate[1] == 14)) ||
        (coordinate[0] < 16 &&
          coordinate[0] > 11 &&
          (coordinate[1] == 3 || coordinate[1] == 13)) ||
        (coordinate[0] < 17 &&
          coordinate[0] > 11 &&
          (coordinate[1] == 4 || coordinate[1] == 12)) ||
        (coordinate[0] < 17 &&
          coordinate[0] > 12 &&
          (coordinate[1] == 5 || coordinate[1] == 11)) ||
        (coordinate[0] < 18 &&
          coordinate[0] > 13 &&
          coordinate[1] < 11 &&
          coordinate[1] > 5) ||
        (coordinate[0] == 18 && coordinate[1] == 8))) ||
    (teamAAtacking &&
      ((coordinate[0] > 14 &&
        coordinate[0] < 20 &&
        (coordinate[1] == 1 || coordinate[1] == 15)) ||
        (coordinate[0] > 13 &&
          coordinate[0] > 19 &&
          (coordinate[1] == 2 || coordinate[1] == 14)) ||
        (coordinate[0] > 13 &&
          coordinate[0] < 18 &&
          (coordinate[1] == 3 || coordinate[1] == 13)) ||
        (coordinate[0] > 12 &&
          coordinate[0] < 18 &&
          (coordinate[1] == 4 || coordinate[1] == 12)) ||
        (coordinate[0] > 12 &&
          coordinate[0] < 17 &&
          (coordinate[1] == 5 || coordinate[1] == 11)) ||
        (coordinate[0] > 11 &&
          coordinate[0] < 16 &&
          coordinate[1] < 11 &&
          coordinate[1] > 5) ||
        (coordinate[0] == 11 && coordinate[1] == 8)))
  );
}

export function isBehindTheHalfCourt(
  teamAAtacking: boolean,
  coordinate: Coordinate,
): boolean {
  return (
    (!teamAAtacking &&
      ((coordinate[0] < 19 &&
        coordinate[0] > 14 &&
        (coordinate[1] == 1 || coordinate[1] == 15)) ||
        (coordinate[0] < 20 &&
          coordinate[0] > 15 &&
          ((coordinate[1] < 4 && coordinate[1] > 1) ||
            (coordinate[1] < 15 && coordinate[1] > 12))) ||
        (coordinate[0] < 21 &&
          coordinate[0] > 16 &&
          ((coordinate[1] < 6 && coordinate[1] > 3) ||
            (coordinate[1] < 13 && coordinate[1] > 10))) ||
        (coordinate[0] < 22 &&
          coordinate[0] > 17 &&
          ((coordinate[1] < 8 && coordinate[1] > 5) ||
            (coordinate[1] < 11 && coordinate[1] > 8))) ||
        (coordinate[0] < 22 && coordinate[0] > 18 && coordinate[1] == 8))) ||
    (teamAAtacking &&
      ((coordinate[0] > 10 &&
        coordinate[0] < 15 &&
        (coordinate[1] == 1 || coordinate[1] == 15)) ||
        (coordinate[0] > 9 &&
          coordinate[0] < 14 &&
          ((coordinate[1] < 4 && coordinate[1] > 1) ||
            (coordinate[1] < 15 && coordinate[1] > 12))) ||
        (coordinate[0] > 8 &&
          coordinate[0] < 13 &&
          ((coordinate[1] < 6 && coordinate[1] > 3) ||
            (coordinate[1] < 13 && coordinate[1] > 10))) ||
        (coordinate[0] > 7 &&
          coordinate[0] < 12 &&
          ((coordinate[1] < 8 && coordinate[1] > 5) ||
            (coordinate[1] < 11 && coordinate[1] > 8))) ||
        (coordinate[0] > 7 && coordinate[0] < 11 && coordinate[1] == 8)))
  );
}

export function isIntheOtherRim(
  teamAAtacking: boolean,
  coordinate: Coordinate,
): boolean {
  return (
    (!teamAAtacking &&
      ((coordinate[0] > 18 && (coordinate[1] == 1 || coordinate[1] == 15)) ||
        (coordinate[0] > 19 &&
          ((coordinate[1] < 4 && coordinate[1] > 1) ||
            (coordinate[1] < 15 && coordinate[1] > 12))) ||
        (coordinate[0] > 20 &&
          ((coordinate[1] < 6 && coordinate[1] > 3) ||
            (coordinate[1] < 13 && coordinate[1] > 10))) ||
        (coordinate[0] > 21 && coordinate[1] < 11 && coordinate[1] > 5))) ||
    (teamAAtacking &&
      ((coordinate[0] < 11 && (coordinate[1] == 1 || coordinate[1] == 15)) ||
        (coordinate[0] < 10 &&
          ((coordinate[1] < 4 && coordinate[1] > 1) ||
            (coordinate[1] < 15 && coordinate[1] > 12))) ||
        (coordinate[0] < 9 &&
          ((coordinate[1] < 6 && coordinate[1] > 3) ||
            (coordinate[1] < 13 && coordinate[1] > 10))) ||
        (coordinate[0] < 8 && coordinate[1] < 11 && coordinate[1] > 5)))
  );
}

export function mathShotPointsInFreeThrow(shooter: PlayerStats): number {
  return (shooter.insideScoring + shooter.perimeterScoring) / 2;
}

export function mathChancesMakingShotInFreeThrow(
  maxShooterPoints: number,
  shotDiceRoll: number,
): boolean {
  return (
    (maxShooterPoints >= 100 && shotDiceRoll > 1) ||
    (maxShooterPoints >= 97 && shotDiceRoll > 2) ||
    (maxShooterPoints >= 94 && shotDiceRoll > 3) ||
    (maxShooterPoints >= 91 && shotDiceRoll > 4) ||
    (maxShooterPoints >= 88 && shotDiceRoll > 5) ||
    (maxShooterPoints >= 85 && shotDiceRoll > 6) ||
    (maxShooterPoints >= 82 && shotDiceRoll > 7) ||
    (maxShooterPoints >= 79 && shotDiceRoll > 8) ||
    (maxShooterPoints >= 76 && shotDiceRoll > 9) ||
    (maxShooterPoints >= 73 && shotDiceRoll > 10) ||
    (maxShooterPoints >= 70 && shotDiceRoll > 11) ||
    (maxShooterPoints >= 67 && shotDiceRoll > 12) ||
    (maxShooterPoints >= 65 && shotDiceRoll > 13) ||
    (maxShooterPoints >= 63 && shotDiceRoll > 14) ||
    (maxShooterPoints >= 60 && shotDiceRoll > 15)
  );
}

export function mathShotPointsCloseToTheRim(
  multiplier: number,
  shooter: PlayerStats,
): number {
  const insideScoring = shooter.insideScoring;

  if (shooter.position === undefined) {
    console.error("shooter.position not found in mathShotPointsCloseToTheRim");
    throw new Error(
      "Error: shooter.position not found in mathShotPointsCloseToTheRim",
    );
  }

  const weightPoints = getWeightPoints(shooter.position, shooter.weight);
  const heightPoints = getHeightPoints(shooter.position, shooter.height);

  return (
    (insideScoring * 5 +
      shooter.playMaking * 0.5 +
      shooter.atleticism * 3 +
      weightPoints * 2 +
      heightPoints * 2 +
      roll20SidesDice() * 5) *
    multiplier
  );
}

export function mathChancesMakingShotInCloseToTheRim(
  pointsDif: number,
  shotDiceRoll: number,
): boolean {
  return (
    pointsDif > 60 ||
    (pointsDif > 55 && shotDiceRoll > 1) ||
    (pointsDif > 50 && shotDiceRoll > 2) ||
    (pointsDif > 47 && shotDiceRoll > 3) ||
    (pointsDif > 43 && shotDiceRoll > 4) ||
    (pointsDif > 40 && shotDiceRoll > 5) ||
    (pointsDif > 30 && shotDiceRoll > 6) ||
    (pointsDif > 20 && shotDiceRoll > 7) ||
    (pointsDif > 17.5 && shotDiceRoll > 8) ||
    (pointsDif > 14 && shotDiceRoll > 9) ||
    (pointsDif > 10 && shotDiceRoll > 10) ||
    (pointsDif > 5 && shotDiceRoll > 11) ||
    (pointsDif > 0 && shotDiceRoll > 12) ||
    (pointsDif > -10 && shotDiceRoll > 13) ||
    (pointsDif > -15 && shotDiceRoll > 14) ||
    (pointsDif > -17.5 && shotDiceRoll > 15) ||
    (pointsDif > -19 && shotDiceRoll > 16) ||
    (pointsDif > -20 && shotDiceRoll > 17) ||
    (pointsDif > -22 && shotDiceRoll > 18) ||
    (pointsDif > -25 && shotDiceRoll > 19)
  );
}

export function mathShotPointsInShortRange(
  multiplier: number,
  shooter: PlayerStats,
): number {
  if (shooter.position === undefined) {
    console.error("shooter.position not found in mathShotPointsInShortRange");
    throw new Error(
      "Error: shooter.position not found in mathShotPointsInShortRange",
    );
  }

  const weightPoints = getWeightPoints(shooter.position, shooter.weight);
  const heightPoints = getHeightPoints(shooter.position, shooter.height);

  return (
    (shooter.insideScoring * 4 +
      shooter.perimeterScoring * 0.5 +
      shooter.playMaking * 1.5 +
      shooter.atleticism * 3 +
      weightPoints +
      heightPoints +
      roll20SidesDice() * 5) *
    multiplier
  );
}

export function mathChancesMakingShotInShortRange(
  pointsDif: number,
  shotDiceRoll: number,
): boolean {
  return (
    (pointsDif > 98 && shotDiceRoll > 1) ||
    (pointsDif > 96 && shotDiceRoll > 2) ||
    (pointsDif > 92 && shotDiceRoll > 3) ||
    (pointsDif > 89 && shotDiceRoll > 4) ||
    (pointsDif > 86 && shotDiceRoll > 5) ||
    (pointsDif > 82 && shotDiceRoll > 6) ||
    (pointsDif > 79 && shotDiceRoll > 7) ||
    (pointsDif > 72 && shotDiceRoll > 8) ||
    (pointsDif > 64 && shotDiceRoll > 9) ||
    (pointsDif > 58 && shotDiceRoll > 10) ||
    (pointsDif > 50 && shotDiceRoll > 11) ||
    (pointsDif > 48 && shotDiceRoll > 12) ||
    (pointsDif > 43 && shotDiceRoll > 13) ||
    (pointsDif > 37 && shotDiceRoll > 14) ||
    (pointsDif > 30 && shotDiceRoll > 15) ||
    (pointsDif > 20 && shotDiceRoll > 16) ||
    (pointsDif > 12.5 && shotDiceRoll > 17) ||
    (pointsDif > 0 && shotDiceRoll > 18) ||
    (pointsDif > -3 && shotDiceRoll > 19)
  );
}

export function mathShotPointsInMidRange(
  multiplier: number,
  shooter: PlayerStats,
): number {
  if (shooter.position === undefined) {
    console.error("shooter.position not found in mathShotPointsInMidRange");
    throw new Error(
      "Error: shooter.position not found in mathShotPointsInMidRange",
    );
  }

  const heightPoints = getHeightPoints(shooter.position, shooter.height);

  return (
    (shooter.insideScoring +
      shooter.perimeterScoring * 4 +
      shooter.playMaking * 1.5 +
      heightPoints +
      roll20SidesDice() * 5) *
    multiplier
  );
}

export function mathChancesMakingShotInMidRange(
  pointsDif: number,
  shotDiceRoll: number,
): boolean {
  return (
    (pointsDif > 98 && shotDiceRoll > 3) ||
    (pointsDif > 94 && shotDiceRoll > 4) ||
    (pointsDif > 90 && shotDiceRoll > 5) ||
    (pointsDif > 87 && shotDiceRoll > 6) ||
    (pointsDif > 83 && shotDiceRoll > 7) ||
    (pointsDif > 77 && shotDiceRoll > 8) ||
    (pointsDif > 69 && shotDiceRoll > 9) ||
    (pointsDif > 63 && shotDiceRoll > 10) ||
    (pointsDif > 58 && shotDiceRoll > 11) ||
    (pointsDif > 53 && shotDiceRoll > 12) ||
    (pointsDif > 49 && shotDiceRoll > 13) ||
    (pointsDif > 40 && shotDiceRoll > 14) ||
    (pointsDif > 34 && shotDiceRoll > 15) ||
    (pointsDif > 23 && shotDiceRoll > 16) ||
    (pointsDif > 15 && shotDiceRoll > 17) ||
    (pointsDif > 9 && shotDiceRoll > 18) ||
    (pointsDif > 3 && shotDiceRoll > 19)
  );
}

export function mathShotPointsCloseToThe3PointLine(
  multiplier: number,
  shooter: PlayerStats,
): number {
  if (shooter.position === undefined) {
    console.error(
      "shooter.position not found in mathShotPointsCloseToThe3PointLine",
    );
    throw new Error(
      "Error: shooter.position not found in mathShotPointsCloseToThe3PointLine",
    );
  }

  const weightPoints = getWeightPoints(shooter.position, shooter.weight);
  const heightPoints = getHeightPoints(shooter.position, shooter.height);
  return (
    (shooter.perimeterScoring * 6 +
      shooter.playMaking -
      heightPoints * 0.5 -
      weightPoints * 0.5 +
      roll20SidesDice() * 4.5) *
    multiplier
  );
}

export function mathChancesMakingShotInCloseToThe3PointLine(
  pointsDif: number,
  shotDiceRoll: number,
): boolean {
  return (
    (pointsDif > 98 && shotDiceRoll > 5) ||
    (pointsDif > 94 && shotDiceRoll > 6) ||
    (pointsDif > 89 && shotDiceRoll > 7) ||
    (pointsDif > 83 && shotDiceRoll > 8) ||
    (pointsDif > 75 && shotDiceRoll > 9) ||
    (pointsDif > 69 && shotDiceRoll > 10) ||
    (pointsDif > 63 && shotDiceRoll > 11) ||
    (pointsDif > 58 && shotDiceRoll > 12) ||
    (pointsDif > 50 && shotDiceRoll > 13) ||
    (pointsDif > 45 && shotDiceRoll > 14) ||
    (pointsDif > 40 && shotDiceRoll > 15) ||
    (pointsDif > 35 && shotDiceRoll > 16) ||
    (pointsDif > 28 && shotDiceRoll > 17) ||
    (pointsDif > 20 && shotDiceRoll > 18) ||
    (pointsDif > 13 && shotDiceRoll > 19)
  );
}

export function mathShotPointsInLong3Range(
  multiplier: number,
  shooter: PlayerStats,
): number {
  if (shooter.position === undefined) {
    console.error("shooter.position not found in mathShotPointsInLong3Range");
    throw new Error(
      "Error: shooter.position not found in mathShotPointsInLong3Range",
    );
  }

  const weightPoints = getWeightPoints(shooter.position, shooter.weight);
  const heightPoints = getHeightPoints(shooter.position, shooter.height);

  return (
    (shooter.perimeterScoring * 5 +
      shooter.playMaking * 0.5 -
      heightPoints * 0.5 -
      weightPoints +
      roll20SidesDice() * 3.5) *
    multiplier
  );
}

export function mathChancesMakingShotInLong3Range(
  pointsDif: number,
  shotDiceRoll: number,
): boolean {
  return (
    (pointsDif > 98 && shotDiceRoll > 6) ||
    (pointsDif > 92 && shotDiceRoll > 7) ||
    (pointsDif > 89 && shotDiceRoll > 8) ||
    (pointsDif > 80 && shotDiceRoll > 9) ||
    (pointsDif > 76 && shotDiceRoll > 10) ||
    (pointsDif > 70 && shotDiceRoll > 11) ||
    (pointsDif > 65 && shotDiceRoll > 12) ||
    (pointsDif > 60 && shotDiceRoll > 13) ||
    (pointsDif > 54 && shotDiceRoll > 14) ||
    (pointsDif > 49 && shotDiceRoll > 15) ||
    (pointsDif > 42 && shotDiceRoll > 16) ||
    (pointsDif > 37 && shotDiceRoll > 17) ||
    (pointsDif > 31 && shotDiceRoll > 18) ||
    (pointsDif > 20 && shotDiceRoll > 19)
  );
}

export function mathShotPointsInHalfCourt(
  multiplier: number,
  shooter: PlayerStats,
): number {
  if (shooter.position === undefined) {
    console.error("shooter.position not found in mathShotPointsInHalfCourt");
    throw new Error(
      "Error: shooter.position not found in mathShotPointsInHalfCourt",
    );
  }

  const weightPoints = getWeightPoints(shooter.position, shooter.weight);
  const heightPoints = getHeightPoints(shooter.position, shooter.height);

  return (
    (shooter.perimeterScoring * 4 -
      heightPoints * 0.5 -
      weightPoints +
      roll20SidesDice() * 2) *
    multiplier
  );
}

export function mathChancesMakingShotInHalfCourt(
  pointsDif: number,
  shotDiceRoll: number,
): boolean {
  return (
    (pointsDif > 98 && shotDiceRoll > 7) ||
    (pointsDif > 92 && shotDiceRoll > 8) ||
    (pointsDif > 89 && shotDiceRoll > 9) ||
    (pointsDif > 80 && shotDiceRoll > 10) ||
    (pointsDif > 76 && shotDiceRoll > 11) ||
    (pointsDif > 70 && shotDiceRoll > 12) ||
    (pointsDif > 65 && shotDiceRoll > 13) ||
    (pointsDif > 60 && shotDiceRoll > 14) ||
    (pointsDif > 54 && shotDiceRoll > 15) ||
    (pointsDif > 49 && shotDiceRoll > 16) ||
    (pointsDif > 42 && shotDiceRoll > 17) ||
    (pointsDif > 37 && shotDiceRoll > 18) ||
    (pointsDif > 31 && shotDiceRoll > 19)
  );
}

export function mathShotPointsBehindHalfCourt(
  multiplier: number,
  shooter: PlayerStats,
): number {
  if (shooter.position === undefined) {
    console.error(
      "shooter.position not found in mathShotPointsBehindHalfCourt",
    );
    throw new Error(
      "Error: shooter.position not found in mathShotPointsBehindHalfCourt",
    );
  }

  const weightPoints = getWeightPoints(shooter.position, shooter.weight);
  const heightPoints = getHeightPoints(shooter.position, shooter.height);

  return (
    (shooter.perimeterScoring * 3 -
      heightPoints -
      weightPoints +
      roll20SidesDice()) *
    multiplier
  );
}

export function mathChancesMakingShotInBehindHalfCourt(
  pointsDif: number,
  shotDiceRoll: number,
): boolean {
  return (
    (pointsDif > 98 && shotDiceRoll > 8) ||
    (pointsDif > 92 && shotDiceRoll > 9) ||
    (pointsDif > 89 && shotDiceRoll > 10) ||
    (pointsDif > 80 && shotDiceRoll > 11) ||
    (pointsDif > 76 && shotDiceRoll > 12) ||
    (pointsDif > 70 && shotDiceRoll > 13) ||
    (pointsDif > 65 && shotDiceRoll > 14) ||
    (pointsDif > 60 && shotDiceRoll > 15) ||
    (pointsDif > 54 && shotDiceRoll > 16) ||
    (pointsDif > 49 && shotDiceRoll > 17) ||
    (pointsDif > 42 && shotDiceRoll > 18) ||
    (pointsDif > 37 && shotDiceRoll > 19)
  );
}

export function mathShotPointsCloseToTheOtherRim(
  multiplier: number,
  shooter: PlayerStats,
): number {
  if (shooter.position === undefined) {
    console.error(
      "shooter.position not found in mathShotPointsCloseToTheOtherRim",
    );
    throw new Error(
      "Error: shooter.position not found in mathShotPointsCloseToTheOtherRim",
    );
  }

  const weightPoints = getWeightPoints(shooter.position, shooter.weight);
  const heightPoints = getHeightPoints(shooter.position, shooter.height);

  return (
    (shooter.perimeterScoring * 2 -
      heightPoints -
      weightPoints * 1.5 +
      roll20SidesDice() * 0.5) *
    multiplier
  );
}

export function mathChancesMakingShotInCloseToTheOtherRim(
  pointsDif: number,
  shotDiceRoll: number,
): boolean {
  return (
    (pointsDif > 98 && shotDiceRoll > 9) ||
    (pointsDif > 92 && shotDiceRoll > 10) ||
    (pointsDif > 89 && shotDiceRoll > 11) ||
    (pointsDif > 80 && shotDiceRoll > 12) ||
    (pointsDif > 76 && shotDiceRoll > 13) ||
    (pointsDif > 70 && shotDiceRoll > 14) ||
    (pointsDif > 65 && shotDiceRoll > 15) ||
    (pointsDif > 60 && shotDiceRoll > 16) ||
    (pointsDif > 54 && shotDiceRoll > 17) ||
    (pointsDif > 49 && shotDiceRoll > 18) ||
    (pointsDif > 42 && shotDiceRoll > 19)
  );
}

export function mathDefensePointsCloseToTheRim(
  multiplier: number,
  defender: PlayerStats,
): number {
  if (defender.position === undefined) {
    console.error(
      "defender.position not found in mathDefensePointsCloseToTheRim",
    );
    throw new Error(
      "Error: defender.position not found in mathDefensePointsCloseToTheRim",
    );
  }

  const insideDefence = defender.insideDefence;
  const atleticism = defender.atleticism;
  const weightPoints = getWeightPoints(defender.position, defender.weight);
  const heightPoints = getHeightPoints(defender.position, defender.height);

  return (
    (insideDefence * 4 +
      atleticism * 2 +
      weightPoints +
      heightPoints +
      roll20SidesDice() * 6) *
    multiplier
  );
}

export function mathDefensePointsInShortRange(
  multiplier: number,
  defender: PlayerStats,
): number {
  if (defender.position === undefined) {
    console.error(
      "defender.position not found in mathDefensePointsInShortRange",
    );
    throw new Error(
      "Error: defender.position not found in mathDefensePointsInShortRange",
    );
  }

  const weightPoints = getWeightPoints(defender.position, defender.weight);
  const heightPoints = getHeightPoints(defender.position, defender.height);

  return (
    (defender.insideDefence * 3 +
      defender.perimeterDefence * 0.5 +
      defender.atleticism * 2.5 +
      weightPoints * 0.5 +
      heightPoints +
      roll20SidesDice() * 5) *
    multiplier
  );
}

export function mathDefensePointsInMidRange(
  multiplier: number,
  defender: PlayerStats,
): number {
  if (defender.position === undefined) {
    console.error("defender.position not found in mathDefensePointsInMidRange");
    throw new Error(
      "Error: defender.position not found in mathDefensePointsInMidRange",
    );
  }

  const weightPoints = getWeightPoints(defender.position, defender.weight);
  const heightPoints = getHeightPoints(defender.position, defender.height);

  return (
    (defender.insideDefence +
      defender.perimeterDefence * 4 -
      weightPoints +
      heightPoints +
      roll20SidesDice() * 5) *
    multiplier
  );
}

export function mathDefensePointsCloseToThe3PointLine(
  multiplier: number,
  defender: PlayerStats,
): number {
  if (defender.position === undefined) {
    console.error(
      "defender.position not found in mathDefensePointsCloseToThe3PointLine",
    );
    throw new Error(
      "Error: defender.position not found in mathDefensePointsCloseToThe3PointLine",
    );
  }

  const weightPoints = getWeightPoints(defender.position, defender.weight);
  const heightPoints = getHeightPoints(defender.position, defender.height);

  return (
    (defender.perimeterDefence * 5 -
      weightPoints +
      heightPoints +
      roll20SidesDice() * 4) *
    multiplier
  );
}

export function mathDefensePointsLong3Range(
  multiplier: number,
  defender: PlayerStats,
): number {
  if (defender.position === undefined) {
    console.error("defender.position not found in mathDefensePointsLong3Range");
    throw new Error(
      "Error: defender.position not found in mathDefensePointsLong3Range",
    );
  }

  const weightPoints = getWeightPoints(defender.position, defender.weight);
  const heightPoints = getHeightPoints(defender.position, defender.height);

  return (
    (defender.perimeterDefence * 5 -
      weightPoints * 0.5 +
      heightPoints +
      roll20SidesDice() * 4) *
    multiplier
  );
}

export function mathDefensePointsHalfCourtAndFartherAway(
  multiplier: number,
  defender: PlayerStats,
): number {
  if (defender.position === undefined) {
    console.error(
      "defender.position not found in mathDefensePointsHalfCourtAndFartherAway",
    );
    throw new Error(
      "Error: defender.position not found in mathDefensePointsHalfCourtAndFartherAway",
    );
  }

  const heightPoints = getHeightPoints(defender.position, defender.height);

  return (
    (defender.perimeterDefence * 5 + heightPoints + roll20SidesDice() * 4) *
    multiplier
  );
}

export function playerZoneId(player: Player, teamAAtacking: boolean): number {
  if (isCloseToTheRim(teamAAtacking, [player.ubicationX, player.ubicationY])) {
    return ranges.closeToTheRim.id;
  } else if (
    isBehindTheBoard(teamAAtacking, [player.ubicationX, player.ubicationY])
  ) {
    return ranges.behindTheBoard.id;
  } else if (
    isInShortRange(teamAAtacking, [player.ubicationX, player.ubicationY])
  ) {
    return ranges.inShortRange.id;
  } else if (
    isInMidRange(teamAAtacking, [player.ubicationX, player.ubicationY])
  ) {
    return ranges.inMidRange.id;
  } else if (
    isCloseToThe3PointLine(teamAAtacking, [
      player.ubicationX,
      player.ubicationY,
    ])
  ) {
    return ranges.outsideThe3PointLine.id;
  } else if (
    isInLong3Range(teamAAtacking, [player.ubicationX, player.ubicationY])
  ) {
    return ranges.long3Range.id;
  } else if (
    isCloseToHalfCourt(teamAAtacking, [player.ubicationX, player.ubicationY])
  ) {
    return ranges.halfCourt.id;
  } else if (
    isBehindTheHalfCourt(teamAAtacking, [player.ubicationX, player.ubicationY])
  ) {
    return ranges.behindHalfCourt.id;
  } else if (
    isIntheOtherRim(teamAAtacking, [player.ubicationX, player.ubicationY])
  ) {
    return ranges.theOtherRim.id;
  } else {
    throw new Error("Error: Player zone not found in playerZone");
  }
}

export function compareIniciatives(
  playerA: Player,
  playerB: Player,
  isTeamAAtacking: Player | undefined,
): Player {
  let defender = !!isTeamAAtacking ? playerB : playerA;
  let atacker = !!isTeamAAtacking ? playerA : playerB;

  let defenderIniciative = 0;
  let atackerInisiative = 0;

  let compareIniciatives = 0;

  function calculationIfDefensorIsCloseToTheRim() {
    return (
      roll20SidesDice() * 2 +
      (defender.height - 165) / 0.65 +
      (defender.weight - 65) / 0.55 +
      defender.atleticism * 1.2 +
      defender.insideDefence * 2
    );
  }

  function calculationIfDefenderIsInShortRange() {
    return (
      roll20SidesDice() * 2 +
      ((defender.height - 165) / 0.65) * 0.75 +
      ((defender.weight - 65) / 0.55) * 0.75 +
      defender.atleticism * 1.2 +
      defender.insideDefence * 2 * 0.75 +
      defender.perimeterDefence * 2 * 0.25
    );
  }

  function calculationIfDefenderIsInMidRange() {
    return (
      roll20SidesDice() * 2 +
      ((defender.height - 165) / 0.65) * 0.25 +
      ((defender.weight - 65) / 0.55) * 0.25 +
      defender.atleticism * 1.2 +
      defender.insideDefence * 2 * 0.25 +
      defender.perimeterDefence * 2 * 0.75
    );
  }

  function calculationIfDefenderIsOutsideThe3PointLine() {
    return (
      roll20SidesDice() * 2 +
      defender.atleticism * 1.2 +
      defender.perimeterDefence * 2 * 2
    );
  }

  function calculationIfAtackerIsCloseToTheRim() {
    return (
      roll20SidesDice() * 2 +
      (atacker.height - 165) / 0.65 +
      (atacker.weight - 65) / 0.55 +
      atacker.atleticism * 1.2 +
      atacker.insideScoring +
      atacker.playMaking
    );
  }

  function calculationIfAtackerIsInShortRange() {
    return (
      roll20SidesDice() * 2 +
      ((atacker.height - 165) / 0.65) * 0.75 +
      ((atacker.weight - 65) / 0.55) * 0.75 +
      atacker.atleticism * 1.2 +
      atacker.insideScoring * 0.75 +
      atacker.perimeterScoring * 0.25 +
      atacker.playMaking
    );
  }

  function calculationIfAtackerIsInMidRange() {
    return (
      roll20SidesDice() * 2 +
      ((atacker.height - 165) / 0.65) * 0.25 +
      ((atacker.weight - 65) / 0.55) * 0.25 +
      atacker.atleticism * 1.2 +
      atacker.insideScoring * 0.25 +
      atacker.perimeterScoring * 0.75 +
      atacker.playMaking
    );
  }

  function calculationIfAtackerIsOutsideThe3PointLine() {
    return (
      roll20SidesDice() * 2 +
      atacker.atleticism * 1.2 +
      atacker.perimeterScoring * 2 * 2 +
      atacker.playMaking
    );
  }

  while (compareIniciatives == 0) {
    if (!isTeamAAtacking) {
      //If the player is close to the rim
      if (playerZoneId(defender, !isTeamAAtacking) == ranges.closeToTheRim.id) {
        defenderIniciative = calculationIfDefensorIsCloseToTheRim();
      }
      //If the player is in short range
      else if (
        playerZoneId(defender, !isTeamAAtacking) == ranges.inShortRange.id ||
        playerZoneId(defender, !isTeamAAtacking) == ranges.behindTheBoard.id
      ) {
        defenderIniciative = calculationIfDefenderIsInShortRange();
      }
      //If the player is in mid range
      else if (
        playerZoneId(defender, !isTeamAAtacking) == ranges.inMidRange.id
      ) {
        defenderIniciative = calculationIfDefenderIsInMidRange();
      }
      //If he is outside 3 point range or farther away
      else if (
        playerZoneId(defender, !isTeamAAtacking) >=
        ranges.outsideThe3PointLine.id
      ) {
        defenderIniciative = calculationIfDefenderIsOutsideThe3PointLine();
      }

      //If the player is close to the rim
      if (playerZoneId(atacker, !isTeamAAtacking) == ranges.closeToTheRim.id) {
        atackerInisiative = calculationIfAtackerIsCloseToTheRim();
      }
      //If the player is in short range
      else if (
        playerZoneId(atacker, !isTeamAAtacking) == ranges.inShortRange.id ||
        playerZoneId(atacker, !isTeamAAtacking) == ranges.behindTheBoard.id
      ) {
        atackerInisiative = calculationIfAtackerIsInShortRange();
      }
      //If the player is in mid range
      else if (
        playerZoneId(atacker, !isTeamAAtacking) == ranges.inMidRange.id
      ) {
        atackerInisiative = calculationIfAtackerIsInMidRange();
      }
      //If he is outside 3 point range or farther away
      else if (
        playerZoneId(atacker, !isTeamAAtacking) >=
        ranges.outsideThe3PointLine.id
      ) {
        atackerInisiative = calculationIfAtackerIsOutsideThe3PointLine();
      }

      //If team B is defending
    } else if (isTeamAAtacking) {
      //If the player is close to the rim
      if (
        playerZoneId(defender, isTeamAAtacking !== undefined) ==
        ranges.closeToTheRim.id
      ) {
        defenderIniciative = calculationIfDefensorIsCloseToTheRim();
      }
      //If the player is in short range
      else if (
        playerZoneId(defender, isTeamAAtacking !== undefined) ==
          ranges.inShortRange.id ||
        playerZoneId(defender, isTeamAAtacking !== undefined) ==
          ranges.behindTheBoard.id
      ) {
        defenderIniciative = calculationIfAtackerIsInShortRange();
      }
      //If the player is in mid range
      else if (
        playerZoneId(defender, isTeamAAtacking !== undefined) ==
        ranges.inMidRange.id
      ) {
        defenderIniciative = calculationIfAtackerIsInMidRange();
      }
      //If he is outside 3 point range or farther away
      else if (
        playerZoneId(defender, isTeamAAtacking !== undefined) >=
        ranges.outsideThe3PointLine.id
      ) {
        defenderIniciative = calculationIfDefenderIsOutsideThe3PointLine();
      }

      //If the player is close to the rim
      if (playerZoneId(atacker, !isTeamAAtacking) == ranges.closeToTheRim.id) {
        atackerInisiative = calculationIfAtackerIsCloseToTheRim();
      }
      //If the player is in short range
      else if (
        playerZoneId(atacker, !isTeamAAtacking) == ranges.inShortRange.id ||
        playerZoneId(atacker, !isTeamAAtacking) == ranges.behindTheBoard.id
      ) {
        atackerInisiative = calculationIfAtackerIsInShortRange();
      }
      //If the player is in mid range
      else if (
        playerZoneId(atacker, !isTeamAAtacking) == ranges.inMidRange.id
      ) {
        atackerInisiative = calculationIfAtackerIsInMidRange();
      }
      //If he is outside 3 point range or farther away
      else if (
        playerZoneId(atacker, !isTeamAAtacking) >=
        ranges.outsideThe3PointLine.id
      ) {
        atackerInisiative = calculationIfAtackerIsOutsideThe3PointLine();
      }
    }

    //Compare iniciatives
    compareIniciatives = defenderIniciative - atackerInisiative;
    // compareIniciatives = 1;
  }

  if (compareIniciatives > 0) {
    return defender;
  } else {
    return atacker;
  }
}

export function checkTilesThatWillInfluenceInTheCalculations(
  gameboard: number[][],
  startingUbication: number[],
  endingUbication: number[],
): any[][] {
  const [width, height] = [gameboard[0].length, gameboard.length];

  const x1 = startingUbication[0];
  const y1 = startingUbication[1];

  const x2 = endingUbication[0];
  const y2 = endingUbication[1];

  let dx = x2 - x1;
  let dy = y2 - y1;

  let steps = Math.max(Math.abs(dx), Math.abs(dy));

  let xIncrement = dx / steps;
  let yIncrement = dy / steps;

  let ballGoesOverThisPositions = [] as any[] | [number[]];
  let ballGoesCloseToThisPositions = [] as any[] | [number[]];

  for (let i = 0; i <= steps; i++) {
    let x = Math.round(x1 + i * xIncrement);
    let y = Math.round(y1 + i * yIncrement);

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
  return [
    ballGoesOverThisPositions,
    //Delete repeated values
    [...new Set(ballGoesCloseToThisPositions)],
  ];
}

export function getDistanceToAPoint(
  coordinate: Coordinate,
  targetPoint: Coordinate,
): number {
  return (
    Math.abs(coordinate[0] - targetPoint[0]) +
    Math.abs(coordinate[1] - targetPoint[1])
  );
}

export function findNearestPlayerToPoint(
  players: Player[],
  targetPoint: Coordinate,
): Player {
  if (players.length === 0) {
    console.error("Players length is 0 in findNearestPlayerToPoint");
    throw new Error("Error: Players length is 0 in findNearestPlayerToPoint");
  }

  let closestPlayer: Player | undefined;
  let minDistance = Infinity;

  for (const player of players) {
    const distance = getDistanceToAPoint(
      [player.ubicationX, player.ubicationY],
      targetPoint,
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestPlayer = player;
    }
  }

  if (!!!closestPlayer) {
    console.error(
      "Couldn't find the closest player to the designed target point",
    );
    throw new Error(
      "Error: Couldn't find the closest player to the designed target point",
    );
  }

  return closestPlayer;
}

export function getDistanceToRim(player: Player): number {
  let distanceToRim: number;
  let dXToRim = getShotDistance(player, "X");
  let dYToRim = getShotDistance(player, "Y");

  if (dXToRim && dYToRim) {
    distanceToRim = Math.sqrt(Math.pow(dXToRim, 2) + Math.pow(dYToRim, 2));

    return distanceToRim;
  } else {
    console.error("dXToRim or dYToRim not found in getDistanceToRim");
    throw new Error("Error: dXToRim or dYToRim not found in getDistanceToRim");
  }
}

export function getShotDistance(player: Player, direction: string): number {
  //This function get the distance to the rim in given axis (direction)
  let shotDistance: number | undefined;

  if (direction == "Y") {
    if (player.ubicationY == 8) {
      shotDistance = 0;
    } else if (player.ubicationY < 8) {
      shotDistance = 8 - player.ubicationY;
    } else {
      shotDistance = player.ubicationY - 8;
    }
  }

  if (!shotDistance) {
    if (player.team == "TeamA") {
      if (direction == "X") {
        if (player.ubicationX == 1) {
          shotDistance = 1;
        } else {
          shotDistance = player.ubicationX - 1;
        }
      }
    } else {
      if (direction == "X") {
        if (player.ubicationX == 28) {
          shotDistance = 1;
        } else {
          shotDistance = 27 - player.ubicationX;
        }
      }
    }
  }

  if (shotDistance === undefined) {
    console.error("shotDistance not found in getShotDistance");
    throw new Error("Error: shotDistance not found in getShotDistance");
  }

  return shotDistance;
}

export function getWhereItReboundsTo(
  shotDirectionY: string,
  reboundDirectionY: string,
  shotDistanceY: number,
  shotDistanceX: number,
  teamAAtacking: boolean,
): Coordinate {
  let reboundLandingX: number;
  let reboundLandingY: number;

  let rollDiceY = roll20SidesDice();
  let rollDiceX = roll20SidesDice();

  let rollDiceMultiplierY = rollDiceY > 6 ? 1 : rollDiceY > 13 ? 0.5 : 0.25;
  let rollDiceMultiplierX = rollDiceX > 6 ? 1 : rollDiceX > 13 ? 0.5 : 0.25;

  if (reboundDirectionY == "middle") {
    reboundLandingY = 8;
  }

  if (shotDirectionY == reboundDirectionY) {
    if (reboundDirectionY == "top") {
      reboundLandingY = Math.round(
        8 - (shotDistanceY + shotDistanceX) / (2 * rollDiceMultiplierY),
      );
    } else {
      reboundLandingY = Math.round(
        (shotDistanceY + shotDistanceX) / (2 * rollDiceMultiplierY) - 8,
      );
    }
  } else {
    if (reboundDirectionY == "top") {
      reboundLandingY = Math.round(
        8 - (shotDistanceY + shotDistanceX) / rollDiceMultiplierY,
      );
    } else {
      reboundLandingY = Math.round(
        (shotDistanceY + shotDistanceX) / rollDiceMultiplierY - 8,
      );
    }
  }

  if (teamAAtacking) {
    reboundLandingX = Math.round(27 - shotDistanceX * rollDiceMultiplierX);
  } else {
    reboundLandingX = Math.round(2 + shotDistanceX * rollDiceMultiplierX);
  }

  return [reboundLandingX, reboundLandingY];
}

function getReboundCandidates(
  allPlayers: Player[],
  whereItReboundsTo: Coordinate,
): Player[] {
  //Add distance atribute
  const playersWithDistance = allPlayers.map((player) => ({
    player,
    distance: getDistanceToAPoint(
      [player.ubicationX, player.ubicationY],
      whereItReboundsTo,
    ),
  }));

  //Get the closest player to where it rebounds
  const minDistance = Math.min(
    ...playersWithDistance.map((player) => player.distance),
  );

  //Discard players that are farther than 3 from the closest player
  return playersWithDistance
    .filter((player) => player.distance <= minDistance + 3)
    .map((player) => player.player);
}

function getNearbyPlayers(
  playerToCheck: Player,
  allPlayers: Player[],
): Player[] {
  return allPlayers.filter((player) => {
    //Avoid duplicate player
    if (player === playerToCheck) {
      return false;
    }

    const distance = getDistanceToAPoint(
      [player.ubicationX, player.ubicationY],
      [playerToCheck.ubicationX, playerToCheck.ubicationY],
    );

    return distance < 2;
  });
}

function getReboundScore(
  player: Player,
  allPlayers: Player[],
  whereItReboundsTo: Coordinate,
): number {
  const distance = getDistanceToAPoint(
    [player.ubicationX, player.ubicationY],
    whereItReboundsTo,
  );

  const nearbyPlayers = getNearbyPlayers(player, allPlayers);

  const teammates = nearbyPlayers.filter(
    (nearbyPlayer) => nearbyPlayer.team === player.team,
  );

  const opponents = nearbyPlayers.filter(
    (nearbyPlayer) => nearbyPlayer.team !== player.team,
  );

  let sixSidedDiceRoll = roll6SidesDice();

  let reboundScore = 0;

  if (distance <= 1) {
    reboundScore =
      (player.rebounding * 3 + player.weight + player.height * 2) *
        sixSidedDiceRoll +
      teammates.length * 5 -
      (distance + opponents.length * 5);
  } else if (distance <= 3) {
    reboundScore =
      (player.rebounding * 2 + player.weight * 0.5 + player.height) *
        sixSidedDiceRoll +
      teammates.length * 5 -
      (distance * 2 + opponents.length * 5.5);
  } else if (distance <= 5) {
    reboundScore =
      (player.rebounding + player.height) * sixSidedDiceRoll +
      teammates.length * 5 -
      (player.weight + distance * 7 + opponents.length * 6);
  } else {
    reboundScore =
      player.rebounding * 0.7 * sixSidedDiceRoll +
      teammates.length * 5 -
      (player.weight * 2 + distance * 15 + opponents.length * 9);
  }

  return reboundScore;
}

export function calculateRebounder(
  allPlayers: Player[],
  whereItReboundsTo: Coordinate,
): Player {
  const candidates = getReboundCandidates(allPlayers, whereItReboundsTo);

  let highestScore = -Infinity;
  let rebounder: Player | undefined;

  candidates.forEach((player) => {
    const score = getReboundScore(player, candidates, whereItReboundsTo);

    if (score > highestScore) {
      highestScore = score;
      rebounder = player;
    }
  });

  if (!rebounder) {
    throw new Error("Error: Rebounder not found in calculateRebounder.");
  }

  return rebounder;
}

export const boardYDimentions = 15;
export const boardXDimentions = 28;

export const teamAOffensiveFTPositions = [
  [22, 8],
  [20, 5],
  [20, 11],
  [25, 5],
  [25, 11],
];

export const teamADefensiveFTPositions = [
  [9, 4],
  [9, 12],
  [5, 5],
  [3, 5],
  [3, 11],
];

export const teamBOffensiveFTPositions = [
  [7, 8],
  [9, 5],
  [9, 11],
  [4, 5],
  [4, 11],
];

export const teamBDefensiveFTPositions = [
  [20, 4],
  [20, 12],
  [24, 5],
  [26, 5],
  [26, 11],
];

export const teamAInitialPositions = [
  [13, 1],
  [13, 5],
  [13, 9],
  [13, 14],
  [14, 8],
];

export const teamBInitialPositions = [
  [16, 2],
  [16, 6],
  [16, 10],
  [16, 15],
  [15, 8],
];

export function getInitialBoard(teamShootingFT?: string): number[][] {
  function getBoardFormatInitialTeamUbication(
    teamInitialPositions: number[][],
  ): number[][] {
    return teamInitialPositions.map((playerInitialPosition) => [
      playerInitialPosition[1] - 1,
      playerInitialPosition[0] - 1,
    ]);
  }

  const properTeamAInitialPositions =
    teamShootingFT == "A"
      ? teamAOffensiveFTPositions
      : teamShootingFT == "B"
        ? teamADefensiveFTPositions
        : teamAInitialPositions;

  const properTeamBInitialPositions =
    teamShootingFT == "B"
      ? teamBOffensiveFTPositions
      : teamShootingFT == "A"
        ? teamBDefensiveFTPositions
        : teamBInitialPositions;

  const allAPlayersUbication = getBoardFormatInitialTeamUbication(
    properTeamAInitialPositions,
  );

  const allBPlayersUbication = getBoardFormatInitialTeamUbication(
    properTeamBInitialPositions,
  );

  const initialBoard = [] as number[][];

  function isPlayerOnThisUbication(
    playersUbication: number[][],
    y: number,
    x: number,
  ): boolean {
    return !!playersUbication.find(
      (playerUbication) => playerUbication[0] === y && playerUbication[1] === x,
    );
  }

  for (let i = 0; i < boardYDimentions; i++) {
    const row = [] as number[];
    for (let u = 0; u < boardXDimentions; u++) {
      if (isPlayerOnThisUbication(allAPlayersUbication, i, u)) {
        row.push(1);
      } else if (isPlayerOnThisUbication(allBPlayersUbication, i, u)) {
        row.push(2);
      } else {
        row.push(0);
      }
    }
    initialBoard.push(row);
  }

  return initialBoard;
}

export function isRivalNearby(
  gameboard: number[][],
  player: Player,
  mustBeNext = false,
): boolean {
  const x = player.ubicationX - 1;
  const y = player.ubicationY - 1;

  const rivalTeamNumber = player.team === "TeamA" ? 2 : 1;

  let dx = mustBeNext ? 1 : 2;
  let dy = mustBeNext ? 1 : 2;

  let finalValue = false;

  for (let i = dx * -1; i <= dx; i++) {
    for (let j = dy * -1; j <= dy; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      const newX = x + j;
      const newY = y + i;

      if (
        newX >= 0 &&
        newX < gameboard[0].length &&
        newY >= 0 &&
        newY < gameboard.length
      ) {
        if (gameboard[newY][newX] === rivalTeamNumber) {
          finalValue = true;
          //If it found return true, if not it will continue checking the rest of the tiles
          return finalValue;
        }
      }
    }
  }

  //If it didn't find any rival nearby, return false
  return finalValue;
}

export const initialGameBoard = getInitialBoard();
