import React from "react";
import {
  calculateDefenderPointsInDribbling,
  calculateOffensivePlayerPoints,
  calculateRebounder,
  checkTilesThatWillInfluenceInTheCalculations,
  defensivePointsFoulInDribbling,
  findNearestPlayerToPoint,
  getClosestBorderToBall,
  getDefensivePlayersInDribblingAction,
  getInitialBoard,
  getMaxStatPerPosition,
  getNewTeamsPositions,
  getRangeText,
  getShotDistance,
  getWhereItReboundsTo,
  mathChancesMakingShotInBehindHalfCourt,
  mathChancesMakingShotInCloseToThe3PointLine,
  mathChancesMakingShotInCloseToTheOtherRim,
  mathChancesMakingShotInCloseToTheRim,
  mathChancesMakingShotInFreeThrow,
  mathChancesMakingShotInHalfCourt,
  mathChancesMakingShotInLong3Range,
  mathChancesMakingShotInMidRange,
  mathChancesMakingShotInShortRange,
  mathDefensePointsCloseToThe3PointLine,
  mathDefensePointsCloseToTheRim,
  mathDefensePointsHalfCourtAndFartherAway,
  mathDefensePointsInMidRange,
  mathDefensePointsInShortRange,
  mathDefensePointsLong3Range,
  mathShotPointsBehindHalfCourt,
  mathShotPointsCloseToThe3PointLine,
  mathShotPointsCloseToTheOtherRim,
  mathShotPointsCloseToTheRim,
  mathShotPointsInFreeThrow,
  mathShotPointsInHalfCourt,
  mathShotPointsInLong3Range,
  mathShotPointsInMidRange,
  mathShotPointsInShortRange,
  numberEntire,
  playerPositionDetection,
  playerZoneId,
  ranges,
  roll20SidesDice,
  teamADefensiveFTPositions,
  teamAOffensiveFTPositions,
  teamARimUbication,
  teamBDefensiveFTPositions,
  teamBOffensiveFTPositions,
  teamBRimUbication,
} from "../utilities/exportableFunctions";
import { Coordinate, QuarterTimeLeft } from "./myInterfaces";
import { Player } from "./players";
import { Team } from "./team";

export class Match {
  teamA: Team;
  teamB: Team;

  //Match status
  teamTurn: string;
  shotHasBeenAttempted: boolean;
  freeThrowsLeft: number;
  isFreeThrowSerie: boolean;
  isFirstFreeThrowInTheSerie: boolean;
  waitingPlayers: Player[] = [];
  secondsPassingFromOutbands: number;
  passingFromOutbands: boolean;

  //Match basic info
  quarter: number;
  timeLeft: QuarterTimeLeft;
  shotClock: number;
  turnOver: boolean;
  gameOver: boolean;

  constructor(teamA: Team, teamB: Team) {
    //Change validation
    // if(teams.length != 2) throw new Error(`Match can stast only with 2 teams. You have ${teams.length}`)
    this.teamA = teamA;
    this.teamB = teamB;

    //Match status
    this.teamTurn = "";
    this.shotHasBeenAttempted = false;
    this.freeThrowsLeft = 0;
    this.isFreeThrowSerie = false;
    this.isFirstFreeThrowInTheSerie = false;
    this.secondsPassingFromOutbands = 0;
    this.passingFromOutbands = false;

    //Match basic info
    this.quarter = 1;
    this.timeLeft = { minutes: 6, seconds: 0 };
    this.shotClock = 24;
    this.turnOver = false;
    this.gameOver = false;
  }

  //--------------------------------------START GET INFO METHODS------------------------------------------------------------------------------------------------------------

  getActivePlayer(): Player | undefined {
    return this.teamA.returnActivePlayer() ?? this.teamB.returnActivePlayer();
  }

  getShooter(): Player | undefined {
    return this.teamA.getShooter() ?? this.teamB.getShooter();
  }

  getSelectedPlayers(): (Player | undefined)[] {
    let teamASelectedPlayer: Player | undefined;
    let teamBSelectedPlayer: Player | undefined;

    this.teamA.isAnyPlayerSelected() &&
      (teamASelectedPlayer = this.teamA.getSelectedPlayer());
    this.teamB.isAnyPlayerSelected() &&
      (teamBSelectedPlayer = this.teamB.getSelectedPlayer());

    return [teamASelectedPlayer, teamBSelectedPlayer];
  }

  getClosestDefenderToTheRim(defendingTeam: Team): Player | undefined {
    return defendingTeam.getClosestDefenderToTheRim();
  }

  getRebounder(shooter: Player): Player {
    let rebounder: Player;

    let teamAAtacking = shooter.team == "TeamA";

    let shotDirectionY =
      shooter.ubicationY == 8
        ? "middle"
        : shooter.ubicationY < 8
          ? "top"
          : "bottom";

    let shotDistanceY = getShotDistance(shooter, "Y");
    let shotDistanceX = getShotDistance(shooter, "X");

    if (shotDistanceY === undefined || shotDistanceX === undefined) {
      console.error(
        "shotDistanceY or shotDistanceX were not found in getRebounder",
      );
      throw new Error(
        "Error: shotDistanceY or shotDistanceX were not found in getRebounder",
      );
    }

    let reboundDirectionY: string;

    let rollDice = roll20SidesDice();
    if (shotDirectionY == "middle") {
      reboundDirectionY =
        rollDice <= 5 ? "middle" : rollDice >= 13 ? "top" : "bottom";
    } else if (shotDirectionY == "top") {
      if (roll20SidesDice() > 7) {
        reboundDirectionY = "top";
      } else {
        reboundDirectionY = "bottom";
      }
    } else {
      if (roll20SidesDice() > 7) {
        reboundDirectionY = "bottom";
      } else {
        reboundDirectionY = "top";
      }
    }

    let whereItReboundsTo = getWhereItReboundsTo(
      shotDirectionY,
      reboundDirectionY,
      shotDistanceY,
      shotDistanceX,
      teamAAtacking,
    );

    rebounder = calculateRebounder(
      [...this.teamA.players, ...this.teamB.players],
      whereItReboundsTo,
    );

    if (!!!rebounder) {
      console.error(
        "calculateRebounder didn't return a player in getRebounder",
      );
      throw new Error(
        "Error: calculateRebounder didn't return a player in getRebounder",
      );
    }

    return rebounder;
  }

  addWaitingPlayersClose(isOnMove?: boolean): void {
    let activePlayer = this.getActivePlayer();
    let newWaitingPlayers = [] as Player[];

    if (activePlayer) {
      if (activePlayer.team == "TeamA") {
        this.searchForWaitingPlayersClose(this.teamB, !isOnMove);
      } else if (activePlayer.team == "TeamB") {
        this.searchForWaitingPlayersClose(this.teamA, !isOnMove);
      }

      this.waitingPlayers.push(...newWaitingPlayers);
    } else {
      console.error("activePlayer not found in addWaitingPlayersClose");
      throw new Error(
        "Error: activePlayer not found in addWaitingPlayersClose",
      );
    }
  }

