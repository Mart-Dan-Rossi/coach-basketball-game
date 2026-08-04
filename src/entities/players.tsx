import {
  getMaxStatPerPosition,
  getMinStatPerPosition,
  playerZoneId,
  teamARimUbication,
  teamBRimUbication,
} from "../utilities/exportableFunctions";
import { Team } from "./team";
export class Player {
  //Info
  name: string;
  team: "TeamA" | "TeamB";
  position: string;

  //Fisicality
  height: number;
  weight: number;
  atleticism: number;

  //Defensive atributes
  perimeterDefence: number;
  insideDefence: number;

  //Mix atribute
  rebounding: number;

  //Ofensive atributes
  perimeterScoring: number;
  insideScoring: number;
  playMaking: number;

  //Player status
  ubicationX: number;
  ubicationY: number;
  haveBall: boolean;
  movementLeft: boolean;
  lastAction: string;
  lastPasser: boolean;
  actionPoints: number;
  playerSelected: boolean;
  playerActive: boolean;
  playerHaveTurn: boolean;
  shotAttempt: boolean;

  //Player stats
  stats: {
    points: number;
    fieldGoalsMade: number;
    fieldGoalsattempt: number;
    triplesMade: number;
    triplesAttempt: number;
    freeThrowsMade: number;
    freeThrowsAttempt: number;
    assists: number;
    turnOvers: number;
    rebounds: number;
    offensiveRebounds: number;
    blocks: number;
    steals: number;
    fouls: number;
  };

  constructor(
    name: string,
    team: "TeamA" | "TeamB",
    position: string,
    height: number,
    weight: number,
    atleticism: number,
    perimeterDefence: number,
    insideDefence: number,
    rebounding: number,
    perimeterScoring: number,
    insideScoring: number,
    playMaking: number,
    ubicationX: number,
    ubicationY: number,
  ) {
    //Info
    this.name = name;
    this.team = team;
    this.position = position;

    //Fisicality
    this.height = height;
    this.weight = weight;
    this.atleticism = atleticism;

    //Defensive atributes
    this.perimeterDefence = perimeterDefence;
    this.insideDefence = insideDefence;

    //Mix atribute
    this.rebounding = rebounding;

    //Ofensive atributes
    this.perimeterScoring = perimeterScoring;
    this.insideScoring = insideScoring;
    this.playMaking = playMaking;

    //Player status
    this.ubicationX = ubicationX; /*X is the position in the width*/
    this.ubicationY = ubicationY; /*Y is position in the height*/
    this.haveBall = false;
    this.movementLeft = true;
    this.lastAction = "Haven't do anithing yet";
    this.lastPasser = false;
    this.actionPoints = 0;
    this.playerSelected = false;
    this.playerActive = false;
    this.playerHaveTurn = true;
    this.shotAttempt = false;

    //Player stats
    this.stats = {
      points: 0,
      fieldGoalsMade: 0,
      fieldGoalsattempt: 0,
      triplesMade: 0,
      triplesAttempt: 0,
      freeThrowsMade: 0,
      freeThrowsAttempt: 0,
      assists: 0,
      turnOvers: 0,
      rebounds: 0,
      offensiveRebounds: 0,
      blocks: 0,
      steals: 0,
      fouls: 0,
    };
  }

  //---------------------------------START GET INFO METHODS--------------------------------------------------------------------------------------------------------

  playerHaveTheBall() {
    return this.haveBall;
  }

  //----------------------------------END GET INFO METHODS---------------------------------------------------------------------------------------------------------

  //----------------------------------START STATS METHODS----------------------------------------------------------------------------------------------------------

  statsAddShotAttempt(
    pointsIfMade: number,
    isItMade: boolean,
    wasThereAFoul: boolean,
  ) {
    if (pointsIfMade == 1) {
      this.stats.freeThrowsAttempt++;

      if (isItMade) {
        this.stats.freeThrowsMade++;
        this.stats.points++;
      }
    } else if (pointsIfMade == 2) {
      this.stats.fieldGoalsattempt++;

      if (isItMade) {
        this.stats.fieldGoalsMade++;
        this.stats.points += 2;
      }

      if (wasThereAFoul && !isItMade) {
        this.stats.fieldGoalsattempt--;
      }
    } else if (pointsIfMade == 3) {
      this.stats.fieldGoalsattempt++;
      this.stats.triplesAttempt++;

      if (isItMade) {
        this.stats.fieldGoalsMade++;
        this.stats.triplesMade++;
        this.stats.points += 3;
      } else if (wasThereAFoul && !isItMade) {
        this.stats.fieldGoalsattempt--;
        this.stats.triplesAttempt--;
      }
    }
  }

  statsAddAssist() {
    this.stats.assists++;
  }

  statsAddRebound(atackingTeam: Team) {
    if (atackingTeam.name == this.team) {
      this.stats.offensiveRebounds++;
    } else {
      this.stats.rebounds++;
    }
  }

  statsAddFoul() {
    this.stats.fouls++;
  }

  statsAddTurnOver() {
    this.stats.turnOvers++;
  }

  statsAddBlock() {
    this.stats.blocks++;
  }

