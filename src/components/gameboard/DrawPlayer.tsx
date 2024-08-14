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

  return (
    <>
      {team.getPlayerWithBallOrUndefined() ? (
        team.players.map((player) => {
          playerImg = "";
          let playerUbication = [player.ubicationX, player.ubicationY];
          let thisUbication = [col, row];
          if (
            playerUbication[0] == thisUbication[0] &&
            playerUbication[1] == thisUbication[1]
          ) {
            if (player.playerHaveTheBall()) {
              playerImg = `./img/players-img/${teamLetterProps.toUpperCase()}AtackWBall.png`;
              return (
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
              );
            } else {
              playerImg = `./img/players-img/${teamLetterProps.toUpperCase()}Atack.png`;
              return (
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
              );
            }
          }
        })
      ) : (
        <img
          className="player-img"
          src={`./img/players-img/${teamLetterProps.toUpperCase()}Defend.png`}
          alt={`team ${teamLetterProps.toUpperCase()} player defending in column ${
            col + 1
          } row ${row + 1}`}
        />
      )}
    </>
  );
};

export default DrawPlayer;
