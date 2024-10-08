import React from "react";
import { useEffect, useContext } from "react";
import { Team } from "../../entities/team";
import "../../styles/GameBoard.css";
import PlayerImgContainer from "./PlayerImgContainer";
import { GameContext } from "../../context/GameContext";
import {
  boardXDimentions,
  boardYDimentions,
  compareIniciatives,
} from "../../utilities/exportableFunctions";
import { Player } from "../../entities/players";
import { Match } from "../../entities/match";

interface Props {
  match: Match;
  setMatchState: React.Dispatch<React.SetStateAction<Match>>;
}

function GameBoard({ match, setMatchState }: Props) {
  const teamA = match.teamA;
  const teamB = match.teamB;

  const {
    gameNarration,
    setGameNarration,
    actionConfirmed,
    setActionConfirmed,
    setShowMoveButton,
    setShowStealAttemptButton,
    setShowInterceptPassAttemptButton,
    setShowWaitPressingButton,
    setShowWaitCarefullyButton,
    setShowPassButton,
    setShowDribblingButton,
    setShowWaitWithoutTheBallButton,
    setShowTripleThreatButton,
    setShowShootButton,
    setShowEndTurnButton,
    setActivateConfirmButton,
    setConfirmButtonHandler,
    finalisingAction,
    setFinalisingAction,
    tileClicked,
    setTileClicked,
    playerClikedTeamA,
    setPlayerClikedTeamA,
    playerClikedTeamB,
    setPlayerClikedTeamB,
    gameBoard,
  } = useContext(GameContext);

  useEffect(() => {}, [playerClikedTeamA, playerClikedTeamB, match]);

  let teamAAnySelected = teamA.isAnyPlayerSelected();
  let teamBAnySelected = teamB.isAnyPlayerSelected();

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

  function paintPlayerOnThisTileAsSelected(
    team: Team,
    ubicationScaned: number[]
  ) {
    const playerOnThisUbication = team.players.find(
      (player) =>
        player.ubicationX === ubicationScaned[0] &&
        player.ubicationY === ubicationScaned[1]
    );

    if (playerOnThisUbication === undefined) return "";

    return playerOnThisUbication!.playerSelected
      ? "selected-tile"
      : "highlighted-tile";
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
          const otherTeam = team.name == "TeamA" ? teamB : teamA;

          const playerWithBall = otherTeam.returnPlayerWithBall();

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

  function addClassIfNeeded(teamNumber: number, col: number, row: number) {
    let thisUbication = [col, row];

    if (actionConfirmed != "") {
      let activePlayer = match.getActivePlayer()!;

      if (
        actionConfirmed == "move" ||
        actionConfirmed == "dribbling" ||
        actionConfirmed == "pass"
      ) {
        finalisingAction && setActivateConfirmButton(false);
        hideActionsButtons();
      } else {
        setActivateConfirmButton(false);

        let teamASelectedPlayer = match.teamA.getSelectedPlayer();
        let teamBSelectedPlayer = match.teamB.getSelectedPlayer();

        if (!teamASelectedPlayer && !teamBSelectedPlayer) {
          hideActionsButtons();
        }

        if (col == boardXDimentions && row == boardYDimentions) {
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
        let activePlayer = match.getActivePlayer();

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
      let shooter = match.getShooter();

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

      if (teamA.teamTurn && teamNumber == 1) {
        // console.log("teamTurn && teamNumber A")
        if (teamAAnySelected) {
          paintPlayerOnThisTileAsSelected(teamA, thisUbication);
        } else if (teamA.playerOnThisTileHaveTurnLeft(thisUbication)) {
          return "highlighted-tile";
        }
      } else if (teamB.teamTurn && teamNumber == 2) {
        // console.log("teamTurn && teamNumber B")
        if (teamBAnySelected) {
          paintPlayerOnThisTileAsSelected(teamB, thisUbication);
        } else if (teamB.playerOnThisTileHaveTurnLeft(thisUbication)) {
          return "highlighted-tile";
        }
      }

      let teamAActivePlayer = teamA.returnActivePlayer();
      let teamBActivePlayer = teamB.returnActivePlayer();

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
        showPosibleActionsButtons(teamAActivePlayer, teamA);

        return "active-tile";
      } else if (
        teamBActivePlayerUbication &&
        teamBActivePlayerUbication[0] == thisUbication[0] &&
        teamBActivePlayerUbication[1] == thisUbication[1]
      ) {
        // console.log("teamActivePlayerUbication == thisUbication")
        showPosibleActionsButtons(teamBActivePlayer, teamB);

        return "active-tile";
      }

      return "not-highlighted";
    }
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
        let activePlayer = match.getActivePlayer()!;

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
          let team = teamNumber == 1 ? teamA : teamB;
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
            if (teamA.teamTurn) {
              setPlayerClikedTeamA([col, row]);

              if (!teamAAnySelected) {
                setConfirmButtonHandler(
                  () => () =>
                    confirmPlayerSelection(teamA, thisUbication, teamB)
                );
              }

              setActivateConfirmButton(true);
            }
          } else if (teamNumber == 2) {
            if (teamB.teamTurn) {
              setPlayerClikedTeamB([col, row]);

              if (!teamBAnySelected) {
                setConfirmButtonHandler(
                  () => () =>
                    confirmPlayerSelection(teamB, thisUbication, teamA)
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
      let passer = match.getActivePlayer()!;

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

      match.handlePassAction(
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

      setMatchState(match);

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
        teamA.returnSelectedPlayer()!,
        teamB.returnSelectedPlayer()!,
        teamA.getPlayerWithBallOrUndefined()
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

  return (
    <div id="gameboard-container">
      <div id="gameboard">
        {gameBoard!.map((rowContent, rowIndex) => {
          return rowContent.map((player, colIndex) => {
            return (
              <div
                key={`tile-${colIndex + 1}-${rowIndex + 1}`}
                className={`tile ROW${rowIndex + 1} COL${
                  colIndex + 1
                } ${addClassIfNeeded(player, colIndex + 1, rowIndex + 1)}`}
                onClick={clickTileHandler(player, colIndex + 1, rowIndex + 1)!}
              >
                {player == 0 ? (
                  <></>
                ) : player == 1 ? (
                  <PlayerImgContainer
                    team={teamA}
                    col={colIndex + 1}
                    row={rowIndex + 1}
                    teamLetterProps={"a"}
                  />
                ) : (
                  <PlayerImgContainer
                    team={teamB}
                    col={colIndex + 1}
                    row={rowIndex + 1}
                    teamLetterProps={"b"}
                  />
                )}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}

export default GameBoard;
