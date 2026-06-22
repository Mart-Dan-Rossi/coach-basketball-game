import { QuarterTimeLeft } from "./myInterfaces";
import { Team } from "./team";
import {
  roll20SidesDice,
  numberEntire,
  playerZone,
  ranges,
  checkTilesThatWillInfluenceInTheCalculations,
  mathShotPointsCloseToTheRim,
  mathShotPointsInShortRange,
  mathShotPointsInMidRange,
  mathShotPointsCloseToThe3PointLine,
  mathShotPointsInLong3Range,
  mathShotPointsInHalfCourt,
  mathShotPointsBehindHalfCourt,
  mathShotPointsCloseToTheOtherRim,
  mathDefensePointsCloseToTheRim,
  mathDefensePointsInShortRange,
  mathDefensePointsInMidRange,
  mathDefensePointsCloseToThe3PointLine,
  mathDefensePointsLong3Range,
  mathDefensePointsHalfCourtAndFartherAway,
  getShotDistance,
  getReboundDistance as getWhereItReboundsTo,
  getClosestPlayers,
  getRangeText,
  playerPositionDetection,
  mathShotPointsInFreeThrow,
  getMaxStatPerPosition,
} from "../utilities/exportableFunctions";
import React from "react";
import { Player } from "./players";
import GameBoard from "../components/gameboard/GameBoard";

export class Match {
  teamA: Team;
  teamB: Team;

  //Match status
  teamTurn: string;
  shotHasBeenAttempted: boolean;
  shootingFreeThrows: boolean;

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
    this.shootingFreeThrows = false;