  searchForWaitingPlayersClose(
    opositeTeam: Team,
    shouldSetTeamTurn?: boolean,
  ): void {
    let activePlayer = this.getActivePlayer();
    let selectedPlayers = this.getSelectedPlayers();
    let previousWaitingPlayers = [...this.waitingPlayers];
    let newWaitingPlayers = [] as Player[];

    if (activePlayer) {
      for (let i = -2; i < 3; i++) {
        for (let j = -2; j < 3; j++) {
          let playerInThisUbication = opositeTeam.returnPlayerInThisPosition([
            activePlayer.ubicationX + i,
            activePlayer.ubicationY + j,
          ]);

          if (
            playerInThisUbication &&
            (playerInThisUbication.lastAction == "withCaution" ||
              playerInThisUbication.lastAction == "tripleThreat")
          ) {
            //If the player is not in the waiting players list and is in a waiting stance then i add him to the waiting players list
            let playersInWaitingList = previousWaitingPlayers.find(
              (player) =>
                player.team == playerInThisUbication!.team &&
                player.position == playerInThisUbication!.position,
            );

            if (!playersInWaitingList) {
              newWaitingPlayers.push(playerInThisUbication!);
            }

            let opositeTeamSelectedPlayer = selectedPlayers.find(
              (player) => player && player.team != activePlayer!.team,
            );

            //If exists, the selected player of the oposite team is added to the waiting players list so he can be the next active player after the waiting players do they actions
            if (opositeTeamSelectedPlayer) {
              newWaitingPlayers.push(opositeTeamSelectedPlayer);
            }

            if (newWaitingPlayers.length > 0) {
              this.waitingPlayers = [
                ...this.waitingPlayers,
                ...newWaitingPlayers,
              ];
            }

            if (opositeTeamSelectedPlayer || newWaitingPlayers.length > 0) {
              if (shouldSetTeamTurn) {
                opositeTeam.setTeamTurn(true);
              }
            }
          }
        }
      }
    } else {
      console.error("activePlayer not found in searchForWaitingPlayersClose");
      throw new Error(
        "Error: activePlayer not found in searchForWaitingPlayersClose",
      );
    }
  }

  shotAttemptedStatus(): void {
    let activePlayer = this.getActivePlayer();

    if (activePlayer) {
      this.setShotHasBeenAttempted(true);
      activePlayer.setShotAttempt(true);
      activePlayer.lastAction = "shotAttempt";
    } else {
      console.error("activePlayer not found in shotAttemptedStatus");
      throw new Error("Error: activePlayer not found in shotAttemptedStatus");
    }
  }

  //---------------------------------------END GET INFO METHODS-------------------------------------------------------------------------------------------------------------

  //-----------------------------------START PLAYER ACTIONS METHODS---------------------------------------------------------------------------------------------------------

  jumpBall(
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
    gameboard: number[][],
    setGameboard: React.Dispatch<React.SetStateAction<number[][]>>,
  ): void {
    let pointsObteinedInTheJumpBallA = 0;
    let pointsObteinedInTheJumpBallB = 0;

    let newGameNarration = [...gameNarration];

    //I loop the calculation until ther's a winner
    while (pointsObteinedInTheJumpBallA === pointsObteinedInTheJumpBallB) {
      //Check the centers points in the jump ball
      this.teamA.players.forEach((player) => {
        if (player.position === "5") {
          pointsObteinedInTheJumpBallA = numberEntire(
            roll20SidesDice() + player.height + player.atleticism,
          );

          //Give feedback
          newGameNarration.unshift(
            `${
              (player.name && player.name.length === 0) || !player.name
                ? `The ${playerPositionDetection(player.position)} of team A`
                : player.name
            }, get ${pointsObteinedInTheJumpBallA} points in the jump`,
          );
          setGameNarration(() => newGameNarration);
        }
      });

      //Check the centers points in the jump ball
      this.teamB.players.forEach((player) => {
        if (player.position === "5") {
          pointsObteinedInTheJumpBallB = numberEntire(
            roll20SidesDice() + player.height + player.atleticism,
          );

          //Give feedback
          newGameNarration.unshift(
            `${
              player.name && player.name.length === 0
                ? `The ${playerPositionDetection(player.position)} of team B`
                : player.name
            }, get ${pointsObteinedInTheJumpBallB} points in the jump`,
          );
          setGameNarration(() => newGameNarration);
        }
      });

      //Check who win the jump ball
      let whoWinTheJump =
        pointsObteinedInTheJumpBallA - pointsObteinedInTheJumpBallB;

      if (whoWinTheJump > 0) {
        //If teamA won the jump ball give it to the PG of that team
        this.teamA.players.forEach((player) => {
          if (player.position === "1") {
            player.setHaveBall(true);

            //Give feedback
            newGameNarration.unshift(
              `${this.teamA.name} won the jump. Now ${
                player.name && player.name.length === 0
                  ? `the ${playerPositionDetection(player.position)} of team A`
                  : player.name
              } have the ball.`,
            );
            setGameNarration(() => newGameNarration);

            this.setTeamTurn("TeamB");
          }
        });
      } else if (whoWinTheJump < 0) {
        //If teamB won the jump ball give it to the PG of that team
        this.teamB.players.forEach((player) => {
          if (player.position === "1") {
            player.setHaveBall(true);

            //Give feedback
            newGameNarration.unshift(
              `${this.teamB.name} won the jump. Now ${
                player.name && player.name.length === 0
                  ? `the ${playerPositionDetection(player.position)} of team B`
                  : player.name
              } have the ball.`,
            );
            setGameNarration(() => newGameNarration);

            this.setTeamTurn("TeamA");
          }
        });
      } else {
        //Give feedback
        newGameNarration.unshift(
          `Both players touch the ball at the same time! The jump ball continues`,
        );
        setGameNarration(() => newGameNarration);
      }
    }

    //Set the team with the ball
    if (this.teamTurn == "TeamA") {
      this.teamA.setTeamTurn(true);
    } else if (this.teamTurn == "TeamB") {
      this.teamB.setTeamTurn(true);
    }

    //Give players action points
    this.teamA.giveActionPointsToTeam();
    this.teamB.giveActionPointsToTeam();

    //Run clock
    this.runClock(gameNarration, setGameNarration, gameboard, setGameboard);
  }

