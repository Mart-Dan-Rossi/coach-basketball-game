import { getDistanceToRim } from "../utilities/exportableFunctions";
import { Coordinate } from "./myInterfaces";
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
    totalFouls: number;
    foulsInQuarter: number;
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
      totalFouls: 0,
      foulsInQuarter: 0,
    };
  }

  //--------------------------------------START GET INFO METHODS------------------------------------------------------------------------------------------------------------

  doesPlayersHaveMovement(): boolean {
    let movementRemaining = false;
    this.players.forEach((player) => {
      !movementRemaining && (movementRemaining = player.movementLeft);
    });
    return movementRemaining;
  }

  getPlayerWithBall(): Player | undefined {
    return this.players.find((player) => player.playerHaveTheBall());
  }

  isAnyPlayerSelected(): boolean {
    return this.players.find((player) => player.playerSelected) !== undefined;
  }

  getShooter(): Player | undefined {
    return this.players.find(
      (player) => player.shotAttempt,
      // || player.lastAction == "shotAttempt",
    );
  }

  getClosestDefenderToTheRim(): Player | undefined {
    let closestPlayer: Player | undefined;
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

    return closestPlayer;
  }

  getSelectedPlayer(): Player | undefined {
    return this.players.find((player) => player.playerSelected);
  }

  isAPlayerActive(): boolean {
    return this.players.find((player) => player.playerActive) !== undefined;
  }

  returnActivePlayer(): Player | undefined {
    return this.players.find((player) => player.playerActive);
  }

  returnSelectedPlayer(): Player | undefined {
    return this.players.find((player) => player.playerSelected);
  }

  returnPlayerInThisPosition(coordinate: Coordinate): Player | undefined {
    //IMPORTANT First i check if that ubication is inside the board
    if (
      coordinate[0] < 0 &&
      coordinate[0] > 29 &&
      coordinate[1] < 0 &&
      coordinate[1] > 16
    ) {
      return;
    }

    return this.players.find(
      (player) =>
        player.ubicationX === coordinate[0] &&
        player.ubicationY === coordinate[1],
    );
  }

  returnPlayerWithBall(): Player | undefined {
    return this.players.find((player) => player.haveBall);
  }

  playerOnThisTileHaveTurnLeft(ubicationScaned: number[]): boolean {
    const playerOnThisTile = this.players.find(
      (player) =>
        player.ubicationX === ubicationScaned[0] &&
        player.ubicationY === ubicationScaned[1],
    );
    return !!playerOnThisTile && playerOnThisTile.playerHaveTurn;
  }

  //---------------------------------------END GET INFO METHODS-------------------------------------------------------------------------------------------------------------

  //---------------------------------START SET PLAYER STATUS METHODS--------------------------------------------------------------------------------------------------------

  setTeamTurn(value: boolean): void {
    this.teamTurn = value;
  }

  setTeamTurnLeft(value: boolean): void {
    this.teamTurnLeft = value;
  }

  setTurnInInstantLeft(value: boolean): void {
    this.turnInInstantLeft = value;
  }

  changeLastPasserStatus(passer: Player): void {
    this.players.forEach((player) => {
      if (player === passer) {
        player.lastPasser = true;
      } else {
        player.lastPasser = false;
      }
    });
  }

  resetLastPasserForAllPlayers(): void {
    this.players.forEach((player) => {
      player.lastPasser = false;
    });
  }

  //----------------------------------END SET PLAYER STATUS METHODS---------------------------------------------------------------------------------------------------------

  //---------------------------------------START STATS METHODS--------------------------------------------------------------------------------------------------------------

  statsAddShotAttempt(
    pointsIfMade: number,
    isItMade: boolean,
    isItAnAssist: boolean,
    wasThereAFoul: boolean,
  ): void {
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

  statsAddRebound(shootingTeam: Team): void {
    if (shootingTeam.name == this.name) {
      this.stats.offensiveRebounds++;
    } else {
      this.stats.rebounds++;
    }
  }

  statsAddFoul(): void {
    this.stats.totalFouls++;
    this.stats.foulsInQuarter++;
  }

  statsAddTurnOver(): void {
    this.stats.turnOvers++;
  }

  statsAddBlock(): void {
    this.stats.blocks++;
  }

  statsAddSteal(): void {
    this.stats.steals++;
  }

  teamHaveTheBall(): boolean {
    return (
      this.players.find((player) => player.playerHaveTheBall()) !== undefined
    );
  }

  giveActionPointsToTeam(): void {
    this.players.forEach((player) => {
      player.giveActionPointsToPlayer();
    });
  }

  giveMovementLeftToAllPlayers(): void {
    this.players.forEach((player) => {
      player.setMovementLeft(true);
    });
  }

  givePlayerHaveTurnToAllPlayers(): void {
    this.players.forEach((player) => {
      player.setPlayerHaveTurn(true);
    });
  }

  //----------------------------------END SET PLAYER STATUS METHODS---------------------------------------------------------------------------------------------------------
}
