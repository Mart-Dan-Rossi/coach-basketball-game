import { GameContext } from "./GameContext";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  compareIniciatives,
  getInitialPlayerStatsOnCreation,
} from "../utilities/exportableFunctions";
import { initialGameBoard } from "../utilities/exportableFunctions";
import { Team } from "../entities/team";
import { Player } from "../entities/players";
import { Match } from "../entities/match";

interface props {
  children: JSX.Element | JSX.Element[];
}

export const GameContextProvider = ({ children }: props) => {
  const [playerA1Stats, setPlayerA1Stats] = useState(
    getInitialPlayerStatsOnCreation("1")
  );

  const [playerA2Stats, setPlayerA2Stats] = useState(
    getInitialPlayerStatsOnCreation("2")
  );

  const [playerA3Stats, setPlayerA3Stats] = useState(
    getInitialPlayerStatsOnCreation("3")
  );

  const [playerA4Stats, setPlayerA4Stats] = useState(
    getInitialPlayerStatsOnCreation("4")
  );

  const [playerA5Stats, setPlayerA5Stats] = useState(
    getInitialPlayerStatsOnCreation("5")
  );

  const [teamAStats, setTeamAStats] = useState({
    playerA1Stats,
    playerA2Stats,
    playerA3Stats,
    playerA4Stats,
    playerA5Stats,
  });

  const [playerB1Stats, setPlayerB1Stats] = useState(
    getInitialPlayerStatsOnCreation("1")
  );

  const [playerB2Stats, setPlayerB2Stats] = useState(
    getInitialPlayerStatsOnCreation("2")
  );

  const [playerB3Stats, setPlayerB3Stats] = useState(
    getInitialPlayerStatsOnCreation("3")
  );

  const [playerB4Stats, setPlayerB4Stats] = useState(
    getInitialPlayerStatsOnCreation("4")
  );

  const [playerB5Stats, setPlayerB5Stats] = useState(
    getInitialPlayerStatsOnCreation("5")
  );

  const [teamBStats, setTeamBStats] = useState({
    playerB1Stats,
    playerB2Stats,
    playerB3Stats,
    playerB4Stats,
    playerB5Stats,
  });

  const [teamsCreated, setTeamsCreated] = useState(false);

  const initialPointsUsedInStats = {
    height: 0,
    weight: 0,
    atleticism: 0,
    perimeterDefence: 0,
    insideDefence: 0,
    rebounding: 0,
    perimeterScoring: 0,
    insideScoring: 0,
    playMaking: 0,
  };

  const [pointsUsedInPlayerA1, setPointsUsedInPlayerA1] = useState(0);
  const [pointsUsedInStatsPlayerA1, setPointsUsedInStatsPlayerA1] = useState(
    initialPointsUsedInStats
  );

  const [pointsUsedInPlayerA2, setPointsUsedInPlayerA2] = useState(0);
  const [pointsUsedInStatsPlayerA2, setPointsUsedInStatsPlayerA2] = useState(
    initialPointsUsedInStats
  );

  const [pointsUsedInPlayerA3, setPointsUsedInPlayerA3] = useState(0);
  const [pointsUsedInStatsPlayerA3, setPointsUsedInStatsPlayerA3] = useState(
    initialPointsUsedInStats
  );

  const [pointsUsedInPlayerA4, setPointsUsedInPlayerA4] = useState(0);
  const [pointsUsedInStatsPlayerA4, setPointsUsedInStatsPlayerA4] = useState(
    initialPointsUsedInStats
  );

  const [pointsUsedInPlayerA5, setPointsUsedInPlayerA5] = useState(0);
  const [pointsUsedInStatsPlayerA5, setPointsUsedInStatsPlayerA5] = useState(
    initialPointsUsedInStats
  );

  const [pointsUsedInPlayerB1, setPointsUsedInPlayerB1] = useState(0);
  const [pointsUsedInStatsPlayerB1, setPointsUsedInStatsPlayerB1] = useState(
    initialPointsUsedInStats
  );

  const [pointsUsedInPlayerB2, setPointsUsedInPlayerB2] = useState(0);
  const [pointsUsedInStatsPlayerB2, setPointsUsedInStatsPlayerB2] = useState(
    initialPointsUsedInStats
  );

  const [pointsUsedInPlayerB3, setPointsUsedInPlayerB3] = useState(0);
  const [pointsUsedInStatsPlayerB3, setPointsUsedInStatsPlayerB3] = useState(
    initialPointsUsedInStats
  );

  const [pointsUsedInPlayerB4, setPointsUsedInPlayerB4] = useState(0);
  const [pointsUsedInStatsPlayerB4, setPointsUsedInStatsPlayerB4] = useState(
    initialPointsUsedInStats
  );

  const [pointsUsedInPlayerB5, setPointsUsedInPlayerB5] = useState(0);
  const [pointsUsedInStatsPlayerB5, setPointsUsedInStatsPlayerB5] = useState(
    initialPointsUsedInStats
  );

  const [gameNarration, setGameNarration] = useState(["Game narration."]);

  const [showMoveButton, setShowMoveButton] = useState(false);

  const [showStealAttemptButton, setShowStealAttemptButton] = useState(false);

  const [showInterceptPassAttemptButton, setShowInterceptPassAttemptButton] =
    useState(false);

  const [showWaitPressingButton, setShowWaitPressingButton] = useState(false);

  const [showWaitCarefullyButton, setShowWaitCarefullyButton] = useState(false);

  const [showPassButton, setShowPassButton] = useState(false);

  const [showDribblingButton, setShowDribblingButton] = useState(false);

  const [showWaitWithoutTheBallButton, setShowWaitWithoutTheBallButton] =
    useState(false);

  const [showTripleThreatButton, setShowTripleThreatButton] = useState(false);

  const [showShootButton, setShowShootButton] = useState(false);

  const [showEndTurnButton, setShowEndTurnButton] = useState(false);

  const [activateConfirmButton, setActivateConfirmButton] = useState(false);

  const [actionConfirmed, setActionConfirmed] = useState("");
  const [finalisingAction, setFinalisingAction] = useState(false);

  const [confirmButtonHandler, setConfirmButtonHandler] = useState(
    () => () => {}
  );

  function hideActionsButtons() {
    setShowMoveButton(false);
    setShowStealAttemptButton(false);
    setShowInterceptPassAttemptButton(false);
    setShowWaitPressingButton(false);
    setShowWaitCarefullyButton(false);
    setShowPassButton(false);
    setShowDribblingButton(false);
    setShowWaitWithoutTheBallButton(false);
    setShowTripleThreatButton(false);
    setShowShootButton(false);
    setShowEndTurnButton(false);
  }

  function movePlayer(activePlayer: Player, dx: number, dy: number) {
    return () => () => {
      gameBoard[activePlayer.ubicationY! - 1][activePlayer.ubicationX! - 1] = 0;

      let actionPointsToDecrease =
        Math.pow(dx, 2) + Math.pow(dy, 2) == 2 ? 1.5 : 1;
      activePlayer!.restActionPoints(actionPointsToDecrease);

      activePlayer.movePlayer(dx, dy);
      gameBoard[activePlayer.ubicationY! - 1][activePlayer.ubicationX! - 1] =
        activePlayer.team == "TeamA" ? 1 : 2;

      activePlayer.setLastAction(actionConfirmed);

      setActionConfirmed("");

      setMatchState(match);

      setActivateConfirmButton(false);
    };
  }

  function clickTileHandler(teamNumber: number, col: number, row: number) {
    if (actionConfirmed == "move" || actionConfirmed == "dribbling") {
      return () => {
        let thisUbication = [col, row];
        let activePlayer = matchState.getActivePlayer()!;

        for (let dx = -1; dx < 2; dx++) {
          for (let dy = -1; dy < 2; dy++) {
            //Don't add class to player tile

            if (!(dx == 0 && dy == 0)) {
              //If the scanned ubication is around the active player
              if (
                activePlayer.ubicationX! + dx == thisUbication[0] &&
                activePlayer.ubicationY! + dy == thisUbication[1]
              ) {
                //The player have more than 1.5 action points and the tile is in the diagonal or less than 1.5 points and the sile is next to the player
                if (
                  (activePlayer.actionPoints >= 1.5 &&
                    Math.pow(dx, 2) + Math.pow(dy, 2) == 2) ||
                  (activePlayer.actionPoints >= 1 && (dx == 0 || dy == 0))
                ) {
                  if (teamNumber == 0) {
                    setTileClicked(thisUbication);
                    setFinalisingAction(false);

                    setConfirmButtonHandler(movePlayer(activePlayer, dx, dy));
                  }

                  setActivateConfirmButton(true);
                }
              }
            }
          }
        }
      };
    } else if (actionConfirmed == "pass") {
      return () => {
        let thisUbication = [col, row];

        if (teamNumber != 0) {
          let team = teamNumber == 1 ? matchState.teamA : matchState.teamB;
          let setPlayerClicked =
            teamNumber == 1 ? setPlayerClikedTeamA : setPlayerClikedTeamB;

          setPlayerClicked(thisUbication);

          team.players.forEach((player) => {
            if (
              !player.playerActive &&
              player.ubicationX == col &&
              player.ubicationY == row
            ) {
              setFinalisingAction(false);

              setConfirmButtonHandler(confirmPassToPlayer(team, thisUbication));

              setActivateConfirmButton(true);
            }
          });
        }
      };
    } else {
      return () => {
        let thisUbication = [col, row];

        if (teamNumber != 0) {
          if (teamNumber == 1) {
            if (matchState.teamA.teamTurn) {
              setPlayerClikedTeamA([col, row]);

              if (!matchState.teamA.isAnyPlayerSelected()) {
                setConfirmButtonHandler(
                  () => () =>
                    confirmPlayerSelection(
                      matchState.teamA,
                      thisUbication,
                      matchState.teamB
                    )
                );
              }

              setActivateConfirmButton(true);
            }
          } else if (teamNumber == 2) {
            if (matchState.teamB.teamTurn) {
              setPlayerClikedTeamB([col, row]);

              if (!matchState.teamB.isAnyPlayerSelected()) {
                setConfirmButtonHandler(
                  () => () =>
                    confirmPlayerSelection(
                      matchState.teamB,
                      thisUbication,
                      matchState.teamA
                    )
                );
              }

              setActivateConfirmButton(true);
            }
          }
        }
      };
    }
  }

  function confirmPassToPlayer(team: Team, ubicationScaned: number[]) {
    return () => () => {
      let receiver: Player;
      let passer = matchState.getActivePlayer()!;

      team.players.forEach((player) => {
        let playerUbication = [player.ubicationX, player.ubicationY];

        if (
          playerUbication[0] == ubicationScaned[0] &&
          playerUbication[1] == ubicationScaned[1]
        ) {
          player.setHaveBall(false);
          receiver = player;
        }
      });

      matchState.handlePassAction(
        passer,
        receiver!,
        gameBoard,
        gameNarration,
        setGameNarration
      );

      if (passer.team == "TeamA") {
        setPlayerClikedTeamA([0, 0]);
      } else {
        setPlayerClikedTeamB([0, 0]);
      }

      setActionConfirmed("");

      setMatchState(matchState);

      setActivateConfirmButton(false);
    };
  }

  function confirmPlayerSelection(
    team: Team,
    ubicationScaned: number[],
    otherTeam: Team
  ) {
    let teamStillHaveTurnLeft = false;
    team.players.forEach((player) => {
      if (!teamStillHaveTurnLeft && player.playerHaveTurn) {
        teamStillHaveTurnLeft = player.playerHaveTurn;
      }

      let playerUbication = [player.ubicationX, player.ubicationY];

      if (
        playerUbication[0] == ubicationScaned[0] &&
        playerUbication[1] == ubicationScaned[1]
      ) {
        player.setPlayerSelected(true);
      }
    });

    team.setTeamTurn(false);
    team.setTeamTurnLeft(false);

    let playerActive: Player;

    if (otherTeam.teamTurnLeft) {
      otherTeam.setTeamTurn(true);
    } else {
      playerActive = compareIniciatives(
        matchState.teamA.returnSelectedPlayer()!,
        matchState.teamB.returnSelectedPlayer()!,
        matchState.teamA.getPlayerWithBallOrUndefined()
      );

      playerActive.setActivePlayer(true);
      playerActive.setPlayerSelected(false);

      if (playerActive.team == "TeamA") {
        setPlayerClikedTeamA([0, 0]);
      } else {
        setPlayerClikedTeamB([0, 0]);
      }
    }

    setActivateConfirmButton(false);
  }

  const [tileClicked, setTileClicked] = useState([0, 0]);

  const [playerClikedTeamA, setPlayerClikedTeamA] = useState([0, 0]);
  const [playerClikedTeamB, setPlayerClikedTeamB] = useState([0, 0]);

  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function addClassIfNeeded(teamNumber: number, col: number, row: number) {
    let thisUbication = [col, row];

    if (actionConfirmed != "") {
      let activePlayer = matchState.getActivePlayer()!;

      if (
        actionConfirmed == "move" ||
        actionConfirmed == "dribbling" ||
        actionConfirmed == "pass"
      ) {
        finalisingAction && setActivateConfirmButton(false);
        hideActionsButtons();
      } else {
        setActivateConfirmButton(false);

        let teamASelectedPlayer = matchState.teamA.getSelectedPlayer();
        let teamBSelectedPlayer = matchState.teamB.getSelectedPlayer();

        if (!teamASelectedPlayer && !teamBSelectedPlayer) {
          hideActionsButtons();
        }

        if (col == 28 && row == 15) {
          setActionConfirmed("");
        }
      }

      if (actionConfirmed == "move" || actionConfirmed == "dribbling") {
        for (let dx = -1; dx < 2; dx++) {
          for (let dy = -1; dy < 2; dy++) {
            //Don't add class to player tile

            if (!(dx == 0 && dy == 0)) {
              //If the scanned ubication is around the active player
              if (
                activePlayer.ubicationX! + dx == thisUbication[0] &&
                activePlayer.ubicationY! + dy == thisUbication[1]
              ) {
                //The player have more than 1.5 action points and the tile is in the diagonal or less than 1.5 points and the sile is next to the player
                if (
                  (activePlayer.actionPoints >= 1.5 &&
                    Math.pow(dx, 2) + Math.pow(dy, 2) == 2) ||
                  (activePlayer.actionPoints >= 1 && (dx == 0 || dy == 0))
                ) {
                  if (teamNumber == 0) {
                    if (
                      tileClicked[0] == thisUbication[0] &&
                      tileClicked[1] == thisUbication[1]
                    ) {
                      return "selected-tile pointer";
                    } else {
                      return "highlighted-tile pointer";
                    }
                  }
                }
              }
            }
          }
        }
      }

      if (actionConfirmed == "pass") {
        let activePlayer = matchState.getActivePlayer();

        if (
          activePlayer!.ubicationX == thisUbication[0] &&
          activePlayer!.ubicationY == thisUbication[1]
        ) {
          return "active-tile";
        } else if (teamNumber == (activePlayer!.team == "TeamA" ? 1 : 2)) {
          if (
            (playerClikedTeamA[0] == col && playerClikedTeamA[1] == row) ||
            (playerClikedTeamB[0] == col && playerClikedTeamB[1] == row)
          ) {
            return "selected-tile";
          } else {
            return "highlighted-tile";
          }
        }
      }

      if (actionConfirmed == "end turn") {
        hideActionsButtons();

        setPlayerClikedTeamA([0, 0]);
        setPlayerClikedTeamB([0, 0]);
      }
    }

    if (teamNumber != 0) {
      let shooter = matchState.getShooter();

      if (shooter) {
        if (
          shooter.ubicationX == thisUbication[0] &&
          shooter.ubicationY == thisUbication[1]
        ) {
          return "shooter-tile";
        }
      }

      if (
        (playerClikedTeamA[0] == col && playerClikedTeamA[1] == row) ||
        (playerClikedTeamB[0] == col && playerClikedTeamB[1] == row)
      ) {
        // console.log("playerCliked")
        return "selected-tile";
      }

      if (matchState.teamA.teamTurn && teamNumber == 1) {
        // console.log("teamTurn && teamNumber A")
        if (matchState.teamA.isAnyPlayerSelected()) {
          paintPlayerOnThisTileAsSelected(matchState.teamA, thisUbication);
        } else if (
          matchState.teamA.playerOnThisTileHaveTurnLeft(thisUbication)
        ) {
          return "highlighted-tile";
        }
      } else if (matchState.teamB.teamTurn && teamNumber == 2) {
        // console.log("teamTurn && teamNumber B")
        if (matchState.teamB.isAnyPlayerSelected()) {
          paintPlayerOnThisTileAsSelected(matchState.teamB, thisUbication);
        } else if (
          matchState.teamB.playerOnThisTileHaveTurnLeft(thisUbication)
        ) {
          return "highlighted-tile";
        }
      }

      let teamAActivePlayer = matchState.teamA.returnActivePlayer();
      let teamBActivePlayer = matchState.teamB.returnActivePlayer();

      let teamAActivePlayerUbication = teamAActivePlayer && [
        teamAActivePlayer.ubicationX,
        teamAActivePlayer.ubicationY,
      ];
      let teamBActivePlayerUbication = teamBActivePlayer && [
        teamBActivePlayer.ubicationX,
        teamBActivePlayer.ubicationY,
      ];

      if (
        teamAActivePlayerUbication &&
        teamAActivePlayerUbication[0] == thisUbication[0] &&
        teamAActivePlayerUbication[1] == thisUbication[1]
      ) {
        // console.log("teamActivePlayerUbication == thisUbication")
        showPosibleActionsButtons(teamAActivePlayer, matchState.teamA);

        return "active-tile";
      } else if (
        teamBActivePlayerUbication &&
        teamBActivePlayerUbication[0] == thisUbication[0] &&
        teamBActivePlayerUbication[1] == thisUbication[1]
      ) {
        // console.log("teamActivePlayerUbication == thisUbication")
        showPosibleActionsButtons(teamBActivePlayer, matchState.teamB);

        return "active-tile";
      }

      return "not-highlighted";
    }
  }

  function paintPlayerOnThisTileAsSelected(
    team: Team,
    ubicationScaned: number[]
  ) {
    team.players.forEach((player) => {
      let playerUbication = [player.ubicationX, player.ubicationY];

      if (
        playerUbication[0] == ubicationScaned[0] &&
        playerUbication[1] == ubicationScaned[1]
      ) {
        return player.playerSelected ? "selected-tile" : "highlighted-tile";
      }
    });
  }

  function showPosibleActionsButtons(
    teamActivePlayer: Player | undefined,
    team: Team
  ) {
    if (teamActivePlayer) {
      //End turn button is allways shown
      setShowEndTurnButton(true);

      //If the player is part of the atacking team
      if (team.getPlayerWithBallOrUndefined()) {
        //And have more than 0.5 action points
        if (teamActivePlayer.actionPoints > 0.5) {
          if (teamActivePlayer.haveBall) {
            setShowTripleThreatButton(true);
            setShowPassButton(true);
          }
        }
        //And have more than 1 action point
        if (teamActivePlayer.actionPoints > 1) {
          if (teamActivePlayer.haveBall) {
            setShowDribblingButton(true);
            setShowShootButton(true);
          } else {
            setShowMoveButton(true);
            setShowWaitWithoutTheBallButton(true);
          }
        }

        //Else if the player is part of the defending team
      } else {
        //And have more than 0.5 action points
        if (teamActivePlayer.actionPoints > 0.5) {
          setShowWaitCarefullyButton(true);
        }

        //And have more than 1 action point
        if (teamActivePlayer.actionPoints > 1) {
          setShowWaitPressingButton(true);
          setShowMoveButton(true);

          //And check if ther's an atacking player with the ball next to him
          const otherTeam =
            team.name == "TeamA" ? matchState.teamB : matchState.teamA;

          const playerWithBall = otherTeam.getPlayerWithBall();

          const xDistance =
            playerWithBall!.ubicationX! - teamActivePlayer.ubicationX!;
          const yDistance =
            playerWithBall!.ubicationY! - teamActivePlayer.ubicationY!;

          if (Math.pow(xDistance, 2) == 1 && Math.pow(yDistance, 2) == 1) {
            setShowStealAttemptButton(true);
          }
        }
      }
    }
  }

  const teamAInitialPositions = [
    [13, 1],
    [13, 5],
    [13, 9],
    [13, 14],
    [14, 8],
  ];
  const teamBInitialPositions = [
    [16, 2],
    [16, 6],
    [16, 10],
    [16, 15],
    [15, 8],
  ];

  const playerA1: Player = new Player(
    teamAStats.playerA1Stats.name,
    "A",
    "1",
    teamAStats.playerA1Stats.height,
    teamAStats.playerA1Stats.weight,
    teamAStats.playerA1Stats.atleticism,
    teamAStats.playerA1Stats.perimeterDefence,
    teamAStats.playerA1Stats.insideDefence,
    teamAStats.playerA1Stats.rebounding,
    teamAStats.playerA1Stats.perimeterScoring,
    teamAStats.playerA1Stats.insideScoring,
    teamAStats.playerA1Stats.playMaking,
    teamAInitialPositions[0][0],
    teamAInitialPositions[0][1]
  );

  const playerA2: Player = new Player(
    teamAStats.playerA2Stats.name,
    "A",
    "2",
    teamAStats.playerA2Stats.height,
    teamAStats.playerA2Stats.weight,
    teamAStats.playerA2Stats.atleticism,
    teamAStats.playerA2Stats.perimeterDefence,
    teamAStats.playerA2Stats.insideDefence,
    teamAStats.playerA2Stats.rebounding,
    teamAStats.playerA2Stats.perimeterScoring,
    teamAStats.playerA2Stats.insideScoring,
    teamAStats.playerA2Stats.playMaking,
    teamAInitialPositions[1][0],
    teamAInitialPositions[1][1]
  );

  const playerA3: Player = new Player(
    teamAStats.playerA3Stats.name,
    "A",
    "3",
    teamAStats.playerA3Stats.height,
    teamAStats.playerA3Stats.weight,
    teamAStats.playerA3Stats.atleticism,
    teamAStats.playerA3Stats.perimeterDefence,
    teamAStats.playerA3Stats.insideDefence,
    teamAStats.playerA3Stats.rebounding,
    teamAStats.playerA3Stats.perimeterScoring,
    teamAStats.playerA3Stats.insideScoring,
    teamAStats.playerA3Stats.playMaking,
    teamAInitialPositions[2][0],
    teamAInitialPositions[2][1]
  );

  const playerA4: Player = new Player(
    teamAStats.playerA4Stats.name,
    "A",
    "4",
    teamAStats.playerA4Stats.height,
    teamAStats.playerA4Stats.weight,
    teamAStats.playerA4Stats.atleticism,
    teamAStats.playerA4Stats.perimeterDefence,
    teamAStats.playerA4Stats.insideDefence,
    teamAStats.playerA4Stats.rebounding,
    teamAStats.playerA4Stats.perimeterScoring,
    teamAStats.playerA4Stats.insideScoring,
    teamAStats.playerA4Stats.playMaking,
    teamAInitialPositions[3][0],
    teamAInitialPositions[3][1]
  );

  const playerA5: Player = new Player(
    teamAStats.playerA5Stats.name,
    "A",
    "5",
    teamAStats.playerA5Stats.height,
    teamAStats.playerA5Stats.weight,
    teamAStats.playerA5Stats.atleticism,
    teamAStats.playerA5Stats.perimeterDefence,
    teamAStats.playerA5Stats.insideDefence,
    teamAStats.playerA5Stats.rebounding,
    teamAStats.playerA5Stats.perimeterScoring,
    teamAStats.playerA5Stats.insideScoring,
    teamAStats.playerA5Stats.playMaking,
    teamAInitialPositions[4][0],
    teamAInitialPositions[4][1]
  );

  const playerB1: Player = new Player(
    teamBStats.playerB1Stats.name,
    "B",
    "1",
    teamBStats.playerB1Stats.height,
    teamBStats.playerB1Stats.weight,
    teamBStats.playerB1Stats.atleticism,
    teamBStats.playerB1Stats.perimeterDefence,
    teamBStats.playerB1Stats.insideDefence,
    teamBStats.playerB1Stats.rebounding,
    teamBStats.playerB1Stats.perimeterScoring,
    teamBStats.playerB1Stats.insideScoring,
    teamBStats.playerB1Stats.playMaking,
    teamBInitialPositions[0][0],
    teamBInitialPositions[0][1]
  );

  const playerB2: Player = new Player(
    teamBStats.playerB2Stats.name,
    "B",
    "2",
    teamBStats.playerB2Stats.height,
    teamBStats.playerB2Stats.weight,
    teamBStats.playerB2Stats.atleticism,
    teamBStats.playerB2Stats.perimeterDefence,
    teamBStats.playerB2Stats.insideDefence,
    teamBStats.playerB2Stats.rebounding,
    teamBStats.playerB2Stats.perimeterScoring,
    teamBStats.playerB2Stats.insideScoring,
    teamBStats.playerB2Stats.playMaking,
    teamBInitialPositions[1][0],
    teamBInitialPositions[1][1]
  );

  const playerB3: Player = new Player(
    teamBStats.playerB3Stats.name,
    "B",
    "3",
    teamBStats.playerB3Stats.height,
    teamBStats.playerB3Stats.weight,
    teamBStats.playerB3Stats.atleticism,
    teamBStats.playerB3Stats.perimeterDefence,
    teamBStats.playerB3Stats.insideDefence,
    teamBStats.playerB3Stats.rebounding,
    teamBStats.playerB3Stats.perimeterScoring,
    teamBStats.playerB3Stats.insideScoring,
    teamBStats.playerB3Stats.playMaking,
    teamBInitialPositions[2][0],
    teamBInitialPositions[2][1]
  );

  const playerB4: Player = new Player(
    teamBStats.playerB4Stats.name,
    "B",
    "4",
    teamBStats.playerB4Stats.height,
    teamBStats.playerB4Stats.weight,
    teamBStats.playerB4Stats.atleticism,
    teamBStats.playerB4Stats.perimeterDefence,
    teamBStats.playerB4Stats.insideDefence,
    teamBStats.playerB4Stats.rebounding,
    teamBStats.playerB4Stats.perimeterScoring,
    teamBStats.playerB4Stats.insideScoring,
    teamBStats.playerB4Stats.playMaking,
    teamBInitialPositions[3][0],
    teamBInitialPositions[3][1]
  );

  const playerB5: Player = new Player(
    teamBStats.playerB5Stats.name,
    "B",
    "5",
    teamBStats.playerB5Stats.height,
    teamBStats.playerB5Stats.weight,
    teamBStats.playerB5Stats.atleticism,
    teamBStats.playerB5Stats.perimeterDefence,
    teamBStats.playerB5Stats.insideDefence,
    teamBStats.playerB5Stats.rebounding,
    teamBStats.playerB5Stats.perimeterScoring,
    teamBStats.playerB5Stats.insideScoring,
    teamBStats.playerB5Stats.playMaking,
    teamBInitialPositions[4][0],
    teamBInitialPositions[4][1]
  );

  const playersTeamA: Player[] = [
    playerA1,
    playerA2,
    playerA3,
    playerA4,
    playerA5,
  ];
  const playersTeamB: Player[] = [
    playerB1,
    playerB2,
    playerB3,
    playerB4,
    playerB5,
  ];

  const teamA: Team = new Team("TeamA", playersTeamA);
  const teamB: Team = new Team("TeamB", playersTeamB);
  const match: Match = new Match(teamA, teamB);

  const [matchState, setMatchState] = useState(match);

  function matchHandler() {
    if (matchState.quarter == 1 && matchState.timeLeft.minutes == 6) {
      matchState.jumpBall(gameNarration, setGameNarration, gameBoard);
    }
  }

  useEffect(() => {
    matchHandler();
  }, [matchState]);

  return (
    <GameContext.Provider
      value={{
        playerA1Stats,
        playerA2Stats,
        playerA3Stats,
        playerA4Stats,
        playerA5Stats,
        setPlayerA1Stats,
        setPlayerA2Stats,
        setPlayerA3Stats,
        setPlayerA4Stats,
        setPlayerA5Stats,
        teamAStats,
        setTeamAStats,
        playerB1Stats,
        playerB2Stats,
        playerB3Stats,
        playerB4Stats,
        playerB5Stats,
        setPlayerB1Stats,
        setPlayerB2Stats,
        setPlayerB3Stats,
        setPlayerB4Stats,
        setPlayerB5Stats,
        teamBStats,
        setTeamBStats,
        teamsCreated,
        setTeamsCreated,
        pointsUsedInPlayerA1,
        pointsUsedInPlayerA2,
        pointsUsedInPlayerA3,
        pointsUsedInPlayerA4,
        pointsUsedInPlayerA5,
        setPointsUsedInPlayerA1,
        setPointsUsedInPlayerA2,
        setPointsUsedInPlayerA3,
        setPointsUsedInPlayerA4,
        setPointsUsedInPlayerA5,
        pointsUsedInStatsPlayerA1,
        pointsUsedInStatsPlayerA2,
        pointsUsedInStatsPlayerA3,
        pointsUsedInStatsPlayerA4,
        pointsUsedInStatsPlayerA5,
        setPointsUsedInStatsPlayerA1,
        setPointsUsedInStatsPlayerA2,
        setPointsUsedInStatsPlayerA3,
        setPointsUsedInStatsPlayerA4,
        setPointsUsedInStatsPlayerA5,
        pointsUsedInStatsPlayerB1,
        pointsUsedInStatsPlayerB2,
        pointsUsedInStatsPlayerB3,
        pointsUsedInStatsPlayerB4,
        pointsUsedInStatsPlayerB5,
        setPointsUsedInStatsPlayerB1,
        setPointsUsedInStatsPlayerB2,
        setPointsUsedInStatsPlayerB3,
        setPointsUsedInStatsPlayerB4,
        setPointsUsedInStatsPlayerB5,
        pointsUsedInPlayerB1,
        pointsUsedInPlayerB2,
        pointsUsedInPlayerB3,
        pointsUsedInPlayerB4,
        pointsUsedInPlayerB5,
        setPointsUsedInPlayerB1,
        setPointsUsedInPlayerB2,
        setPointsUsedInPlayerB3,
        setPointsUsedInPlayerB4,
        setPointsUsedInPlayerB5,

        gameNarration,
        setGameNarration,
        showMoveButton,
        setShowMoveButton,
        showStealAttemptButton,
        setShowStealAttemptButton,
        showInterceptPassAttemptButton,
        setShowInterceptPassAttemptButton,
        showWaitPressingButton,
        setShowWaitPressingButton,
        showWaitCarefullyButton,
        setShowWaitCarefullyButton,
        showPassButton,
        setShowPassButton,
        showDribblingButton,
        setShowDribblingButton,
        showWaitWithoutTheBallButton,
        setShowWaitWithoutTheBallButton,
        showTripleThreatButton,
        setShowTripleThreatButton,
        showShootButton,
        setShowShootButton,
        showEndTurnButton,
        setShowEndTurnButton,
        activateConfirmButton,
        setActivateConfirmButton,

        actionConfirmed,
        setActionConfirmed,
        finalisingAction,
        setFinalisingAction,

        confirmButtonHandler,
        setConfirmButtonHandler,

        tileClicked,
        setTileClicked,

        playerClikedTeamA,
        setPlayerClikedTeamA,
        playerClikedTeamB,
        setPlayerClikedTeamB,
        gameBoard,
        setGameBoard,

        addClassIfNeeded,

        matchState,

        clickTileHandler,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