  handlePassAction(
    passer: Player,
    receiver: Player,
    gameboard: number[][],
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
  ): void {
    let newGameNarration = [...gameNarration];

    //First i get what's the defending team
    let teamDefending =
      passer.team == this.teamA.name ? this.teamB.name : this.teamA.name;
    let passerTeam = passer.team == this.teamA.name ? this.teamA : this.teamB;

    let totalDefensivePoints = 0;

    //I'll use this to know who is the most likley defender to steal the ball. It have the player with the highest defensive points and the number of points he got
    let defensorWithTheHighestDefensivePoints: [Player, number][] = [];

    //The i get the pass points
    let passPoints =
      passer.playMaking * 5 + passer.height * 2 + roll20SidesDice() * 5;

    //The passer get a boost if he used the tripple threat beffore
    if (passer.lastAction == "Tripple threat") {
      passPoints = passPoints * 1.2;
    }

    //Then i get the ubications that will have inpact in the calculation
    //First returned array contains the tiles where the ball goes over
    //Second returned array contains the tiles where the ball goes close to
    let tilesThatWillInfluenceInCalculations =
      checkTilesThatWillInfluenceInTheCalculations(
        gameboard,
        [passer.ubicationX, passer.ubicationY],
        [receiver.ubicationX, receiver.ubicationY],
      ) as Coordinate[][];

    function calculateDefensivePointsOfDefender(
      distanceIndex: number,
      player: Player,
      inPassLine: boolean,
    ): number {
      let points = 0;
      let playerZoneUbicationId = playerZoneId(player, player.team == "TeamB");

      //Do math to calculate points on each sector
      if (playerZoneUbicationId == ranges.closeToTheRim.id) {
        points =
          player.insideDefence * 3 +
          player.atleticism +
          player.height -
          190 +
          roll20SidesDice() * 3;
      } else if (
        playerZoneUbicationId == ranges.inShortRange.id ||
        playerZoneUbicationId == ranges.behindTheBoard.id
      ) {
        points =
          player.insideDefence * 1.5 +
          player.perimeterDefence * 1.5 +
          player.atleticism +
          player.height * 0.5 -
          170 +
          roll20SidesDice() * 3;
      } else if (playerZoneUbicationId == ranges.inMidRange.id) {
        points =
          player.insideDefence +
          player.perimeterDefence * 2 +
          player.atleticism +
          100 / (player.weight - 50) +
          roll20SidesDice() * 3;
      } else if (
        (playerZoneUbicationId as number) >= ranges.outsideThe3PointLine.id
      ) {
        points =
          player.perimeterDefence * 3 +
          player.atleticism +
          100 / player.weight +
          roll20SidesDice() * 3;
      }

      //If the defender is not in the pass line he gets a penalty to his defensive points
      if (!inPassLine) {
        points = points * 0.2;
      }

      //The player gets a bonus considering the distance to the passer
      points = points + distanceIndex * 0.5;

      return points;
    }

    function checkDefensivePlayersPoints(
      i: number,
      team: Team,
      arrayOfUbications: Coordinate[],
      inPassLine: boolean,
    ): void {
      //Check every player to know his defensive points for this situation
      team.players.forEach((player) => {
        if (
          player.ubicationX == arrayOfUbications[i][0] &&
          player.ubicationY == arrayOfUbications[i][1]
        ) {
          //Prevent to do operations 2 times on the same player
          if (
            defensorWithTheHighestDefensivePoints.some(
              ([p]) => p.position === player.position,
            )
          ) {
            return;
          }

          let defensivePlayerPoints = calculateDefensivePointsOfDefender(
            i,
            player,
            inPassLine,
          );

          if (player.lastAction == "Overwhelming waiting") {
            defensivePlayerPoints = defensivePlayerPoints * 1.2;
          }

          newGameNarration.unshift(
            `${player.name && player.name.length === 0 ? playerPositionDetection(player.position) : player.name} (Defender) gets ${defensivePlayerPoints} defensive points`,
          );

          totalDefensivePoints += defensivePlayerPoints;
          defensorWithTheHighestDefensivePoints.push([
            player,
            defensivePlayerPoints,
          ]);
        }
      });
    }

    //I loop on the tiles where the ball goes over to set the defender team points in this situation
    for (let i = 0; i < tilesThatWillInfluenceInCalculations[0].length; i++) {
      checkDefensivePlayersPoints(
        i,
        teamDefending == this.teamA.name ? this.teamA : this.teamB,
        tilesThatWillInfluenceInCalculations[0],
        true,
      );
    }

    //I loop on the tiles where the ball goes close to it to set the defender team points in this situation
    for (let i = 0; i < tilesThatWillInfluenceInCalculations[1].length; i++) {
      checkDefensivePlayersPoints(
        i,
        teamDefending == this.teamA.name ? this.teamA : this.teamB,
        tilesThatWillInfluenceInCalculations[1],
        false,
      );
    }

    defensorWithTheHighestDefensivePoints = [
      ...defensorWithTheHighestDefensivePoints,
    ].sort((a, b) => b[1] - a[1]);

    newGameNarration.unshift(
      `The total defensive points are ${Number(totalDefensivePoints).toFixed(2)}`,
    );
    newGameNarration.unshift(
      `${passer.name && passer.name.length === 0 ? playerPositionDetection(passer.position) : passer.name} of team ${passer.team} gets ${Number(passer.actionPoints).toFixed(2)} pass points`,
    );

    passer.setLastAction("pass");
    passer.subtractActionPoints(0.5);
    passer.setHaveBall(false);

    //If the pass have more points than the defensive points
    if (passPoints >= totalDefensivePoints) {
      //The receiver gets the ball
      receiver.setHaveBall(true);
      newGameNarration.unshift(
        `${receiver.name && receiver.name.length === 0 ? playerPositionDetection(receiver.position) : receiver.name} of team ${receiver.team} gets the pass and is the new ball handler`,
      );

      passerTeam.changeLastPasserStatus(passer);

      //If the total defensive points are higher than pass points
    } else {
      if (defensorWithTheHighestDefensivePoints[0][0] === undefined) {
        console.error(
          "defensorWithTheHighestDefensivePoints[0][0] undefined in handlePassAction",
        );
        throw new Error(
          "Error: defensorWithTheHighestDefensivePoints[0][0] undefined in handlePassAction",
        );
      }

      //The player with the highest defensive points involved in this situation steal the ball
      defensorWithTheHighestDefensivePoints[0][0].setHaveBall(true);
      newGameNarration.unshift(
        `${defensorWithTheHighestDefensivePoints[0][0].name && defensorWithTheHighestDefensivePoints[0][0].name.length === 0 ? playerPositionDetection(defensorWithTheHighestDefensivePoints[0][0].position) : defensorWithTheHighestDefensivePoints[0][0].name} has stolen the ball!`,
      );

      passerTeam.resetLastPasserForAllPlayers();
    }

    this.secondsPassingFromOutbands = 0;
    this.passingFromOutbands = false;

    setGameNarration(() => newGameNarration);
  }

  movePlayersToReboundOnFTPositions(
    defendingTeam: Team,
    atackingTeam: Team,
    setGameboard: React.Dispatch<React.SetStateAction<number[][]>>,
  ): void {
    const moveDefendersToReboundPositions = () => {
      defendingTeam.players.forEach((player) => {
        let appropriateDefensivePosition =
          player.team == "TeamA"
            ? teamADefensiveFTPositions
            : teamBDefensiveFTPositions;

        player.ubicationX =
          appropriateDefensivePosition[Number(player.position) - 1][0];
        player.ubicationY =
          appropriateDefensivePosition[Number(player.position) - 1][1];
      });
    };

    const moveAtackersToReboundPositions = (): void => {
      let positionIndex = 1;

      let teamUbications =
        atackingTeam.name == "TeamA"
          ? teamAOffensiveFTPositions
          : teamBOffensiveFTPositions;

      atackingTeam.players.forEach((player) => {
        // If its the shooter he goes to the free throw line
        if (player.lastAction === "shotAttempt") {
          player.ubicationX = teamUbications[0][0];
          player.ubicationY = teamUbications[0][1];
          // If not he goes to the next available rebounding position
        } else {
          player.ubicationX = teamUbications[positionIndex][0];
          player.ubicationY = teamUbications[positionIndex][1];

          positionIndex++;
        }
      });
    };

    //Modify the gameboard
    if (defendingTeam.name == "TeamA") {
      const newBoard = getInitialBoard("B");

      setGameboard(newBoard);
    } else {
      const newBoard = getInitialBoard("A");

      setGameboard(newBoard);
    }

    //Modify the classes of the players
    moveDefendersToReboundPositions();

    moveAtackersToReboundPositions();
  }

  movePlayersToOutOfBandsPositions(
    defenderTeam: Team,
    setGameboard: React.Dispatch<React.SetStateAction<number[][]>>,
    atackingTeamKeepsPosetion: boolean = true,
  ): void {
    let atackingTeam = defenderTeam.name === "TeamA" ? this.teamB : this.teamA;
    let playerWithBall = atackingTeam.players.find((p) => p.haveBall);
    if (!playerWithBall) {
      throw new Error(
        "Error: Player with ball not found while trying to move players to inbounds position",
      );
    }

    let ballUbication: Coordinate = [
      playerWithBall?.ubicationX,
      playerWithBall?.ubicationY,
    ];

    let closerOutOfBandsCoords = getClosestBorderToBall(ballUbication);

    let newTeamsPositions: Coordinate[][] = getNewTeamsPositions(
      atackingTeamKeepsPosetion,
      defenderTeam,
      closerOutOfBandsCoords,
    );
    let bothTeams = [this.teamA, this.teamB];
    let playerPassing: Player | undefined;

    this.secondsPassingFromOutbands = 0;
    this.passingFromOutbands = true;

    playerWithBall.haveBall = false;

    //Find playerPassing
    bothTeams.forEach((team) => {
      team.giveActionPointsToTeam();
      team.giveMovementLeftToAllPlayers();
      team.givePlayerHaveTurnToAllPlayers();
      team.setTeamTurnLeft(true);

      if (!playerPassing) {
        playerPassing = team.players.find((p) => {
          return (
            p.ubicationX === closerOutOfBandsCoords[0] &&
            p.ubicationY === closerOutOfBandsCoords[1]
          );
        });
      }
    });

    if (!playerPassing) {
      throw new Error(
        "Error: playerPassing not found in movePlayersToOutOfBandsPositions",
      );
    }

    setGameboard((gameboard) => {
      let newGameboard = [...gameboard];

      bothTeams.forEach((t) => {
        t.players.forEach((p) => {
          //Remove players form gameboard
          newGameboard[p.ubicationY - 1][p.ubicationX - 1] = 0;
          //Remove last actions
          p.lastAction = "";
        });
      });

      newTeamsPositions.forEach((team, i) => {
        //Add new players positions to the gameboard
        team.forEach(([x, y]) => {
          newGameboard[y - 1][x - 1] = i + 1;
        });
      });

      return newGameboard;
    });

    playerPassing.lastAction = "passingOutbands";
  }

