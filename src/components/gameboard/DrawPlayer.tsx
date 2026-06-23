import React from "react";
import { Team } from "../../entities/team";

interface Props {
  team: Team;
  col: number;
  row: number;
  teamLetterProps: "a" | "b";
}

const DrawPlayer = ({ team, col, row, teamLetterProps }: Props) => {
  let playerImg = "";
  let playerStatusImg = "";
  let statusDescription = "";

  return (
    <>
      {/* If the team is atacking */}
      {team.getPlayerWithBallOrUndefined()
        ? team.players.map((player) => {
            playerImg = "";
            playerStatusImg = "";
            statusDescription = "";

            let playerUbication = [player.ubicationX, player.ubicationY];
            let thisUbication = [col, row];

            if (
              playerUbication[0] == thisUbication[0] &&
              playerUbication[1] == thisUbication[1]
            ) {
              if (player.playerHaveTheBall()) {
                playerImg = `./img/players-img/${teamLetterProps.toUpperCase()}AtackWBall.png`;
                if (player.lastAction == "tripleThreat") {
                  playerStatusImg = `./img/players-img/TripleThreat.png`;
                  statusDescription = "doing a triple threat";
                }

                return (
                  <>
                    <img
                      key={
                        "ubication" +
                        thisUbication[0] +
                        "-" +
                        thisUbication[1] +
                        "" +
                        player.position
                      }
                      className="player-img"
                      src={playerImg}
                      alt={`team ${teamLetterProps.toUpperCase()} player atacking with ball in column ${
                        col + 1
                      } row ${row + 1}`}
                    />
                    {player.lastAction == "tripleThreat" && (
                      <img
                        key={
                          "ubication" +
                          thisUbication[0] +
                          "-" +
                          thisUbication[1] +
                          "" +
                          player.position +
                          "status-icon"
                        }
                        className={`${
                          teamLetterProps == "a"
                            ? "player-status-img-right"
                            : "player-status-img-left"
                        }`}
                        src={playerStatusImg}
                        alt={`team ${teamLetterProps.toUpperCase()} player atacking with ball in column ${
                          col + 1
                        } row ${row + 1} is ${statusDescription}`}
                      />
                    )}
                  </>
                );
              } else {
                playerImg = `./img/players-img/${teamLetterProps.toUpperCase()}Atack.png`;

                if (player.lastAction == "withoutTheBall") {
                  playerStatusImg = `./img/players-img/PowerUp.svg`;
                  statusDescription = "waiting without the ball";
                }

                return (
                  <>
                    <img
                      key={
                        "ubication" +
                        thisUbication[0] +
                        "-" +
                        thisUbication[1] +
                        "" +
                        player.position
                      }
                      className="player-img"
                      src={playerImg}
                      alt={`team ${teamLetterProps.toUpperCase()} player atacking in column ${
                        col + 1
                      } row ${row + 1}`}
                    />
                    {player.lastAction == "withoutTheBall" && (
                      <img
                        key={
                          "ubication" +
                          thisUbication[0] +
                          "-" +
                          thisUbication[1] +
                          "" +
                          player.position +
                          "status-icon"
                        }
                        className={`${
                          teamLetterProps == "a"
                            ? "player-status-img-right"
                            : "player-status-img-left"
                        }`}
                        src={playerStatusImg}
                        alt={`team ${teamLetterProps.toUpperCase()} player atacking with ball in column ${
                          col + 1
                        } row ${row + 1} is ${statusDescription}`}
                      />
                    )}
                  </>
                );
              }
            }
          })
        : // if the team is defending
          team.players.map((player) => {
            playerImg = "";
            playerStatusImg = "";
            statusDescription = "";

            let playerUbication = [player.ubicationX, player.ubicationY];
            let thisUbication = [col, row];

            if (
              playerUbication[0] == thisUbication[0] &&
              playerUbication[1] == thisUbication[1]
            ) {
              if (player.lastAction == "overwhelmingWaiting") {
                playerStatusImg = `./img/players-img/DefensiveBoost.svg`;
                statusDescription = "pressing the ball";
              } else if (player.lastAction == "withCaution") {
                playerStatusImg = `./img/players-img/Repeat.svg`;
                statusDescription = "waiting with caution";
              }

              return (
                <>
                  <img
                    key={
                      "ubication" +
                      thisUbication[0] +
                      "-" +
                      thisUbication[1] +
                      "" +
                      player.position
                    }
                    className="player-img"
                    src={`./img/players-img/${teamLetterProps.toUpperCase()}Defend.png`}
                    alt={`team ${teamLetterProps.toUpperCase()} player defending in column ${
                      col + 1
                    } row ${row + 1}`}
                  />
                  {(player.lastAction == "withCaution" ||
                    player.lastAction == "overwhelmingWaiting") && (
                    <img
                      key={
                        "ubication" +
                        thisUbication[0] +
                        "-" +
                        thisUbication[1] +
                        "" +
                        player.position +
                        "status-icon"
                      }
                      className={`${
                        teamLetterProps == "a"
                          ? "player-status-img-left"
                          : "player-status-img-right"
                      }`}
                      src={playerStatusImg}
                      alt={`team ${teamLetterProps.toUpperCase()} player defending in column ${
                        col + 1
                      } row ${row + 1} is ${statusDescription}`}
                    />
                  )}
                </>
              );
            }
          })}
    </>
  );
};

export default DrawPlayer;