    //Match basic info
    this.quarter = 1;
    this.timeLeft = { minutes: 6, seconds: 0 };
    this.shotClock = 24;
    this.turnOver = false;
    this.gameOver = false;
  }

  //--------------------------------------START GET INFO METHODS------------------------------------------------------------------------------------------------------------

  getActivePlayer() {
    return this.teamA.returnActivePlayer() ?? this.teamB.returnActivePlayer();
  }

  getShooter() {
    return this.teamA.getShooter() ?? this.teamB.getShooter();
  }

  getSelectedPlayers() {
    let teamASelectedPlayer: Player | undefined;
    let teamBSelectedPlayer: Player | undefined;

    this.teamA.isAnyPlayerSelected() &&
      (teamASelectedPlayer = this.teamA.getSelectedPlayer());
    this.teamB.isAnyPlayerSelected() &&
      (teamBSelectedPlayer = this.teamB.getSelectedPlayer());

    return [teamASelectedPlayer, teamBSelectedPlayer];
  }

  getClosestDefenderToTheRim(defendingTeam: Team) {
    return defendingTeam.getClosestDefenderToTheRim();
  }

  //---------------------------------------END GET INFO METHODS-------------------------------------------------------------------------------------------------------------

  //-----------------------------------START PLAYER ACTIONS METHODS---------------------------------------------------------------------------------------------------------

  jumpBall(
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
    gameBoard: number[][],
  ) {
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
              player.name === "" ? "The center of team A" : player.name
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
              player.name === "" ? "The center of team B" : player.name
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
                player.name === "" ? "the PG of team A" : player.name
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
                player.name === "" ? "the PG of team B" : player.name
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
    this.runClock(gameNarration, setGameNarration, gameBoard);
  }

  handlePassAction(
    passer: Player,
    receiver: Player,
    gameBoard: number[][],
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
  ) {
    let newGameNarration = [...gameNarration];

    //First i get what's the defending team
    let teamDefending =
      passer.team == this.teamA.name ? this.teamB.name : this.teamA.name;
    let passerTeam = passer.team == this.teamA.name ? this.teamA : this.teamB;

    let totalDefensivePoints = 0;

    //I'll use this to know who is the most likley defender to steal the ball. It have the player with the highest defensive points and the number of points he got
    let defensorWithTheHighestDefensivePoints = [undefined, undefined] as [
      Player | undefined,
      number | undefined,
    ];

    //The i get the pass points
    let passPoints =
      passer.playMaking * 5 + passer.height * 2 + roll20SidesDice() * 5;

    //The passer get a boost if he used the tripple threat beffore
    if (passer.lastAction == "Tripple threat") {
      passPoints = passPoints * 1.2;
    }

    //Then i get the ubications that will have inpact in the calculation
    let tilesThatWillInfluenceInCalculations =
      checkTilesThatWillInfluenceInTheCalculations(
        gameBoard,
        [passer.ubicationX!, passer.ubicationY!],
        [receiver.ubicationX!, receiver.ubicationY!],
      );

    function calculateDefensivePointsPerDefensor(
      player: Player,
      inPassLine: boolean,
    ) {
      let points = 0;
      let playerZoneUbication = playerZone(player, player.team == "TeamB");

      //Do math to calculate points on each sector
      if (playerZoneUbication == ranges.closeToTheRim.id) {
        points =
          player.insideDefence * 3 +
          player.atleticism +
          player.height -
          190 +
          roll20SidesDice() * 3;
      } else if (
        playerZoneUbication == ranges.inShortRange.id ||
        playerZoneUbication == ranges.behindTheBoard.id
      ) {
        points =
          player.insideDefence * 1.5 +
          player.perimeterDefence * 1.5 +
          player.atleticism +
          player.height * 0.5 -
          170 +
          roll20SidesDice() * 3;
      } else if (playerZoneUbication == ranges.inMidRange.id) {
        points =
          player.insideDefence +
          player.perimeterDefence * 2 +
          player.atleticism +
          100 / (player.weight - 50) +
          roll20SidesDice() * 3;
      } else if (
        (playerZoneUbication as number) >= ranges.outsideThe3PointLine.id
      ) {
        points =
          player.perimeterDefence * 3 +
          player.atleticism +
          100 / player.weight +
          roll20SidesDice() * 3;
      }

      if (!inPassLine) {
        points = points * 0.2;
      }

      if (defensorWithTheHighestDefensivePoints[1]! < points) {
        defensorWithTheHighestDefensivePoints = [player, points];
      }

      return points;
    }

    function checkDefensivePlayersPoints(
      i: number,
      team: Team,
      arrayOfUbications: any[] | [number[]],
      inPassLine: boolean,
    ) {
      //Check every player to know his defensive points for this situation
      team.players.forEach((player) => {
        if (
          player.ubicationX == arrayOfUbications[i][0] &&
          player.ubicationY == arrayOfUbications[i][1]
        ) {
          let defensivePlayerPoints = calculateDefensivePointsPerDefensor(
            player,
            inPassLine,
          );

          if (player.lastAction == "Overwhelming waiting") {
            defensivePlayerPoints = defensivePlayerPoints * 1.2;
          }

          newGameNarration.unshift(
            `${player.name} (Defender) gets ${defensivePlayerPoints} defensive points`,
          );

          totalDefensivePoints += defensivePlayerPoints;
        }
      });
    }

    //I loop on the tiles where the ball goes over to set the defender team points in this situation
    for (let i = 0; i < tilesThatWillInfluenceInCalculations[0].length; i++) {
      if (teamDefending == this.teamA.name) {
        checkDefensivePlayersPoints(
          i,
          this.teamA,
          tilesThatWillInfluenceInCalculations[0],
          true,
        );
      } else if (teamDefending == this.teamB.name) {
        checkDefensivePlayersPoints(
          i,
          this.teamB,
          tilesThatWillInfluenceInCalculations[0],
          true,
        );
      }
    }

    //I loop on the tiles where the ball goes close to it to set the defender team points in this situation
    for (let i = 0; i < tilesThatWillInfluenceInCalculations[1].length; i++) {
      if (teamDefending == this.teamA.name) {
        checkDefensivePlayersPoints(
          i,
          this.teamA,
          tilesThatWillInfluenceInCalculations[1],
          false,
        );
      } else if (teamDefending == this.teamB.name) {
        checkDefensivePlayersPoints(
          i,
          this.teamB,
          tilesThatWillInfluenceInCalculations[1],
          false,
        );
      }
    }

    newGameNarration.unshift(
      `The total defensive points are ${Number(totalDefensivePoints).toFixed(2)}`,
    );
    newGameNarration.unshift(
      `${passer.name || playerPositionDetection(passer.position) + " of team " + passer.team} gets ${Number(passer.actionPoints).toFixed(2)} pass points`,
    );

    passer.setLastAction("pass");
    passer.subtractActionPoints(0.5);
    passer.setHaveBall(false);

    //If the pass have more points than the defensive points
    if (passPoints >= totalDefensivePoints) {
      //The receiver gets the ball
      receiver.setHaveBall(true);
      newGameNarration.unshift(
        `${receiver.name || playerPositionDetection(receiver.position) + " of team " + receiver.team} gets the pass and is the new ball handler`,
      );

      passerTeam.handleNewPasser(passer);

      //If the total defensive points are higher than pass points
    } else {
      //The player with the highest defensive points involved in this situation steal the ball
      defensorWithTheHighestDefensivePoints[0]!.setHaveBall(true);
      newGameNarration.unshift(
        `${defensorWithTheHighestDefensivePoints[0]!.name} has stolen the ball!`,
      );

      passerTeam.resetLastPasserForAllPlayers();
    }

    setGameNarration(() => newGameNarration);
  }

  //It returns a boolean saying if the dribbling is succesfull and the higher player defensive point to give him the ball in case the dribbling is not succesfull.
  calculateIfDribblingIsSuccesfull(
    dribbler: Player,
    endingUbication: number[],
    gameBoard: [[]],
  ) {
    //I set dribbler as default player with the ball
    let playerWithBallAfterCalculations = dribbler;
    let dribblerTeam = dribbler.team == "TeamA" ? this.teamA : this.teamB;

    dribblerTeam.resetLastPasserForAllPlayers();

    let tilesThatWillInfluenceInCalculations =
      checkTilesThatWillInfluenceInTheCalculations(
        gameBoard,
        [dribbler.ubicationX!, dribbler.ubicationY!],
        endingUbication,
      ).flat(); //In this case there will be no defeders in the tile of the ball

    let defensivePlayers = [] as Player[];

    function getDefensivePlayers(team: Team): Player[] {
      //The flatMap is used to avoid returning undefined values in the array
      return tilesThatWillInfluenceInCalculations.flatMap((tile) =>
        team.players.filter(
          (player) =>
            player.ubicationX === tile[0] && player.ubicationY === tile[1],
        ),
      );
    }

    if (dribbler.team == "TeamA") {
      defensivePlayers = getDefensivePlayers(this.teamB);
    } else {
      defensivePlayers = getDefensivePlayers(this.teamA);
    }

    if (defensivePlayers.length == 0) {
      //Dribbler is set as the player with the ball at this point
      return [true, playerWithBallAfterCalculations];
    }

    let dribblerPointsInAction = dribbler.getDribblerPoints();

    defensivePlayers.forEach((defender) => {
      let defenderPointsInAction = defender.getDribbleDefenderPoints();

      //If there are multiple defenders involved they get a boost based on how many they are
      switch (defensivePlayers.length) {
        case 1:
          defenderPointsInAction = defenderPointsInAction * 1;
          break;
        case 2:
          defenderPointsInAction = defenderPointsInAction * 1.1;
          break;
        case 3:
          defenderPointsInAction = defenderPointsInAction * 1.25;
          break;
        case 4:
          defenderPointsInAction = defenderPointsInAction * 1.4;
          break;
        case 5:
          defenderPointsInAction = defenderPointsInAction * 1.55;
          break;
      }

      if (defenderPointsInAction > dribblerPointsInAction) {
        return [false, defender];
      }
    });

    //If none defender could steal the ball the action is successfull
    return [true, dribbler];
  }

  handleShot(
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
    gameBoard: number[][],
  ) {
    //First i get the shooter
    let shooter = this.getShooter()!;
    let shooterTeam = shooter.team == "TeamA" ? this.teamA : this.teamB;
    let newGameNarration = [...gameNarration];

    //Then i get the ataker and defender team
    let atackingTeam = shooter.team == "TeamA" ? this.teamA : this.teamB;
    let defendingTeam = shooter.team == "TeamA" ? this.teamB : this.teamA;

    //I get in what part of the field is him located to calculate with the propper math
    let shooterZoneUbication = playerZone(shooter, shooter.team == "TeamB");

    newGameNarration.unshift(
      `${shooter.name} is attempting a shot from ${getRangeText(
        shooterZoneUbication,
      )}!`,
    );

    let isFreeThrow = this.shootingFreeThrows;

    function getShooterPointsInShot() {
      let shooterPointsInShot = 0;

      let multiplier = 1;
      if (shooter.lastAction == "Triple threat") {
        multiplier = 1.2;
      }

      //Do math to calculate points on each sector
      if (isFreeThrow) {
        shooterPointsInShot = mathShotPointsInFreeThrow(shooter);
      } else if (shooterZoneUbication == ranges.closeToTheRim.id) {
        shooterPointsInShot = mathShotPointsCloseToTheRim(multiplier, shooter);
      } else if (
        shooterZoneUbication == ranges.inShortRange.id ||
        shooterZoneUbication == ranges.behindTheBoard.id
      ) {
        shooterPointsInShot = mathShotPointsInShortRange(multiplier, shooter);
      } else if (shooterZoneUbication == ranges.inMidRange.id) {
        shooterPointsInShot = mathShotPointsInMidRange(multiplier, shooter);
      } else if (shooterZoneUbication == ranges.outsideThe3PointLine.id) {
        shooterPointsInShot = mathShotPointsCloseToThe3PointLine(
          multiplier,
          shooter,
        );
      } else if (shooterZoneUbication == ranges.long3Range.id) {
        shooterPointsInShot = mathShotPointsInLong3Range(multiplier, shooter);
      } else if (shooterZoneUbication == ranges.halfCourt.id) {
        shooterPointsInShot = mathShotPointsInHalfCourt(multiplier, shooter);
      } else if (shooterZoneUbication == ranges.behindHalfCourt.id) {
        shooterPointsInShot = mathShotPointsBehindHalfCourt(
          multiplier,
          shooter,
        );
      } else if (shooterZoneUbication == ranges.theOtherRim.id) {
        shooterPointsInShot = mathShotPointsCloseToTheOtherRim(
          multiplier,
          shooter,
        );
      }

      return shooterPointsInShot;
    }

    function getDefendersPointsInShot() {
      let totalDefendersPoints = 0;

      //If it is a free throw ther's no defenders so totalDefendersPoints is going to be 0
      if (!false /*TODO isFreeThrow*/) {
        //If it was a field shot attempt it cheks the tiles around the shooter. To do so we use one loop for the X direction and one for the Y direction
        for (let positionX = -2; positionX < 3; positionX++) {
          for (let positionY = -2; positionY < 3; positionY++) {
            //Then i ckeck if ther's a defender in the scanned ubication using the shooter ubication as center
            let defenderInThisUbication =
              defendingTeam.returnPlayerInThisPosition(
                shooter.ubicationX! + positionX,
                shooter.ubicationY! + positionY,
              );
            let defenderPoints = 0;

            //If there's a player located in this position
            if (defenderInThisUbication != undefined) {
              //I get in what part of the field is him located to calculate with the propper math
              let defenderZoneUbication = playerZone(
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
              if (defenderZoneUbication == ranges.closeToTheRim.id) {
                defenderPoints = mathDefensePointsCloseToTheRim(
                  multiplier,
                  defenderInThisUbication,
                );
              } else if (
                defenderZoneUbication == ranges.inShortRange.id ||
                defenderZoneUbication == ranges.behindTheBoard.id
              ) {
                defenderPoints = mathDefensePointsInShortRange(
                  multiplier,
                  defenderInThisUbication,
                );
              } else if (defenderZoneUbication == ranges.inMidRange.id) {
                defenderPoints = mathDefensePointsInMidRange(
                  multiplier,
                  defenderInThisUbication,
                );
              } else if (
                defenderZoneUbication == ranges.outsideThe3PointLine.id
              ) {
                defenderPoints = mathDefensePointsCloseToThe3PointLine(
                  multiplier,
                  defenderInThisUbication,
                );
              } else if (defenderZoneUbication == ranges.long3Range.id) {
                defenderPoints = mathDefensePointsLong3Range(
                  multiplier,
                  defenderInThisUbication,
                );
              } else if (
                defenderZoneUbication == ranges.halfCourt.id ||
                defenderZoneUbication == ranges.behindHalfCourt.id ||
                defenderZoneUbication == ranges.theOtherRim.id
              ) {
                defenderPoints = mathDefensePointsHalfCourtAndFartherAway(
                  multiplier,
                  defenderInThisUbication,
                );
              }

              //If the defender is right next to the shooter he gets a bonus for his defensive points
              if (Math.pow(positionX, 2) == 1 && Math.pow(positionY, 2) == 1) {
                defenderPoints = defenderPoints * 1.5;
              }
            }

            totalDefendersPoints += defenderPoints;
          }
        }
      }

      return totalDefendersPoints;
    }

    function calculateIfGoesIn() {
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

      if (shooterZoneUbication == ranges.closeToTheRim.id) {
        maxShooterPoints = mathShotPointsCloseToTheRim(
          1.2,
          maxAPlayerAtributes,
        );
      } else if (
        shooterZoneUbication == ranges.inShortRange.id ||
        shooterZoneUbication == ranges.behindTheBoard.id
      ) {
        maxShooterPoints = mathShotPointsInShortRange(1.2, maxAPlayerAtributes);
      } else if (shooterZoneUbication == ranges.inMidRange.id) {
        maxShooterPoints = mathShotPointsInMidRange(1.2, maxAPlayerAtributes);
      } else if (shooterZoneUbication == ranges.outsideThe3PointLine.id) {
        maxShooterPoints = mathShotPointsCloseToThe3PointLine(
          1.2,
          maxAPlayerAtributes,
        );
      } else if (shooterZoneUbication == ranges.long3Range.id) {
        maxShooterPoints = mathShotPointsInLong3Range(1.2, maxAPlayerAtributes);
      } else if (shooterZoneUbication == ranges.halfCourt.id) {
        maxShooterPoints = mathShotPointsInHalfCourt(1.2, maxAPlayerAtributes);
      } else if (shooterZoneUbication == ranges.behindHalfCourt.id) {
        maxShooterPoints = mathShotPointsBehindHalfCourt(
          1.2,
          maxAPlayerAtributes,
        );
      } else if (shooterZoneUbication == ranges.theOtherRim.id) {
        maxShooterPoints = mathShotPointsCloseToTheOtherRim(
          1.2,
          maxAPlayerAtributes,
        );
      } else {
        maxShooterPoints = 0;
      }

      let allDefendersPointsInShotSumatory = getDefendersPointsInShot();
      let maxSingleDefenderPoints: number;

      if (shooterZoneUbication == ranges.closeToTheRim.id) {
        maxSingleDefenderPoints = mathDefensePointsCloseToTheRim(
          1.4,
          maxPosiblePlayerAtributes,
        );
      } else if (
        shooterZoneUbication == ranges.inShortRange.id ||
        shooterZoneUbication == ranges.behindTheBoard.id
      ) {
        maxSingleDefenderPoints = mathDefensePointsInShortRange(
          1.4,
          maxPosiblePlayerAtributes,
        );
      } else if (shooterZoneUbication == ranges.inMidRange.id) {
        maxSingleDefenderPoints = mathDefensePointsInMidRange(
          1.4,
          maxPosiblePlayerAtributes,
        );
      } else if (shooterZoneUbication == ranges.outsideThe3PointLine.id) {
        maxSingleDefenderPoints = mathDefensePointsCloseToThe3PointLine(
          1.4,
          maxPosiblePlayerAtributes,
        );
      } else if (shooterZoneUbication == ranges.long3Range.id) {
        maxSingleDefenderPoints = mathDefensePointsLong3Range(
          1.4,
          maxPosiblePlayerAtributes,
        );
      } else if (
        shooterZoneUbication == ranges.halfCourt.id ||
        shooterZoneUbication == ranges.behindHalfCourt.id ||
        shooterZoneUbication == ranges.theOtherRim.id
      ) {
        maxSingleDefenderPoints = mathDefensePointsHalfCourtAndFartherAway(
          1.4,
          maxPosiblePlayerAtributes,
        );
      } else {
        maxSingleDefenderPoints = 0;
      }

      let dShooterPointsVsMaxPossiblePointsPercentage =
        (shooterPointsInShot * 100) / maxShooterPoints;
      newGameNarration.unshift(
        `${shooter.name} (Shooter) gets ${dShooterPointsVsMaxPossiblePointsPercentage} points in the shot`,
      );

      let dDefendersPointsVsSinlgePlayerMaxPossiblePointsPercentage =
        allDefendersPointsInShotSumatory == 0
          ? 0
          : (allDefendersPointsInShotSumatory * 100) / maxSingleDefenderPoints;
      allDefendersPointsInShotSumatory == 0
        ? newGameNarration.unshift(
            `Defenders can do nothing against the shooter`,
          )
        : newGameNarration.unshift(
            `The defenders get ${dDefendersPointsVsSinlgePlayerMaxPossiblePointsPercentage} defensive points in total`,
          );

      let pointsDif =
        dShooterPointsVsMaxPossiblePointsPercentage -
        dDefendersPointsVsSinlgePlayerMaxPossiblePointsPercentage;

      //Use all prev data to calculate if it goes in
      //First get a dice roll
      let shotDiceRoll = roll20SidesDice();

      if (dDefendersPointsVsSinlgePlayerMaxPossiblePointsPercentage < 100) {
        if (shooterZoneUbication == ranges.closeToTheRim.id) {
          isItIn =
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
            (pointsDif > -25 && shotDiceRoll > 19);
        } else if (
          shooterZoneUbication == ranges.inShortRange.id ||
          shooterZoneUbication == ranges.behindTheBoard.id
        ) {
          isItIn =
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
            (pointsDif > -3 && shotDiceRoll > 19);
        } else if (shooterZoneUbication == ranges.inMidRange.id) {
          isItIn =
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
            (pointsDif > 3 && shotDiceRoll > 19);
        } else if (shooterZoneUbication == ranges.outsideThe3PointLine.id) {
          isItIn =
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
            (pointsDif > 13 && shotDiceRoll > 19);
        } else if (shooterZoneUbication == ranges.long3Range.id) {
          isItIn =
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
            (pointsDif > 20 && shotDiceRoll > 19);
        } else if (shooterZoneUbication == ranges.halfCourt.id) {
          isItIn =
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
            (pointsDif > 31 && shotDiceRoll > 19);
        } else if (shooterZoneUbication == ranges.behindHalfCourt.id) {
          isItIn =
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
            (pointsDif > 37 && shotDiceRoll > 19);
        } else if (shooterZoneUbication == ranges.theOtherRim.id) {
          isItIn =
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
            (pointsDif > 42 && shotDiceRoll > 19);
        }
      }

      return isItIn;
    }

    let pointsToAdd = 0;
    let isItIn = calculateIfGoesIn();
    let newPlayerWithBall: Player;

    let asistant = atackingTeam.players.find((player) => player.lastPasser);

    if (isItIn) {
      if (/*TODO isFreeThrow*/ false) {
        newGameNarration.unshift(
          `The ball goes in! The team ${atackingTeam.name} add 1 point to the scoreboard`,
        );
        pointsToAdd = 1;
      } else if (
        shooterZoneUbication == ranges.closeToTheRim.id ||
        shooterZoneUbication == ranges.inShortRange.id ||
        shooterZoneUbication == ranges.behindTheBoard.id ||
        shooterZoneUbication == ranges.inMidRange.id
      ) {
        newGameNarration.unshift(
          `The ball goes in! The team ${atackingTeam.name} add 2 points to the scoreboard`,
        );
        pointsToAdd = 2;
      } else {
        newGameNarration.unshift(
          `The ball goes in! The team ${atackingTeam.name} add 3 points to the scoreboard`,
        );
        pointsToAdd = 3;
      }

      //After that i handle who get's the ball after the shot
      newPlayerWithBall = this.getClosestDefenderToTheRim(defendingTeam);
      newPlayerWithBall.movePlayerToOwnRim();
      newPlayerWithBall.setHaveBall(true);
      newGameNarration.unshift(
        `${newPlayerWithBall.name} get the ball to start theyr posetion`,
      );
    } else {
      //If it doesn't goes in handle who get's the rebound
      newPlayerWithBall = this.getRebounder(shooter, gameBoard);
      newPlayerWithBall.statsAddRebound(atackingTeam);
      newPlayerWithBall.setLastAction(
        newPlayerWithBall.team == atackingTeam.name ? "get O reb" : "get D reb",
      );
      newGameNarration.unshift(
        `The shot is off ${
          newPlayerWithBall.team == atackingTeam.name ? "but" : "and"
        } ${newPlayerWithBall.name} gets the rebound!`,
      );
      shooterTeam.resetLastPasserForAllPlayers();
    }

    //Then i handle the players status and stats
    shooter.setHaveBall(false);
    shooter.statsAddShotAttempt(
      pointsToAdd,
      isItIn,
      /*TODO isFreeThrow*/ false,
    );
    shooter.setShotAttempt(false);

    if (asistant) {
      asistant.statsAddAssist();
    }

    newPlayerWithBall.setHaveBall(true);

    //Finally i handle the team stats
    atackingTeam.statsAddShotAttempt(
      pointsToAdd,
      isItIn,
      !!asistant,
      /*TODO check if there was a foul*/ false,
    );

    //TODO (But not here) passerTeam.resetLastPasserForAllPlayers(); when buzzer sound

    if (!isItIn) {
      if (newPlayerWithBall.team == atackingTeam.name) {
        atackingTeam.statsAddRebound(atackingTeam);
      } else {
        defendingTeam.statsAddRebound(atackingTeam);
      }
    }

    setGameNarration(() => newGameNarration);

    this.setShotHasBeenAttempted(false);
  }

  handlePlayerWait(
    type: string,
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
    gameBoard: number[][],
  ) {
    let activePlayer = this.getActivePlayer()!;

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
      gameBoard,
      narrationText,
    );
  }

  setShotHasBeenAttempted(value: boolean) {
    this.shotHasBeenAttempted = value;
  }

  //------------------------------------END PLAYER ACTIONS METHODS----------------------------------------------------------------------------------------------------------

  //-----------------------------------START MATCH HANDLER METHODS----------------------------------------------------------------------------------------------------------
  setTeamTurn(team: string) {
    this.teamTurn = team;
  }

  getRebounder(shooter: Player, gameBoard: number[][]) {
    //TODO make this function
    let rebounder: Player;

    let teamAAtacking = shooter.team == "TeamA";

    let shotDirectionY =
      shooter.ubicationY! == 8
        ? "middle"
        : shooter.ubicationY! < 8
          ? "top"
          : "bottom";

    let shotDistanceY = getShotDistance(shooter, "Y");
    let shotDistanceX = getShotDistance(shooter, "X");

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

    let closestPlayersToWhereBallLands = getClosestPlayers(
      gameBoard,
      [...this.teamA.players, ...this.teamB.players],
      whereItReboundsTo,
    );

    return rebounder!;
  }

  handleEndTurn(
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
    gameBoard: number[][],
    currentGameNarration?: string,
  ) {
    // console.log("handleEndTurn: ");
    let activePlayer = this.getActivePlayer();
    // console.log("activePlayer: ", activePlayer);

    const newGameNarration = [...gameNarration];

    if (currentGameNarration) {
      newGameNarration.unshift(currentGameNarration);
    }

    activePlayer!.setActivePlayer(false);
    activePlayer!.setPlayerSelected(false);

    activePlayer!.resetActionPoints();
    activePlayer!.setPlayerHaveTurn(false);
    activePlayer!.setMovementLeft(false);

    let selectedPlayers = this.getSelectedPlayers();

    // console.log("selectedPlayers: ", selectedPlayers);

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
      console.log("No players selected and a teams have movement left");
      if (this.teamA.doesPlayersHaveMovement()) {
        console.log("Turn left on Team A");
        this.teamA.setTeamTurnLeft(true);
      }

      if (this.teamB.doesPlayersHaveMovement()) {
        console.log("Turn left on Team B");
        this.teamB.setTeamTurnLeft(true);
      }

      if (this.teamA.teamHaveTheBall()) {
        console.log("It's Team B turn");
        this.setTeamTurn("TeamB");
        this.teamB.setTeamTurn(true);
        newGameNarration.unshift(`It's now ${this.teamB.name} turn.`);
      } else {
        console.log("It's Team A turn");
        this.setTeamTurn("TeamA");
        this.teamA.setTeamTurn(true);
        newGameNarration.unshift(`It's now ${this.teamA.name} turn.`);
      }

      setGameNarration(() => newGameNarration);
    } else {
      console.log("No players selected and noone have movement left");
      this.runClock(gameNarration, setGameNarration, gameBoard);

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
  }

  shotAttemptedStatus() {
    let activePlayer = this.getActivePlayer()!;

    activePlayer!.setActivePlayer(false);
    activePlayer!.setPlayerSelected(false);
    activePlayer!.resetActionPoints();
    activePlayer!.setPlayerHaveTurn(false);
    activePlayer!.setMovementLeft(false);

    this.setShotHasBeenAttempted(true);
    activePlayer.setShotAttempt(true);
  }

  runClock(
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
    gameBoard: number[][],
  ) {
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
      this.handleShot(gameNarration, setGameNarration, gameBoard);
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
  }

  //------------------------------------END MATCH HANDLER METHODS-----------------------------------------------------------------------------------------------------------
}
