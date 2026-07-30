import React from "react";
import { useEffect, useContext } from "react";
import { Team } from "../../entities/team";
//@ts-ignore
import "../../styles/GameBoard.css";
import PlayerImgContainer from "./PlayerImgContainer";
import { GameContext } from "../../context/GameContext";
import {
  boardXDimentions,
  boardYDimentions,
  compareIniciatives,
  isRivalNearby,
} from "../../utilities/exportableFunctions";
import { Player } from "../../entities/players";
import { Match } from "../../entities/match";
import toast from "react-hot-toast";

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
    activePlayer,
    setActivePlayer,
  } = useContext(GameContext);

  useEffect(() => {}, [
    playerClikedTeamA,
    playerClikedTeamB,
    match,
    activePlayer,
  ]);

  useEffect(() => {
    function validateTeamUbication(teamIndicator: "A" | "B") {
      let team = teamIndicator === "A" ? teamA : teamB;
      let teamNumber = teamIndicator === "A" ? 1 : 2;
      let playersUbications = team.players.map((player) => {
        //The gameboard is rotated
        return [player.ubicationY - 1, player.ubicationX - 1];
      });

      const mismatchFound = playersUbications.some((ubicationScanned) => {
        const numberInGameboard =
          gameBoard[ubicationScanned[0]][ubicationScanned[1]];

        return numberInGameboard !== teamNumber;
      });

      if (mismatchFound) {
        toast.error(
          "Error: match data and gameboard data mismatch. Check console for more data.",
        );

        console.error(
          "Gameboard:",
          gameBoard,
          "Team positions:",
          playersUbications,
        );
      }
    }

    validateTeamUbication("A");
    validateTeamUbication("B");
  }, [gameBoard]);

  let teamAAnySelected = teamA.isAnyPlayerSelected();
  let teamBAnySelected = teamB.isAnyPlayerSelected();

  function hideActionsButtons() {
    setShowMoveButton(() => false);
    setShowStealAttemptButton(() => false);
    setShowInterceptPassAttemptButton(() => false);
    setShowWaitPressingButton(() => false);
    setShowWaitCarefullyButton(() => false);
    setShowPassButton(() => false);
    setShowDribblingButton(() => false);
    setShowWaitWithoutTheBallButton(() => false);
    setShowTripleThreatButton(() => false);
    setShowShootButton(() => false);
    setShowEndTurnButton(() => false);
  }

  function paintPlayerOnThisTileAsSelected(
    team: Team,
    ubicationScaned: number[],
  ) {
    const playerOnThisUbication = team.players.find(
      (player) =>
        player.ubicationX === ubicationScaned[0] &&
        player.ubicationY === ubicationScaned[1],
    );

    if (playerOnThisUbication === undefined) return "";

    return playerOnThisUbication?.playerSelected
      ? "selected-tile"
      : playerOnThisUbication?.playerHaveTurn && "highlighted-tile";
  }

  function showPosibleActionsButtons(
    teamActivePlayer: Player | undefined,
    team: Team,
  ) {
    if (teamActivePlayer) {
      //End turn button is allways shown
      setShowEndTurnButton(() => true);

      //If the player is part of the atacking team
      //TODO make waiting options work propperly
      if (team.getPlayerWithBallOrUndefined()) {
        //And have 0.5 or more  action points
        if (teamActivePlayer.actionPoints >= 0.5) {
          if (teamActivePlayer.haveBall) {
            setShowTripleThreatButton(() => true);
            setShowPassButton(() => true);
          }
        }
        //And have 1 or more action point
        if (teamActivePlayer.actionPoints >= 1) {
          if (teamActivePlayer.haveBall) {
            setShowDribblingButton(() => true);
            setShowShootButton(() => true);
          } else {
            setShowMoveButton(() => true);
            setShowWaitWithoutTheBallButton(() => true);
          }
        }

        //Else if the player is part of the defending team
      } else {
        //TODO make waiting options work propperly
        //And have 0.5 or more action points
        if (teamActivePlayer.actionPoints >= 0.5) {
          if (isRivalNearby(gameBoard, teamActivePlayer)) {
            setShowWaitCarefullyButton(() => true);
          }
        }

        //And have 1 or more action point
        if (teamActivePlayer.actionPoints >= 1) {
          if (isRivalNearby(gameBoard, teamActivePlayer, true)) {
            setShowWaitPressingButton(() => true);
          }
          setShowMoveButton(() => true);

          //And check if ther's an atacking player with the ball next to him
          const otherTeam = team.name == "TeamA" ? teamB : teamA;

          const playerWithBall = otherTeam.returnPlayerWithBall();

          if (playerWithBall) {
            const xDistance =
              playerWithBall?.ubicationX - teamActivePlayer.ubicationX;
            const yDistance =
              playerWithBall?.ubicationY - teamActivePlayer.ubicationY;

            if (Math.pow(xDistance, 2) == 1 && Math.pow(yDistance, 2) == 1) {
              setShowStealAttemptButton(() => true);
            }
          } else {
            console.error(
              "playerWithBall not found in showPosibleActionsButtons",
            );
            toast.error(
              "Error: PlayerWithBall not found in showPosibleActionsButtons",
            );
          }
        }
      }
    }
  }

  function addClassToTileIfNeeded(
    teamNumber: number,
    col: number,
    row: number,
  ) {
    let thisUbication = [col, row];

    if (actionConfirmed != "") {
      if (
        actionConfirmed == "move" ||
        actionConfirmed == "dribbling" ||
        actionConfirmed == "pass"
      ) {
        finalisingAction && setActivateConfirmButton(() => false);
        hideActionsButtons();
      } else {
        setActivateConfirmButton(() => false);

        let teamASelectedPlayer = match.teamA.getSelectedPlayer();
        let teamBSelectedPlayer = match.teamB.getSelectedPlayer();

        if (!teamASelectedPlayer && !teamBSelectedPlayer) {
          hideActionsButtons();
        }

        if (col == boardXDimentions && row == boardYDimentions) {
          setActionConfirmed(() => "");
        }
      }

      if (actionConfirmed == "move" || actionConfirmed == "dribbling") {
        if (activePlayer) {
          for (let dx = -1; dx < 2; dx++) {
            for (let dy = -1; dy < 2; dy++) {
              //Don't add class to player tile

              if (activePlayer && !(dx == 0 && dy == 0)) {
                //If the scanned ubication is around the active player
                if (
                  activePlayer.ubicationX &&
                  activePlayer.ubicationX + dx == thisUbication[0] &&
                  activePlayer.ubicationY &&
                  activePlayer.ubicationY + dy == thisUbication[1]
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
        } else {
          console.error("Active player not found while attempt to move player");
          toast.error(
            "Error: Active player not found while attempt to move player",
          );
        }
      }

      if (actionConfirmed == "pass") {
        if (activePlayer) {
          if (
            activePlayer.ubicationX == thisUbication[0] &&
            activePlayer.ubicationY == thisUbication[1]
          ) {
            return "active-tile";
          } else if (teamNumber == (activePlayer.team == "TeamA" ? 1 : 2)) {
            if (
              (playerClikedTeamA[0] == col && playerClikedTeamA[1] == row) ||
              (playerClikedTeamB[0] == col && playerClikedTeamB[1] == row)
            ) {
              return "selected-tile";
            } else {
              return "highlighted-tile";
            }
          }
        } else {
          console.error("Active player not found while attempt pass");
          toast.error("Error: Active player not found while attempt pass");
        }
      }

      if (
        actionConfirmed == "end turn" ||
        actionConfirmed == "overwhelmingWaiting" ||
        actionConfirmed == "withCaution" ||
        actionConfirmed == "withoutTheBall" ||
        actionConfirmed == "tripleThreat"
      ) {
        if (activePlayer) {
          hideActionsButtons();

          setPlayerClikedTeamA(() => [0, 0]);
          setPlayerClikedTeamB(() => [0, 0]);
        }
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
        return "selected-tile";
      }

      if (teamA.teamTurn && teamNumber == 1) {
        if (teamAAnySelected) {
          paintPlayerOnThisTileAsSelected(teamA, thisUbication);
        } else if (teamA.playerOnThisTileHaveTurnLeft(thisUbication)) {
          // console.log("teamA.playerOnThisTileHaveTurnLeft", thisUbication);
          return "highlighted-tile";
        }
      } else if (teamB.teamTurn && teamNumber == 2) {
        // console.log("teamTurn && teamNumber B")
        if (teamBAnySelected) {
          paintPlayerOnThisTileAsSelected(teamB, thisUbication);
        } else if (teamB.playerOnThisTileHaveTurnLeft(thisUbication)) {
          // console.log("teamB.playerOnThisTileHaveTurnLeft", thisUbication);
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
        showPosibleActionsButtons(teamAActivePlayer, teamA);

        return "active-tile";
      } else if (
        teamBActivePlayerUbication &&
        teamBActivePlayerUbication[0] == thisUbication[0] &&
        teamBActivePlayerUbication[1] == thisUbication[1]
      ) {
        showPosibleActionsButtons(teamBActivePlayer, teamB);

        return "active-tile";
      }

      return "not-highlighted";
    }
  }

  function clickTileHandler(teamNumber: number, col: number, row: number) {
    if (actionConfirmed == "move" || actionConfirmed == "dribbling") {
      return () => {
        let thisUbication = [col, row];

        if (activePlayer) {
          for (let dx = -1; dx < 2; dx++) {
            for (let dy = -1; dy < 2; dy++) {
              //Don't add class to player tile

              if (!(dx == 0 && dy == 0)) {
                //If the scanned ubication is around the active player
                if (
                  activePlayer.ubicationX &&
                  activePlayer.ubicationX + dx == thisUbication[0] &&
                  activePlayer.ubicationY &&
                  activePlayer.ubicationY + dy == thisUbication[1]
                ) {
                  //The player have more than 1.5 action points and the tile is in the diagonal or less than 1.5 points and the sile is next to the player
                  if (
                    (activePlayer.actionPoints >= 1.5 &&
                      Math.pow(dx, 2) + Math.pow(dy, 2) == 2) ||
                    (activePlayer.actionPoints >= 1 && (dx == 0 || dy == 0))
                  ) {
                    if (teamNumber == 0) {
                      setTileClicked(() => thisUbication);
                      setFinalisingAction(() => false);

                      setConfirmButtonHandler(() => movePlayer(dx, dy));
                    }

                    setActivateConfirmButton(() => true);
                  }
                }
              }
            }
          }
        } else {
          console.error("Active player not found while clicking tile");
          toast.error("Error: Active player not found while clicking tile");
        }
      };
    } else if (actionConfirmed == "pass") {
      return () => {
        let thisUbication = [col, row];

        if (teamNumber != 0) {
          let team = teamNumber == 1 ? teamA : teamB;
          let setPlayerClicked =
            teamNumber == 1 ? setPlayerClikedTeamA : setPlayerClikedTeamB;

          setPlayerClicked(() => thisUbication);

          team.players.forEach((player) => {
            if (
              !player.playerActive &&
              player.ubicationX == col &&
              player.ubicationY == row
            ) {
              setFinalisingAction(() => false);

              setConfirmButtonHandler(() => {
                // console.log("Confirm pass handler setted");
                return makePass(team, thisUbication);
              });

              setActivateConfirmButton(() => true);
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
              setPlayerClikedTeamA(() => [col, row]);

              if (!teamAAnySelected) {
                setConfirmButtonHandler(
                  () => () =>
                    confirmPlayerSelection(teamA, thisUbication, teamB),
                );
              }

              setActivateConfirmButton(() => true);
            }
          } else if (teamNumber == 2) {
            if (teamB.teamTurn) {
              setPlayerClikedTeamB(() => [col, row]);

              if (!teamBAnySelected) {
                setConfirmButtonHandler(
                  () => () =>
                    confirmPlayerSelection(teamB, thisUbication, teamA),
                );
              }

              setActivateConfirmButton(true);
            }
          }
        }
      };
    }
  }

  function movePlayer(dx: number, dy: number) {
    console.log("Move player");
    if (activePlayer) {
      // console.log("activePlayer: ", activePlayer);
      return () => {
        if (activePlayer.ubicationY && activePlayer.ubicationX) {
          gameBoard[activePlayer.ubicationY - 1][activePlayer.ubicationX - 1] =
            0;

          activePlayer.movePlayer(dx, dy);
          gameBoard[activePlayer.ubicationY - 1][activePlayer.ubicationX - 1] =
            activePlayer.team == "TeamA" ? 1 : 2;

          try {
            match.addWaitingPlayersClose(true);
          } catch (err) {
            toast.error(
              `${
                err instanceof Error ? err.message : "Unexpected error"
              } while moving player`,
            );
          }

          setActionConfirmed(() => "");

          setMatchState(() => match);

          setActivateConfirmButton(() => false);
        } else {
          console.error("player ubication is undefined while moving player");
          toast.error(
            "Error: player ubication is undefined while moving player",
          );
        }
      };
    } else {
      return () => {
        console.error("Active player not found while moving player");
        toast.error("Error: Active player not found while moving player");
      };
    }
  }

  function makePass(team: Team, ubicationScaned: number[]) {
    return () => {
      console.log("Make pass");
      let receiver = team.players.find((player) => {
        return (
          player.ubicationX == ubicationScaned[0] &&
          player.ubicationY == ubicationScaned[1]
        );
      });
      let passer = match.getActivePlayer();

      if (passer && receiver) {
        receiver.setHaveBall(false);

        try {
          match.handlePassAction(
            passer,
            receiver,
            gameBoard,
            gameNarration,
            setGameNarration,
          );
        } catch (err) {
          toast.error(
            `${
              err instanceof Error ? err.message : "Unexpected error"
            } while handling pass`,
          );
        }

        if (passer.team == "TeamA") {
          setPlayerClikedTeamA(() => [0, 0]);
        } else {
          setPlayerClikedTeamB(() => [0, 0]);
        }

        setActionConfirmed(() => "");

        setMatchState(() => match);

        setActivateConfirmButton(() => false);
      } else {
        console.error("Passer or receiver was not found while making pass");
        toast.error(
          "Error: Passer or receiver was not found while making pass",
        );
      }
    };
  }

  function confirmPlayerSelection(
    team: Team,
    ubicationScaned: number[],
    otherTeam: Team,
  ) {
    console.log("Confirm player selection");
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

    let newActivePlayer: Player;

    if (otherTeam.teamTurnLeft) {
      otherTeam.setTeamTurn(true);
    } else {
      let teamASelectedPlayer = teamA.returnSelectedPlayer();
      let teamBSelectedPlayer = teamB.returnSelectedPlayer();

      if (teamASelectedPlayer && teamBSelectedPlayer) {
        newActivePlayer = compareIniciatives(
          teamASelectedPlayer,
          teamBSelectedPlayer,
          teamA.getPlayerWithBallOrUndefined(),
        );
        setActivePlayer(() => newActivePlayer);
        newActivePlayer.setActivePlayer(true);
        newActivePlayer.setPlayerSelected(false);

        if (newActivePlayer.team == "TeamA") {
          setPlayerClikedTeamA(() => [0, 0]);
        } else {
          setPlayerClikedTeamB(() => [0, 0]);
        }
      } else {
        console.error(
          "At least 1 selected player was not found while confirming player selection",
        );
        toast.error(
          "Error: At least 1 selected player was not found while confirming player selection",
        );
      }
    }

    setActivateConfirmButton(() => false);
  }

  return (
    <div id="gameboard-container">
      <div id="gameboard">
        {gameBoard.map((rowContent, rowIndex) => {
          return rowContent.map((player, colIndex) => {
            return (
              <div
                key={`tile-${colIndex + 1}-${rowIndex + 1}`}
                className={`tile ROW${rowIndex + 1} COL${
                  colIndex + 1
                } ${addClassToTileIfNeeded(
                  player,
                  colIndex + 1,
                  rowIndex + 1,
                )}`}
                onClick={clickTileHandler(player, colIndex + 1, rowIndex + 1)}
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
