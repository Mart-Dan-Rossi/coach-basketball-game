import { getDistanceToRim } from "../utilities/exportableFunctions";
import { Player } from "./players";

export class Team {
  name: "TeamA" | "TeamB";
  players: Player[];

  //Team status
  teamTurn: boolean;
  teamTurnLeft: boolean;
  turnInInstantLeft: boolean;

  //Team stats
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

  constructor(name: "TeamA" | "TeamB", players: Player[]) {
    this.name = name;
    this.players = players;
    this.players.forEach((player: Player) => {
      player.team = this.name;
    });

    //Team status
    this.teamTurn = false;
    this.teamTurnLeft = true;
    this.turnInInstantLeft = true;

    //Team stats
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

  //--------------------------------------START GET INFO METHODS------------------------------------------------------------------------------------------------------------

  doesPlayersHaveMovement() {
    let movementRemaining = false;
    this.players.forEach((player) => {
      !movementRemaining && (movementRemaining = player.movementLeft);
    });
    return movementRemaining;
  }

  getPlayerWithBallOrUndefined() {
    return this.players.find((player) => player.playerHaveTheBall());
  }

  isAnyPlayerSelected() {
    return this.players.find((player) => player.playerSelected) !== undefined;
  }

  getShooter() {
    return this.players.find((player) => player.shotAttempt);
  }

  getClosestDefenderToTheRim() {
    let closestPlayer: Player;
    let distanceToRim: number;
    this.players.forEach((player) => {
      if (!closestPlayer) {
        closestPlayer = player;

        distanceToRim = getDistanceToRim(player);
      } else {
        let playerDistanceToRim = getDistanceToRim(player);

        if (distanceToRim > playerDistanceToRim) {
          closestPlayer = player;
          distanceToRim = playerDistanceToRim;
        } else if (distanceToRim == playerDistanceToRim) {
          if (closestPlayer.atleticism < player.atleticism) {
            closestPlayer = player;
          }
        }
      }
    });

    return closestPlayer!;
  }

  getSelectedPlayer() {
    return this.players.find((player) => player.playerSelected);
  }

  isAPlayerActive() {
    return this.players.find((player) => player.playerActive) !== undefined;
  }

  returnActivePlayer() {
    return this.players.find((player) => player.playerActive);
  }

  returnSelectedPlayer() {
    return this.players.find((player) => player.playerSelected);
  }

  returnPlayerInThisPosition(positionX: number, positionY: number) {
    //IMPORTANT First i check if that ubication is inside the board
    if (positionX > 0 && positionX < 29 && positionY > 0 && positionY < 16) {
      return;
    }

    return this.players.find(
      (player) =>
        player.ubicationX === positionX && player.ubicationY === positionY
    );
  }

  returnPlayerWithBall() {
    return this.players.find((player) => player.haveBall);
  }

  playerOnThisTileHaveTurnLeft(ubicationScaned: number[]) {
    return (
      this.players.find(
        (player) =>
          player.ubicationX === ubicationScaned[0] &&
          player.ubicationY === ubicationScaned[1]
      ) !== undefined
    );
  }

  //---------------------------------------END GET INFO METHODS-------------------------------------------------------------------------------------------------------------

  //---------------------------------START SET PLAYER STATUS METHODS--------------------------------------------------------------------------------------------------------

  setTeamTurn(value: boolean) {
    this.teamTurn = value;
  }

  setTeamTurnLeft(value: boolean) {
    this.teamTurnLeft = value;
  }

  setTurnInInstantLeft(value: boolean) {
    this.turnInInstantLeft = value;
  }

  //----------------------------------END SET PLAYER STATUS METHODS---------------------------------------------------------------------------------------------------------

  //---------------------------------------START STATS METHODS--------------------------------------------------------------------------------------------------------------

  statsAddShotAttempt(
    pointsIfMade: number,
    isItMade: boolean,
    isItAnAssist: boolean,
    wasThereAFoul: boolean
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

        if (isItAnAssist) {
          this.stats.assists++;
        }
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

        if (isItAnAssist) {
          this.stats.assists++;
        }
      } else if (wasThereAFoul && !isItMade) {
        this.stats.fieldGoalsattempt--;
        this.stats.triplesAttempt--;
      }
    }
  }

  statsAddRebound(shootingTeam: Team) {
    if (shootingTeam.name == this.name) {
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

  teamHaveTheBall() {
    return (
      this.players.find((player) => player.playerHaveTheBall()) !== undefined
    );
  }

  giveActionPointsToTeam() {
    this.players.forEach((player) => {
      player.giveActionPointsToPlayer();
    });
  }

  giveMovementLeftToAllPlayers() {
    this.players.forEach((player) => {
      player.setMovementLeft(true);
    });
  }

  givePlayerHaveTurnToAllPlayers() {
    this.players.forEach((player) => {
      player.setPlayerHaveTurn(true);
    });
  }

  //----------------------------------END SET PLAYER STATUS METHODS---------------------------------------------------------------------------------------------------------
}