  handleFoul(
    defender: Player,
    atacker: Player,
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
    setGameboard: React.Dispatch<React.SetStateAction<number[][]>>,
    amountOfFreeThrows?: number,
  ): void {
    //TODO think how to handle the situation when a defender fouls a player without the ball while the ball player is shooting
    //This is important because currently the function serch for the last action been shotAttempt to get who shot the FT
    //  and it can happen that 2 players have shotAttempt if the defender is in penalisation

    //Add faul to the defender
    defender.statsAddFoul();
    //Add faul to the team
    let defenderTeam = defender.team == "TeamA" ? this.teamA : this.teamB;
    defenderTeam.statsAddFoul();

    //Hanlde narration
    let newGameNarration = [...gameNarration];
    let newNarrationText = `${isNaN(Number(defender.name)) ? defender.name : defender.position} of team ${defender.team} (Defender) has fouled ${isNaN(Number(atacker.name)) ? atacker.name : atacker.position} of team ${atacker.team} (Atacker)`;

    if (amountOfFreeThrows) {
      newNarrationText += ` during the shot attempt. ${isNaN(Number(atacker.name)) ? atacker.name : atacker.position} of team ${atacker.team} will have ${amountOfFreeThrows} free throws`;
    }
    newNarrationText += ".";

    newGameNarration.unshift(newNarrationText);

    //If it was not in shoting action and the defender is in penalty (more than 4 fouls)
    if (amountOfFreeThrows == undefined && defender.stats.fouls > 4) {
      //Must change the last action so the shooting function finds the player
      atacker.lastAction = "shotAttempt";

      newNarrationText = `${isNaN(Number(defender.name)) ? defender.name : defender.position} of team ${defender.team} have more fouls than allowed. ${isNaN(Number(atacker.name)) ? atacker.name : atacker.position} of team ${atacker.team} will have 2 free throws.`;
    } else {
      newNarrationText = `It was the foul N° ${defender.stats.fouls} of ${isNaN(Number(defender.name)) ? defender.name : defender.position} of team ${defender.team}.`;
    }

    newGameNarration.unshift(newNarrationText);

    //If it was not in shoting action and the defender is not in penalisation then ask for team penalisation
    if (
      amountOfFreeThrows == undefined &&
      defender.stats.fouls <= 4 &&
      defenderTeam.stats.foulsInQuarter > 4
    ) {
      //Must change the last action so the shooting function finds the player
      atacker.lastAction = "shotAttempt";

      newNarrationText = `${defender.team} is in penalisation. ${isNaN(Number(atacker.name)) ? atacker.name : atacker.position} of team ${atacker.team} will have 2 free throws.`;
    } else {
      newNarrationText = `It was the team foul N° ${defenderTeam.stats.foulsInQuarter} of team ${defender.team}.`;
    }

    newGameNarration.unshift(newNarrationText);

    //Set how many FT must be taken if is necesary
    if (
      amountOfFreeThrows != undefined ||
      defender.stats.fouls > 4 ||
      defenderTeam.stats.foulsInQuarter > 4
    ) {
      //Set amount of free throwns
      this.freeThrowsLeft = amountOfFreeThrows ?? 2;
      //Set flags to indicate it is a free throw serie and that it is the first one
      this.isFreeThrowSerie = true;
      this.isFirstFreeThrowInTheSerie = true;
    } else {
      //TODO If there are no FT handle the out of bands
      this.movePlayersToOutOfBandsPositions(defenderTeam, setGameboard);
    }

    setGameNarration(() => newGameNarration);
  }