  statsAddSteal() {
    this.stats.steals++;
  }
  //-----------------------------------END STATS METHODS-----------------------------------------------------------------------------------------------------------

  //----------------------------START SET PLAYER STATUS METHODS----------------------------------------------------------------------------------------------------

  giveActionPointsToPlayer() {
    this.actionPoints = 0;
    let diceResult = 1;

    if (this.height <= 192) {
      this.actionPoints = 2;

      if (diceResult > 6) {
        this.actionPoints += 1;
      }
    } else if (this.height > 192 && this.height <= 208) {
      this.actionPoints = 2;

      if (diceResult > 10) {
        this.actionPoints += 1;
      }
    } else if (this.height > 208) {
      this.actionPoints = 1;

      if (diceResult > 3 && diceResult < 16) {
        this.actionPoints += 1;
      } else if (diceResult >= 16) {
        this.actionPoints += 2;
      }
    }
  }

  setPlayerHaveTurn(value: boolean) {
    this.playerHaveTurn = value;
  }

  setActivePlayer(value: boolean) {
    this.playerActive = value;
  }

  setPlayerSelected(value: boolean) {
    this.playerSelected = value;
  }

  setHaveBall(value: boolean) {
    this.haveBall = value;
  }

  setShotAttempt(value: boolean) {
    this.shotAttempt = value;
  }

  setMovementLeft(value: boolean) {
    this.movementLeft = value;
  }

  setLastAction(action: string) {
    this.lastAction = action;
  }

  //-----------------------------END SET PLAYER STATUS METHODS-----------------------------------------------------------------------------------------------------

  //----------------------------------START PLAYER ACTIONS---------------------------------------------------------------------------------------------------------

  movePlayer(dx: number, dy: number) {
    let actionPointsToDecrease =
      Math.pow(dx, 2) + Math.pow(dy, 2) == 2 ? 1.5 : 1;

    this.actionPoints -= actionPointsToDecrease;

    this.ubicationX += dx;
    this.ubicationY += dy;

    this.setLastAction("move");
  }

  handleWait(type: string) {
    switch (type) {
      case "tripleThreat":
        this.actionPoints -= 0.5;
        break;
      case "withCaution":
        this.actionPoints -= 0.5;
        break;
      case "withoutTheBall":
        this.actionPoints -= 1;
        break;
      case "overwhelmingWaiting":
        this.actionPoints -= 1;
        break;
    }

    this.setLastAction(type);
  }

  movePlayerToOwnRim(
    setGameBoard: React.Dispatch<React.SetStateAction<number[][]>>,
  ) {
    let previousUbicationX = this.ubicationX;
    let previousUbicationY = this.ubicationY;
    let teamNumber = this.team == "TeamA" ? 1 : 2;

    if (this.team == "TeamA") {
      this.ubicationX = teamARimUbication[0] - 1;
    } else {
      this.ubicationX = teamBRimUbication[0] + 1;
    }

    //Both rims are in the same Y position
    this.ubicationY = teamARimUbication[1];

    setGameBoard((gameboard) => {
      gameboard[previousUbicationY - 1][previousUbicationX - 1] = 0;
      gameboard[this.ubicationY - 1][this.ubicationX - 1] = teamNumber;
      return [...gameboard];
    });
  }

  subtractActionPoints(points: number) {
    this.actionPoints -= points;
  }

  resetActionPoints() {
    this.actionPoints = 0;
  }

  getDribblerPoints() {
    let dribblerPointsInAction: number;
    let teamAAtacking = this.team == "TeamA";
    let dribblerZoneId = playerZoneId(this, teamAAtacking);

    let multiplier = this.lastAction == "triple threat" ? 1.5 : 1;
    if (dribblerZoneId <= 2) {
      dribblerPointsInAction =
        (this.playMaking * 6 + this.atleticism * 2 + this.insideScoring * 2) *
        multiplier;
    } else {
      dribblerPointsInAction =
        (this.playMaking * 6 +
          this.atleticism * 2 +
          this.perimeterScoring * 2) *
        multiplier;
    }

    return dribblerPointsInAction;
  }

  getDribbleDefenderPoints() {
    let defenderPointsInAction: number;
    let teamAAtacking = this.team == "TeamA";
    let dribblerZoneId = playerZoneId(this, teamAAtacking);

    //Adjust dribblingStealConstant for defender for getting the balanced game
    let dribblingStealConstant = 0.1;

    let multiplier =
      dribblingStealConstant +
      (this.lastAction == "stealAttempt" ? 1 : 0) +
      (this.lastAction.toLowerCase() === "overwhelmingWaiting" ? 0.2 : 0);

    if (dribblerZoneId <= 2) {
      defenderPointsInAction =
        (this.insideDefence * 2 +
          this.perimeterDefence * 4 +
          this.atleticism * 2) *
        multiplier;
    } else {
      defenderPointsInAction =
        (this.perimeterDefence * 6 + this.atleticism * 2) * multiplier;
    }
    return defenderPointsInAction;
  }

  //-----------------------------------END PLAYER ACTIONS----------------------------------------------------------------------------------------------------------
}
