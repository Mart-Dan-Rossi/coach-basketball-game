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
  mathChancesMakingShotInFreeThrow,
  mathChancesMakingShotInCloseToTheRim,
  mathChancesMakingShotInShortRange,
  mathChancesMakingShotInMidRange,
  mathChancesMakingShotInCloseToThe3PointLine,
  mathChancesMakingShotInLong3Range,
  mathChancesMakingShotInHalfCourt,
  mathChancesMakingShotInBehindHalfCourt,
  mathChancesMakingShotInCloseToTheOtherRim,
  teamADefensiveFTPositions,
  getInitialBoard,
  teamBDefensiveFTPositions,
  teamAOffensiveFTPositions,
  teamBOffensiveFTPositions,
} from "../utilities/exportableFunctions";
import React from "react";
import { Player } from "./players";

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
    setGameBoard: React.Dispatch<React.SetStateAction<number[][]>>,
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
              player.name && player.name.length === 0
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
    this.runClock(gameNarration, setGameNarration, gameBoard, setGameBoard);
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
        [passer.ubicationX, passer.ubicationY],
        [receiver.ubicationX, receiver.ubicationY],
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

      if (defensorWithTheHighestDefensivePoints[1] === undefined) {
        console.error(
          "defensorWithTheHighestDefensivePoints[1] undefined in calculateDefensivePointsPerDefensor",
        );
        throw new Error(
          "Error: defensorWithTheHighestDefensivePoints[1] undefined in calculateDefensivePointsPerDefensor",
        );
      }

      if (defensorWithTheHighestDefensivePoints[1] < points) {
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
            `${player.name && player.name.length === 0 ? playerPositionDetection(player.position) : player.name} (Defender) gets ${defensivePlayerPoints} defensive points`,
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
      `${passer.name && passer.name.length === 0 ? playerPositionDetection(passer.position) : passer.name} of team ${passer.team} gets ${Number(passer.actionPoints).toFixed(2)} pass points`,
    );

    passer.setLastAction("pass");
    passer.subtractActionPoints(0.5);
    passer.setHaveBall(false);

    //TODO check why this is working wonky. Even when defenders get more points the pass is succesfull.
    //If the pass have more points than the defensive points
    if (passPoints >= totalDefensivePoints) {
      //The receiver gets the ball
      receiver.setHaveBall(true);
      newGameNarration.unshift(
        `${receiver.name && receiver.name.length === 0 ? playerPositionDetection(receiver.position) : receiver.name} of team ${receiver.team} gets the pass and is the new ball handler`,
      );

      passerTeam.handleNewPasser(passer);

      //If the total defensive points are higher than pass points
    } else {
      if (defensorWithTheHighestDefensivePoints[0] === undefined) {
        console.error(
          "defensorWithTheHighestDefensivePoints[0] undefined in handlePassAction",
        );
        throw new Error(
          "Error: defensorWithTheHighestDefensivePoints[0] undefined in handlePassAction",
        );
      }

      //The player with the highest defensive points involved in this situation steal the ball
      defensorWithTheHighestDefensivePoints[0].setHaveBall(true);
      newGameNarration.unshift(
        `${defensorWithTheHighestDefensivePoints[0].name && defensorWithTheHighestDefensivePoints[0].name.length === 0 ? playerPositionDetection(defensorWithTheHighestDefensivePoints[0].position) : defensorWithTheHighestDefensivePoints[0].name} has stolen the ball!`,
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
        [dribbler.ubicationX, dribbler.ubicationY],
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

  movePlayersToReboundOnFTPositions(
    defendingTeam: Team,
    atackingTeam: Team,
    setGameBoard: React.Dispatch<React.SetStateAction<number[][]>>,
  ) {
    // console.log("In movePlayersToReboundOnFTPositions");
    const moveDefendersToReboundPositions = () => {
      // console.log("In moveDefendersToReboundPositions");
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

    const moveAtackersToReboundPositions = () => {
      // console.log("In moveAtackersToReboundPositions");
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

      setGameBoard(newBoard);
    } else {
      const newBoard = getInitialBoard("A");

      setGameBoard(newBoard);
    }

    //Modify the classes of the players
    moveDefendersToReboundPositions();
    // console.log("defendingTeam 2: ", defendingTeam);

    moveAtackersToReboundPositions();
    // console.log("atackingTeam 2: ", atackingTeam);
  }

  handleFoul(
    defender: Player,
    atacker: Player,
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
    amountOfFreeThrows?: number,
  ) {
    // console.log("In handleFoul", defender, atacker);
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
    }

    setGameNarration(() => newGameNarration);
  }

  handleShot(
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
    gameBoard: number[][],
    setGameBoard: React.Dispatch<React.SetStateAction<number[][]>>,
  ) {
    // console.log("in handle shot method");
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
    let shooterZoneUbication = playerZone(shooter, shooter.team == "TeamB");

    if (!(this.freeThrowsLeft > 0)) {
      newGameNarration.unshift(
        `${isNaN(Number(shooter.name)) ? shooter.name : shooter.position} is attempting a shot from ${getRangeText(
          shooterZoneUbication,
        )}!`,
      );
    } else {
      newGameNarration.unshift(
        `${isNaN(Number(shooter.name)) ? shooter.name : shooter.position} is attempting a shot from the free throw line`,
      );
    }

    const getShooterPointsInShot = () => {
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
    };

    const getDefendersPointsInShot = () => {
      // console.log("in getDefendersPointsInShot");
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
        // console.log(
        //   "Calculating defenders points in shot attempt for shooter: ",
        // );
        //If it was a field shot attempt it cheks the tiles around the shooter. To do so we use one loop for the X direction and one for the Y direction
        for (let positionX = -2; positionX < 3; positionX++) {
          for (let positionY = -2; positionY < 3; positionY++) {
            //Then i ckeck if ther's a defender in the scanned ubication using the shooter ubication as center
            let defenderInThisUbication =
              defendingTeam.returnPlayerInThisPosition(
                shooter.ubicationX + positionX,
                shooter.ubicationY + positionY,
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
                  shooterZoneUbication == ranges.closeToTheRim.id ||
                  shooterZoneUbication == ranges.inShortRange.id ||
                  shooterZoneUbication == ranges.behindTheBoard.id ||
                  shooterZoneUbication == ranges.inMidRange.id
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
                  amountOfFreeThrows,
                );
                // console.log("After handleFoul");
              }
            }

            totalDefendersPoints += defenderPoints;
          }
        }
      }

      return totalDefendersPoints;
    };

    const calculateIfGoesIn = () => {
      // console.log("In calculateIfGoesIn");
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
      } else if (this.freeThrowsLeft > 0) {
        maxShooterPoints = mathShotPointsInFreeThrow(maxAPlayerAtributes);
      } else {
        maxShooterPoints = 0;
      }

      let allDefendersPointsInShotSumatory = getDefendersPointsInShot();
      let maxSingleDefenderPoints = 0;

      if (!(this.freeThrowsLeft > 0)) {
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
          if (shooterZoneUbication == ranges.closeToTheRim.id) {
            isItIn = mathChancesMakingShotInCloseToTheRim(
              pointsDif,
              shotDiceRoll,
            );
          } else if (
            shooterZoneUbication == ranges.inShortRange.id ||
            shooterZoneUbication == ranges.behindTheBoard.id
          ) {
            isItIn = mathChancesMakingShotInShortRange(pointsDif, shotDiceRoll);
          } else if (shooterZoneUbication == ranges.inMidRange.id) {
            isItIn = mathChancesMakingShotInMidRange(pointsDif, shotDiceRoll);
          } else if (shooterZoneUbication == ranges.outsideThe3PointLine.id) {
            isItIn = mathChancesMakingShotInCloseToThe3PointLine(
              pointsDif,
              shotDiceRoll,
            );
          } else if (shooterZoneUbication == ranges.long3Range.id) {
            isItIn = mathChancesMakingShotInLong3Range(pointsDif, shotDiceRoll);
          } else if (shooterZoneUbication == ranges.halfCourt.id) {
            isItIn = mathChancesMakingShotInHalfCourt(pointsDif, shotDiceRoll);
          } else if (shooterZoneUbication == ranges.behindHalfCourt.id) {
            isItIn = mathChancesMakingShotInBehindHalfCourt(
              pointsDif,
              shotDiceRoll,
            );
          } else if (shooterZoneUbication == ranges.theOtherRim.id) {
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

    // WIP move players to FT rebounding positions in FT serie
    if (this.isFreeThrowSerie && this.isFirstFreeThrowInTheSerie) {
      this.movePlayersToReboundOnFTPositions(
        defendingTeam,
        atackingTeam,
        setGameBoard,
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
          shooterZoneUbication == ranges.closeToTheRim.id ||
          shooterZoneUbication == ranges.inShortRange.id ||
          shooterZoneUbication == ranges.behindTheBoard.id ||
          shooterZoneUbication == ranges.inMidRange.id
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

        //TODO make the closest player to the rim get the ball when is a field goal
        //After that i handle who get's the ball after the shot
        newPlayerWithBall = defendingTeam.players.find(
          (player) => player.position == "C",
        );

        if (newPlayerWithBall) {
          newPlayerWithBall.movePlayerToOwnRim();
          newPlayerWithBall.setHaveBall(true);
          newGameNarration.unshift(
            `${isNaN(Number(newPlayerWithBall.name)) ? newPlayerWithBall.name : newPlayerWithBall.position} get the ball to start theyr posetion`,
          );
        } else {
          console.error("newPlayerWithBall not found in calculateIfGoesIn");
          throw new Error(
            "Error: newPlayerWithBall not found in calculateIfGoesIn while handling shot",
          );
        }
      }
    } else {
      //If the shot is off
      if (this.freeThrowsLeft == 0) {
        //TODO calculate rebound result

        //If it doesn't goes in handle who get's the rebound
        newPlayerWithBall = this.getRebounder(shooter, gameBoard);
        if (newPlayerWithBall) {
          newPlayerWithBall.statsAddRebound(atackingTeam);
          newPlayerWithBall.setLastAction(
            newPlayerWithBall.team == atackingTeam.name ? "getOReb" : "getDReb",
          );

          newGameNarration.unshift(
            `The shot is off ${
              newPlayerWithBall.team == atackingTeam.name ? "but" : "and"
            } ${isNaN(Number(newPlayerWithBall.name)) ? newPlayerWithBall.name : newPlayerWithBall.position} gets the rebound!`,
          );
          shooterTeam.resetLastPasserForAllPlayers();

          shooter.setShotAttempt(false);
        } else {
          console.error(
            "newPlayerWithBall not found in calculateIfGoesIn, the rebound section",
          );
          throw new Error(
            "Error: newPlayerWithBall not found in calculateIfGoesIn, the rebound section while handling shot",
          );
        }
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
      // console.log("Shooting free throw");

      this.freeThrowsLeft--;

      this.handleShot(
        newGameNarration,
        setGameNarration,
        gameBoard,
        setGameBoard,
      );

      return;
    }

    // console.log("End FT sequence");
    // TODO uncomment this line
    // newPlayerWithBall.setHaveBall(true);

    this.teamA.resetLastPasserForAllPlayers();
    this.teamB.resetLastPasserForAllPlayers();

    // TODO uncomment this line
    // if (!isItIn) {
    //   if (newPlayerWithBall.team == atackingTeam.name) {
    //     atackingTeam.statsAddRebound(atackingTeam);
    //   } else {
    //     defendingTeam.statsAddRebound(atackingTeam);
    //   }
    // }

    setGameNarration(() => newGameNarration);

    this.setShotHasBeenAttempted(false);
    //End free throw series
    this.isFreeThrowSerie = false;
  }

  handlePlayerWait(
    type: string,
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
    gameBoard: number[][],
    setGameBoard: React.Dispatch<React.SetStateAction<number[][]>>,
  ) {
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
        gameBoard,
        setGameBoard,
        narrationText,
        // If it's withCaution or tripleTheat return true, otherwise return false
        !!(type == "withCaution" || type == "tripleThreat"),
      );
    } else {
      console.error("activePlayer not found in handlePlayerWait");
      throw new Error("Error: activePlayer not found in handlePlayerWait");
    }
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

    let closestPlayersToWhereBallLands = getClosestPlayers(
      [...this.teamA.players, ...this.teamB.players],
      whereItReboundsTo,
    );

    //TODO fix rebounding function
    throw new Error("Rebound function not ended");
    return closestPlayersToWhereBallLands[0];
    // return rebounder;
  }

  handleEndTurn(
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
    gameBoard: number[][],
    setGameBoard: React.Dispatch<React.SetStateAction<number[][]>>,
    currentGameNarration?: string | undefined,
    isWaitingAction?: boolean,
  ) {
    // console.log("handleEndTurn: ");
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
          this.runClock(
            gameNarration,
            setGameNarration,
            gameBoard,
            setGameBoard,
          );

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
    } else {
      console.error("activePlayer not found in handleEndTurn");
      throw new Error("Error: activePlayer not found in handleEndTurn");
    }
  }

  addWaitingPlayersClose(isOnMove?: boolean) {
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

  searchForWaitingPlayersClose(opositeTeam: Team, shouldSetTeamTurn?: boolean) {
    let activePlayer = this.getActivePlayer();
    let selectedPlayers = this.getSelectedPlayers();
    let previousWaitingPlayers = [...this.waitingPlayers];
    let newWaitingPlayers = [] as Player[];

    if (activePlayer) {
      for (let i = -2; i < 3; i++) {
        for (let j = -2; j < 3; j++) {
          let playerInThisUbication = opositeTeam.returnPlayerInThisPosition(
            activePlayer.ubicationX + i,
            activePlayer.ubicationY + j,
          );

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

  shotAttemptedStatus() {
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

  runClock(
    gameNarration: string[],
    setGameNarration: React.Dispatch<React.SetStateAction<string[]>>,
    gameBoard: number[][],
    setGameBoard: React.Dispatch<React.SetStateAction<number[][]>>,
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
      this.handleShot(gameNarration, setGameNarration, gameBoard, setGameBoard);
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