  handleShot(
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
    gameboard: number[][],
    setGameboard: React.Dispatch<React.SetStateAction<number[][]>>,
  ): void {
    //First i get the shooter
    let shooter = this.getShooter();
    if (!shooter) {
      console.error("shooter not found in handleShot");
      throw new Error(
        "Error: shooter not found in handleShot while handling shot",
      );
    }
    let shooterTeam = shooter.team == "TeamA" ? this.teamA : this.teamB;
    let newGameNarration = [...gameNarration];

    //Then i get the ataker and defender team
    let atackingTeam = shooter.team == "TeamA" ? this.teamA : this.teamB;
    let defendingTeam = shooter.team == "TeamA" ? this.teamB : this.teamA;

    //I get in what part of the field is him located to calculate with the propper math
    let shooterZoneUbicationId = playerZoneId(shooter, shooter.team == "TeamA");

    if (!(this.freeThrowsLeft > 0)) {
      newGameNarration.unshift(
        `${isNaN(Number(shooter.name)) ? shooter.name : shooter.position} is attempting a shot from ${getRangeText(
          shooterZoneUbicationId,
        )}!`,
      );
    } else {
      newGameNarration.unshift(
        `${isNaN(Number(shooter.name)) ? shooter.name : shooter.position} is attempting a shot from the free throw line`,
      );
    }

    const getShooterPointsInShot = (): number => {
      if (!shooter) {
        console.error("shooter not found in getShooterPointsInShot");
        throw new Error(
          "Error: shooter not found in getShooterPointsInShot while handling shot",
        );
      }
      let shooterPointsInShot = 0;

      let multiplier = 1;
      if (shooter.lastAction == "Triple threat") {
        multiplier = 1.2;
      }

      //Do math to calculate points on each sector

      if (this.freeThrowsLeft > 0) {
        shooterPointsInShot = mathShotPointsInFreeThrow(shooter);
      } else if (shooterZoneUbicationId == ranges.closeToTheRim.id) {
        shooterPointsInShot = mathShotPointsCloseToTheRim(multiplier, shooter);
      } else if (
        shooterZoneUbicationId == ranges.inShortRange.id ||
        shooterZoneUbicationId == ranges.behindTheBoard.id
      ) {
        shooterPointsInShot = mathShotPointsInShortRange(multiplier, shooter);
      } else if (shooterZoneUbicationId == ranges.inMidRange.id) {
        shooterPointsInShot = mathShotPointsInMidRange(multiplier, shooter);
      } else if (shooterZoneUbicationId == ranges.outsideThe3PointLine.id) {
        shooterPointsInShot = mathShotPointsCloseToThe3PointLine(
          multiplier,
          shooter,
        );
      } else if (shooterZoneUbicationId == ranges.long3Range.id) {
        shooterPointsInShot = mathShotPointsInLong3Range(multiplier, shooter);
      } else if (shooterZoneUbicationId == ranges.halfCourt.id) {
        shooterPointsInShot = mathShotPointsInHalfCourt(multiplier, shooter);
      } else if (shooterZoneUbicationId == ranges.behindHalfCourt.id) {
        shooterPointsInShot = mathShotPointsBehindHalfCourt(
          multiplier,
          shooter,
        );
      } else if (shooterZoneUbicationId == ranges.theOtherRim.id) {
        shooterPointsInShot = mathShotPointsCloseToTheOtherRim(
          multiplier,
          shooter,
        );
      }

      return shooterPointsInShot;
    };

    const getDefendersPointsInShot = (): number => {
      if (!shooter) {
        console.error("shooter not found in getDefendersPointsInShot");
        throw new Error(
          "Error: shooter not found in getDefendersPointsInShot while handling shot",
        );
      }
      let totalDefendersPoints = 0;
      if (this.freeThrowsLeft > 0) {
        //If it is a free throw ther's no defenders so totalDefendersPoints is going to be 0
        return totalDefendersPoints;
      } else {
        //If it was a field shot attempt it cheks the tiles around the shooter. To do so we use one loop for the X direction and one for the Y direction
        for (let positionX = -2; positionX < 3; positionX++) {
          for (let positionY = -2; positionY < 3; positionY++) {
            //Then i ckeck if ther's a defender in the scanned ubication using the shooter ubication as center
            let defenderInThisUbication =
              defendingTeam.returnPlayerInThisPosition([
                shooter.ubicationX + positionX,
                shooter.ubicationY + positionY,
              ]);
            let defenderPoints = 0;

            //If there's a player located in this position
            if (defenderInThisUbication != undefined) {
              //I get in what part of the field is him located to calculate with the propper math
              let defenderZoneUbicationId = playerZoneId(
                defenderInThisUbication,
                defenderInThisUbication.team == "TeamB",
              );

              let multiplier = 1;
              if (
                defenderInThisUbication.lastAction == "overwhelming waiting"
              ) {
                multiplier = 1.4;
              }
              //Do math to calculate points on each sector
              if (defenderZoneUbicationId == ranges.closeToTheRim.id) {
                defenderPoints = mathDefensePointsCloseToTheRim(
                  multiplier,
                  defenderInThisUbication,
                );
              } else if (
                defenderZoneUbicationId == ranges.inShortRange.id ||
                defenderZoneUbicationId == ranges.behindTheBoard.id
              ) {
                defenderPoints = mathDefensePointsInShortRange(
                  multiplier,
                  defenderInThisUbication,
                );
              } else if (defenderZoneUbicationId == ranges.inMidRange.id) {
                defenderPoints = mathDefensePointsInMidRange(
                  multiplier,
                  defenderInThisUbication,
                );
              } else if (
                defenderZoneUbicationId == ranges.outsideThe3PointLine.id
              ) {
                defenderPoints = mathDefensePointsCloseToThe3PointLine(
                  multiplier,
                  defenderInThisUbication,
                );
              } else if (defenderZoneUbicationId == ranges.long3Range.id) {
                defenderPoints = mathDefensePointsLong3Range(
                  multiplier,
                  defenderInThisUbication,
                );
              } else if (
                defenderZoneUbicationId == ranges.halfCourt.id ||
                defenderZoneUbicationId == ranges.behindHalfCourt.id ||
                defenderZoneUbicationId == ranges.theOtherRim.id
              ) {
                defenderPoints = mathDefensePointsHalfCourtAndFartherAway(
                  multiplier,
                  defenderInThisUbication,
                );
              }

              //If the defender is right next to the shooter he gets a bonus for his defensive points
              if (
                Math.abs(positionX) <= 1 &&
                Math.abs(positionY) <= 1 &&
                (positionX !== 0 || positionY !== 0)
              ) {
                defenderPoints = defenderPoints * 1.5;
              }

              //If defenders get too few points he foul the shooter.
              //Used this.isFreeThrowSerie to avoid loop

              //TODO Check if this points are fare to make a foul

              if (defenderPoints < 10 && !this.isFreeThrowSerie) {
                // Uncomment to test free throws
                // if (true && !this.isFreeThrowSerie) {
                let amountOfFreeThrows;
                if (
                  shooterZoneUbicationId == ranges.closeToTheRim.id ||
                  shooterZoneUbicationId == ranges.inShortRange.id ||
                  shooterZoneUbicationId == ranges.behindTheBoard.id ||
                  shooterZoneUbicationId == ranges.inMidRange.id
                ) {
                  amountOfFreeThrows = 2;
                } else {
                  amountOfFreeThrows = 3;
                }

                this.handleFoul(
                  defenderInThisUbication,
                  shooter,
                  newGameNarration,
                  setGameNarration,
                  setGameboard,
                  amountOfFreeThrows,
                );
              }
            }

            totalDefendersPoints += defenderPoints;
          }
        }
      }

      return totalDefendersPoints;
    };

    const calculateIfGoesIn = (): boolean => {
      if (!shooter) {
        console.error("shooter not found in calculateIfGoesIn");
        throw new Error(
          "Error: shooter not found in calculateIfGoesIn while handling shot",
        );
      }
      let isItIn = false;

      let shooterPointsInShot = getShooterPointsInShot();
      let maxShooterPoints: number;

      let maxAPlayerAtributes = {
        height: getMaxStatPerPosition("height", shooter.position),
        weight: getMaxStatPerPosition("weight", shooter.position),
        atleticism: 100,
        perimeterDefence: 100,
        insideDefence: 100,
        rebounding: 100,
        perimeterScoring: 100,
        insideScoring: 100,
        playMaking: 100,
        position: shooter.position,
      };

      let maxPosiblePlayerAtributes = {
        height: getMaxStatPerPosition("height", "C"),
        weight: getMaxStatPerPosition("weight", "C"),
        atleticism: 100,
        perimeterDefence: 100,
        insideDefence: 100,
        rebounding: 100,
        perimeterScoring: 100,
        insideScoring: 100,
        playMaking: 100,
        position: "C",
      };

      if (shooterZoneUbicationId == ranges.closeToTheRim.id) {
        maxShooterPoints = mathShotPointsCloseToTheRim(
          1.2,
          maxAPlayerAtributes,
        );
      } else if (
        shooterZoneUbicationId == ranges.inShortRange.id ||
        shooterZoneUbicationId == ranges.behindTheBoard.id
      ) {
        maxShooterPoints = mathShotPointsInShortRange(1.2, maxAPlayerAtributes);
      } else if (shooterZoneUbicationId == ranges.inMidRange.id) {
        maxShooterPoints = mathShotPointsInMidRange(1.2, maxAPlayerAtributes);
      } else if (shooterZoneUbicationId == ranges.outsideThe3PointLine.id) {
        maxShooterPoints = mathShotPointsCloseToThe3PointLine(
          1.2,
          maxAPlayerAtributes,
        );
      } else if (shooterZoneUbicationId == ranges.long3Range.id) {
        maxShooterPoints = mathShotPointsInLong3Range(1.2, maxAPlayerAtributes);
      } else if (shooterZoneUbicationId == ranges.halfCourt.id) {
        maxShooterPoints = mathShotPointsInHalfCourt(1.2, maxAPlayerAtributes);
      } else if (shooterZoneUbicationId == ranges.behindHalfCourt.id) {
        maxShooterPoints = mathShotPointsBehindHalfCourt(
          1.2,
          maxAPlayerAtributes,
        );
      } else if (shooterZoneUbicationId == ranges.theOtherRim.id) {
        maxShooterPoints = mathShotPointsCloseToTheOtherRim(
          1.2,
          maxAPlayerAtributes,
        );
      } else if (this.freeThrowsLeft > 0) {
        maxShooterPoints = mathShotPointsInFreeThrow(maxAPlayerAtributes);
      } else {
        maxShooterPoints = 0;
      }

      let allDefendersPointsInShotSumatory = getDefendersPointsInShot();
      let maxSingleDefenderPoints = 0;

      if (!(this.freeThrowsLeft > 0)) {
        if (shooterZoneUbicationId == ranges.closeToTheRim.id) {
          maxSingleDefenderPoints = mathDefensePointsCloseToTheRim(
            1.4,
            maxPosiblePlayerAtributes,
          );
        } else if (
          shooterZoneUbicationId == ranges.inShortRange.id ||
          shooterZoneUbicationId == ranges.behindTheBoard.id
        ) {
          maxSingleDefenderPoints = mathDefensePointsInShortRange(
            1.4,
            maxPosiblePlayerAtributes,
          );
        } else if (shooterZoneUbicationId == ranges.inMidRange.id) {
          maxSingleDefenderPoints = mathDefensePointsInMidRange(
            1.4,
            maxPosiblePlayerAtributes,
          );
        } else if (shooterZoneUbicationId == ranges.outsideThe3PointLine.id) {
          maxSingleDefenderPoints = mathDefensePointsCloseToThe3PointLine(
            1.4,
            maxPosiblePlayerAtributes,
          );
        } else if (shooterZoneUbicationId == ranges.long3Range.id) {
          maxSingleDefenderPoints = mathDefensePointsLong3Range(
            1.4,
            maxPosiblePlayerAtributes,
          );
        } else if (
          shooterZoneUbicationId == ranges.halfCourt.id ||
          shooterZoneUbicationId == ranges.behindHalfCourt.id ||
          shooterZoneUbicationId == ranges.theOtherRim.id
        ) {
          maxSingleDefenderPoints = mathDefensePointsHalfCourtAndFartherAway(
            1.4,
            maxPosiblePlayerAtributes,
          );
        }
      }

      let dShooterPointsVsMaxPossiblePointsPercentage =
        (shooterPointsInShot * 100) / maxShooterPoints;
      newGameNarration.unshift(
        `${isNaN(Number(shooter.name)) ? shooter.name : shooter.position} (Shooter) gets ${dShooterPointsVsMaxPossiblePointsPercentage} points in the shot`,
      );

      let defendersPointsVsSinlgePlayerMaxPossiblePointsPercentage:
        | number
        | undefined;

      let pointsDif: number | undefined;

      if (!(this.freeThrowsLeft > 0)) {
        defendersPointsVsSinlgePlayerMaxPossiblePointsPercentage =
          allDefendersPointsInShotSumatory == 0
            ? 0
            : (allDefendersPointsInShotSumatory * 100) /
              maxSingleDefenderPoints;
        allDefendersPointsInShotSumatory == 0
          ? newGameNarration.unshift(
              `Defenders can do nothing against the shooter`,
            )
          : newGameNarration.unshift(
              `The defenders get ${defendersPointsVsSinlgePlayerMaxPossiblePointsPercentage} defensive points in total`,
            );

        pointsDif =
          dShooterPointsVsMaxPossiblePointsPercentage -
          defendersPointsVsSinlgePlayerMaxPossiblePointsPercentage;
      }

      //Use all prev data to calculate if it goes in
      //First get a dice roll
      let shotDiceRoll = roll20SidesDice();

      if (this.freeThrowsLeft > 0) {
        isItIn = mathChancesMakingShotInFreeThrow(
          maxShooterPoints,
          shotDiceRoll,
        );
      } else {
        if (
          defendersPointsVsSinlgePlayerMaxPossiblePointsPercentage === undefined
        ) {
          console.error(
            "defendersPointsVsSinlgePlayerMaxPossiblePointsPercentage not found in calculateIfItGoesIn",
          );
          throw new Error(
            "Error: defendersPointsVsSinlgePlayerMaxPossiblePointsPercentage not found in calculateIfItGoesIn while handling shot",
          );
        }

        if (pointsDif === undefined) {
          console.error("pointsDif is undefined in calculateIfItGoesIn");
          throw new Error(
            "Error: pointsDif is undefined in calculateIfItGoesIn while handling shot",
          );
        }

        if (defendersPointsVsSinlgePlayerMaxPossiblePointsPercentage < 100) {
          if (shooterZoneUbicationId == ranges.closeToTheRim.id) {
            isItIn = mathChancesMakingShotInCloseToTheRim(
              pointsDif,
              shotDiceRoll,
            );
          } else if (
            shooterZoneUbicationId == ranges.inShortRange.id ||
            shooterZoneUbicationId == ranges.behindTheBoard.id
          ) {
            isItIn = mathChancesMakingShotInShortRange(pointsDif, shotDiceRoll);
          } else if (shooterZoneUbicationId == ranges.inMidRange.id) {
            isItIn = mathChancesMakingShotInMidRange(pointsDif, shotDiceRoll);
          } else if (shooterZoneUbicationId == ranges.outsideThe3PointLine.id) {
            isItIn = mathChancesMakingShotInCloseToThe3PointLine(
              pointsDif,
              shotDiceRoll,
            );
          } else if (shooterZoneUbicationId == ranges.long3Range.id) {
            isItIn = mathChancesMakingShotInLong3Range(pointsDif, shotDiceRoll);
          } else if (shooterZoneUbicationId == ranges.halfCourt.id) {
            isItIn = mathChancesMakingShotInHalfCourt(pointsDif, shotDiceRoll);
          } else if (shooterZoneUbicationId == ranges.behindHalfCourt.id) {
            isItIn = mathChancesMakingShotInBehindHalfCourt(
              pointsDif,
              shotDiceRoll,
            );
          } else if (shooterZoneUbicationId == ranges.theOtherRim.id) {
            isItIn = mathChancesMakingShotInCloseToTheOtherRim(
              pointsDif,
              shotDiceRoll,
            );
          }
        }
      }

      return isItIn;
    };

    let pointsToAdd = 0;
    let isItIn = calculateIfGoesIn();
    let newPlayerWithBall: Player | undefined;

    let asistant = atackingTeam.players.find((player) => player.lastPasser);

    if (this.isFreeThrowSerie && this.isFirstFreeThrowInTheSerie) {
      this.movePlayersToReboundOnFTPositions(
        defendingTeam,
        atackingTeam,
        setGameboard,
      );

      this.isFirstFreeThrowInTheSerie = false;
    }

    if (isItIn) {
      if (this.freeThrowsLeft > 0) {
        newGameNarration.unshift(
          `The ball goes in! The team ${isNaN(Number(atackingTeam.name)) ? atackingTeam.name : "the attacking team"} add 1 point to the scoreboard`,
        );
        pointsToAdd = 1;
      } else {
        if (
          shooterZoneUbicationId == ranges.closeToTheRim.id ||
          shooterZoneUbicationId == ranges.inShortRange.id ||
          shooterZoneUbicationId == ranges.behindTheBoard.id ||
          shooterZoneUbicationId == ranges.inMidRange.id
        ) {
          newGameNarration.unshift(
            `The ball goes in! The team ${isNaN(Number(atackingTeam.name)) ? atackingTeam.name : "the attacking team"} add 2 points to the scoreboard`,
          );
          pointsToAdd = 2;
        } else {
          newGameNarration.unshift(
            `The ball goes in! The team ${isNaN(Number(atackingTeam.name)) ? atackingTeam.name : "the attacking team"} add 3 points to the scoreboard`,
          );
          pointsToAdd = 3;
        }

        shooter.setShotAttempt(false);

        //After that i handle who get's the ball after the shot
        newPlayerWithBall = findNearestPlayerToPoint(
          defendingTeam.players,
          defendingTeam.name === "TeamA"
            ? teamARimUbication
            : teamBRimUbication,
        );

        newPlayerWithBall.movePlayerToOwnRim(setGameboard);
        newPlayerWithBall.setHaveBall(true);
        newGameNarration.unshift(
          `${isNaN(Number(newPlayerWithBall.name)) ? newPlayerWithBall.name : newPlayerWithBall.position} get the ball to start theyr posetion`,
        );
      }
    } else {
      //If the shot is off
      if (this.freeThrowsLeft == 0) {
        //If it doesn't goes in handle who get's the rebound
        newPlayerWithBall = this.getRebounder(shooter);

        newPlayerWithBall.statsAddRebound(atackingTeam);

        if (newPlayerWithBall.team == atackingTeam.name) {
          atackingTeam.statsAddRebound(atackingTeam);
        } else {
          defendingTeam.statsAddRebound(atackingTeam);
        }

        newPlayerWithBall.setLastAction(
          newPlayerWithBall.team == atackingTeam.name ? "getOReb" : "getDReb",
        );

        newPlayerWithBall.setHaveBall(true);

        newGameNarration.unshift(
          `The shot is off ${
            newPlayerWithBall.team == atackingTeam.name ? "but" : "and"
          } ${isNaN(Number(newPlayerWithBall.name)) ? newPlayerWithBall.name : newPlayerWithBall.position} gets the rebound!`,
        );
        shooterTeam.resetLastPasserForAllPlayers();

        shooter.setShotAttempt(false);
      }
    }

    //Then i handle the players status and stats
    shooter.setHaveBall(false);
    shooter.statsAddShotAttempt(pointsToAdd, isItIn, this.freeThrowsLeft > 0);

    if (asistant) {
      asistant.statsAddAssist();
    }

    //Finally i handle the team stats
    atackingTeam.statsAddShotAttempt(
      pointsToAdd,
      isItIn,
      !!asistant,
      this.freeThrowsLeft > 0,
    );

    if (this.freeThrowsLeft > 0) {
      this.freeThrowsLeft--;

      this.handleShot(
        newGameNarration,
        setGameNarration,
        gameboard,
        setGameboard,
      );

      return;
    }

    if (!!!newPlayerWithBall) {
      console.error("newPlayerWithBall not defined in handle shot");
      throw new Error("Error: newPlayerWithBall not defined in handle shot");
    }
    newPlayerWithBall.setHaveBall(true);

    this.teamA.resetLastPasserForAllPlayers();
    this.teamB.resetLastPasserForAllPlayers();

    setGameNarration(() => newGameNarration);

    this.setShotHasBeenAttempted(false);
    //End free throw series
    this.isFreeThrowSerie = false;
  }

  handlePlayerWait(
    type: string,
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
    gameboard: number[][],
    setGameboard: React.Dispatch<React.SetStateAction<number[][]>>,
  ): void {
    let activePlayer = this.getActivePlayer();

    if (activePlayer) {
      activePlayer.handleWait(type);

      const playerName = `The ${playerPositionDetection(
        activePlayer.position,
      )} of ${activePlayer.team}`;

      const narrationText =
        type == "overwhelmingWaiting"
          ? `${playerName} is now in an overwhelming waiting stance.`
          : type == "withCaution"
            ? `${playerName} is now waiting with caution.`
            : type == "withoutTheBall"
              ? `${playerName} is now waiting without the ball.`
              : `${playerName} is now doing a triple threat.`;

      this.handleEndTurn(
        gameNarration,
        setGameNarration,
        gameboard,
        setGameboard,
        narrationText,
        // If it's withCaution or tripleTheat return true, otherwise return false
        !!(type == "withCaution" || type == "tripleThreat"),
      );
    } else {
      console.error("activePlayer not found in handlePlayerWait");
      throw new Error("Error: activePlayer not found in handlePlayerWait");
    }
  }

  setShotHasBeenAttempted(value: boolean): void {
    this.shotHasBeenAttempted = value;
  }

  handleMovePlayer(
    player: Player,
    newUbication: Coordinate,
    typeOfMove: "move" | "dribbling",
    gameboard: number[][],
    setMatchState: React.Dispatch<React.SetStateAction<Match>>,
    setActionConfirmed: React.Dispatch<React.SetStateAction<string>>,
    setActivateConfirmButton: React.Dispatch<React.SetStateAction<boolean>>,
    setGameboard: React.Dispatch<React.SetStateAction<number[][]>>,
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
  ): void {
    let isFoul = false;
    let newGameNarration = [...gameNarration];

    let defensiveTeam = player.team === "TeamA" ? this.teamB : this.teamA;
    let atackingTeam = player.team === "TeamA" ? this.teamA : this.teamB;

    const evaluateDribblingOutcome = (): [boolean, Player | undefined] => {
      let isBallStolen = false;
      let defenderInteracting: Player | undefined;

      //I only need close to where the ball moves since players can't move over other players
      //Note: ubications are not repeated (done in checkTilesThatWillInfluenceInTheCalculations)
      let tilesThatWillInfluenceInCalculations =
        checkTilesThatWillInfluenceInTheCalculations(
          gameboard,
          oldUbication,
          newUbication,
        ).flat(); //In this case there will be no defeders in the tile of the ball

      let defensivePlayers = getDefensivePlayersInDribblingAction(
        defensiveTeam,
        tilesThatWillInfluenceInCalculations,
      );
      let totalDefensivePoints = 0;
      let defensivePlayersPoints: [Player, number][] = [];

      //Loop in the tiles that will influence in the calculations
      for (let i = 0; i < tilesThatWillInfluenceInCalculations.length; i++) {
        //And for each defensive player
        defensivePlayers.forEach((defender) => {
          //Check if they are in this ubication
          if (
            defender.ubicationX == tilesThatWillInfluenceInCalculations[i][0] &&
            defender.ubicationY == tilesThatWillInfluenceInCalculations[i][1]
          ) {
            //Calculate defender points
            let defenderPoints = calculateDefenderPointsInDribbling(defender);

            if (defenderPoints < defensivePointsFoulInDribbling) {
              isFoul = true;
            }

            //Add the points to the sumatory of defenders points
            totalDefensivePoints += defenderPoints;

            //Save data to check who gets the ball in case it's needed
            defensivePlayersPoints.push([defender, defenderPoints]);
          }
        });
      }

      //If defenders were found close to the atacker
      if (defensivePlayersPoints.length > 0) {
        //Check the offensive player points on the dribble
        let offensivePlayerPoints = calculateOffensivePlayerPoints(player);

        let sortedPlayersWithPoints = defensivePlayersPoints.sort((a, b) => {
          if (isFoul) {
            //If it's foul i want to get the defender with the least points
            return a[1] - b[1];
          } else {
            //If it's not then order em to get the player who stole it
            return b[1] - a[1];
          }
        });

        // if (true) {
        if (offensivePlayerPoints < totalDefensivePoints && !isFoul) {
          isBallStolen = true;
          defenderInteracting = sortedPlayersWithPoints[0][0];
        }
      }

      return [isBallStolen, defenderInteracting];
    };

    let teamInMatch = player.team == "TeamA" ? this.teamA : this.teamB;
    let playerInMatch = teamInMatch.players.find(
      (p) => p.position === player.position,
    );

    if (!!!playerInMatch) {
      console.error("Active player not found while moving player");
      throw new Error("Error: Active player not found while moving player");
    }

    if (!!!playerInMatch.ubicationY || !!!playerInMatch.ubicationX) {
      console.error("player ubication is undefined while moving player");
      throw new Error(
        "Error: player ubication is undefined while moving player",
      );
    }

    let oldUbication: Coordinate = [
      playerInMatch?.ubicationX,
      playerInMatch?.ubicationY,
    ];

    if (typeOfMove === "dribbling") {
      //Evaluate if the ball gets stolen during the dribbling, is a foul or is succesfull
      let [isBallStolen, defenderInteracting] = evaluateDribblingOutcome();

      //If it's a foul
      if (isFoul && defenderInteracting) {
        this.handleFoul(
          defenderInteracting,
          player,
          gameNarration,
          setGameNarration,
          setGameboard,
        );
        //If the ball gets stolen
      } else if (isBallStolen && defenderInteracting) {
        defenderInteracting.setHaveBall(true);
        playerInMatch?.setHaveBall(false);

        //Handle narration and stats for the ball being stolen
        newGameNarration.unshift(
          `${
            (defenderInteracting.name &&
              defenderInteracting.name.length === 0) ||
            !defenderInteracting.name
              ? `The ${playerPositionDetection(defenderInteracting.position)} of team A`
              : defenderInteracting.name
          }, reach for the ball and gets it!`,
        );

        defenderInteracting.statsAddSteal();
        defensiveTeam.statsAddSteal();

        player.statsAddTurnOver();
        atackingTeam.statsAddTurnOver();

        setGameNarration(() => [...newGameNarration]);
      } else {
        console.error(
          "defenderInteracting was expected to be defined in evaluateDribblingOutcome but it's not",
        );

        throw new Error(
          "Error: defenderInteracting was expected to be defined in evaluateDribblingOutcome but it's not",
        );
      }
    }

    gameboard[oldUbication[1] - 1][oldUbication[0] - 1] = 0;

    playerInMatch?.movePlayer(newUbication[0], newUbication[1]);

    gameboard[playerInMatch?.ubicationY! - 1][playerInMatch?.ubicationX! - 1] =
      playerInMatch?.team == "TeamA" ? 1 : 2;

    setGameboard(() => [...gameboard]);

    setActionConfirmed(() => "");

    setMatchState(() => this);

    setActivateConfirmButton(() => false);
  }

  handleViolation(
    setGameboard: React.Dispatch<React.SetStateAction<number[][]>>,
  ): void {
    let defensiveTeam = this.teamA.getPlayerWithBall()
      ? this.teamB
      : this.teamA;

    let teamWithBall = defensiveTeam.name === "TeamA" ? this.teamB : this.teamA;
    teamWithBall.statsAddTurnOver();
    teamWithBall.getPlayerWithBall()?.statsAddTurnOver();

    this.movePlayersToOutOfBandsPositions(defensiveTeam, setGameboard, false);
  }

  //------------------------------------END PLAYER ACTIONS METHODS----------------------------------------------------------------------------------------------------------

  //-----------------------------------START MATCH HANDLER METHODS----------------------------------------------------------------------------------------------------------
  setTeamTurn(team: string): void {
    this.teamTurn = team;
  }

  handleEndTurn(
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
    gameboard: number[][],
    setGameboard: React.Dispatch<React.SetStateAction<number[][]>>,
    currentGameNarration?: string | undefined,
    isWaitingAction?: boolean,
  ): void {
    let activePlayer = this.getActivePlayer();

    const newGameNarration = [...gameNarration];

    if (currentGameNarration) {
      newGameNarration.unshift(currentGameNarration);
    }
    if (activePlayer) {
      //NOTE: Player is marked as not selected before entering addWaitingPlayersClose().
      activePlayer.setPlayerSelected(false);

      this.addWaitingPlayersClose();

      activePlayer.setActivePlayer(false);

      if (!isWaitingAction) {
        activePlayer.resetActionPoints();
        if (
          activePlayer.lastAction == "tripleThreat" ||
          activePlayer.lastAction == "withCaution"
        ) {
          activePlayer.setLastAction("");
        }
      }

      activePlayer.setMovementLeft(false);
      activePlayer.setPlayerHaveTurn(false);

      if (this.waitingPlayers.length > 0) {
        this.waitingPlayers[0].setActivePlayer(true);
        this.waitingPlayers[0].setPlayerSelected(true);

        newGameNarration.unshift(
          `The ${playerPositionDetection(this.waitingPlayers[0].position)} of ${
            this.waitingPlayers[0].team
          } is now the active player.`,
        );

        this.waitingPlayers.shift();
      } else {
        let selectedPlayers = this.getSelectedPlayers();

        if (selectedPlayers[0] || selectedPlayers[1]) {
          if (selectedPlayers[0]) {
            selectedPlayers[0].setActivePlayer(true);
            selectedPlayers[0].setPlayerSelected(false);

            newGameNarration.unshift(
              `The ${playerPositionDetection(selectedPlayers[0].position)} of ${
                selectedPlayers[0].team
              } is now the active player.`,
            );
          }

          if (selectedPlayers[1]) {
            selectedPlayers[1].setActivePlayer(true);
            selectedPlayers[1].setPlayerSelected(false);

            newGameNarration.unshift(
              `The ${playerPositionDetection(selectedPlayers[1].position)} of ${
                selectedPlayers[1].team
              } is now the active player.`,
            );
          }

          setGameNarration(() => newGameNarration);
        } else if (
          this.teamA.doesPlayersHaveMovement() ||
          this.teamB.doesPlayersHaveMovement()
        ) {
          if (this.teamA.doesPlayersHaveMovement()) {
            this.teamA.setTeamTurnLeft(true);
          }

          if (this.teamB.doesPlayersHaveMovement()) {
            this.teamB.setTeamTurnLeft(true);
          }

          if (this.teamA.teamHaveTheBall()) {
            this.setTeamTurn("TeamB");
            this.teamB.setTeamTurn(true);
            newGameNarration.unshift(`It's now ${this.teamB.name} turn.`);
          } else {
            this.setTeamTurn("TeamA");
            this.teamA.setTeamTurn(true);
            newGameNarration.unshift(`It's now ${this.teamA.name} turn.`);
          }
        } else {
          if (this.passingFromOutbands) {
            if (this.secondsPassingFromOutbands >= 5) {
              let atackingTeam = this.teamA.teamHaveTheBall()
                ? this.teamA
                : this.teamB;
              newGameNarration.unshift(
                `5 seconds violation! ${atackingTeam.name} have lost the ball.`,
              );
              this.handleViolation(setGameboard);
            } else {
              this.secondsPassingFromOutbands++;
              newGameNarration.unshift(
                `A second has passed without passing the ball on the inboud.`,
              );
              newGameNarration.unshift(
                `${5 - this.secondsPassingFromOutbands} seconds left`,
              );
            }
          } else {
            this.runClock(
              gameNarration,
              setGameNarration,
              gameboard,
              setGameboard,
            );
          }

          if (!this.gameOver) {
            //Give players action points and movement left
            this.teamA.giveActionPointsToTeam();
            this.teamA.giveMovementLeftToAllPlayers();
            this.teamA.givePlayerHaveTurnToAllPlayers();
            this.teamA.setTeamTurnLeft(true);

            this.teamB.giveActionPointsToTeam();
            this.teamB.giveMovementLeftToAllPlayers();
            this.teamB.givePlayerHaveTurnToAllPlayers();
            this.teamB.setTeamTurnLeft(true);
          }

          if (this.teamA.teamHaveTheBall()) {
            this.setTeamTurn("TeamA");
            this.teamA.setTeamTurn(true);
            this.teamB.setTeamTurn(false);
          } else {
            this.setTeamTurn("TeamB");
            this.teamB.setTeamTurn(true);
            this.teamA.setTeamTurn(false);
          }
        }

        setGameNarration(() => newGameNarration);
      }
    } else {
      console.error("activePlayer not found in handleEndTurn");
      throw new Error("Error: activePlayer not found in handleEndTurn");
    }
  }

  runClock(
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
    gameboard: number[][],
    setGameboard: React.Dispatch<React.SetStateAction<number[][]>>,
  ): void {
    if (this.timeLeft.seconds == 0) {
      this.timeLeft.minutes--;
      this.timeLeft.seconds = 59;
    } else {
      this.timeLeft.seconds--;
    }

    if (this.timeLeft.minutes == 0 && this.timeLeft.seconds == 0) {
      if (this.quarter < 4) {
        this.quarter++;
        this.timeLeft.minutes = 6;
      } else if (this.teamA.stats.points == this.teamB.stats.points) {
        this.quarter++;
        this.timeLeft.minutes = 3;
      } else {
        this.gameOver = true;
      }
    }

    if (this.shotHasBeenAttempted) {
      this.handleShot(gameNarration, setGameNarration, gameboard, setGameboard);
    }
  }

  //------------------------------------END MATCH HANDLER METHODS-----------------------------------------------------------------------------------------------------------
}
