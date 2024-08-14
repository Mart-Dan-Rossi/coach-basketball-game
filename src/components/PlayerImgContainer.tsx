import React from "react";
import { Team } from "../entities/team";
import { Player } from "../entities/players";
import DrawSkillsIconsInPlayers from "./DrawSkillsIconsInPlayers";

interface Props {
  team: Team;
  col: number;
  row: number;
  teamLetterProps: "a" | "b";
}

function PlayerImgContainer({ team, col, row, teamLetterProps }: Props) {
  function PlayerImgContainerClickHandler() {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      e.currentTarget!.classList.toggle("expand");
    };
  }

  let playerImg = "";

  function drawPlayer() {
    return team.getPlayerWithBallOrUndefined() ? (
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
    );
  }

  function drawPlayerInfoPopupInBoard(player: Player) {
    return (
      <div
        key={
          "player-info-popup-in-board" +
          player.team +
          player.name +
          player.position
        }
        className={`player-info-popup-in-board team-${teamLetterProps.toLowerCase()}`}
      >
        <div className="player-basic-info">
          <h4 className="player-position">
            {player.playerPositionDetection()}
          </h4>
        </div>
        <div className="player-stats-icon-container">
          <DrawSkillsIconsInPlayers
            skillPoints={player.atleticism}
            imgSrc={"./img/players-img/athlete.png"}
            text={"this player is an athlete"}
          />

          <DrawSkillsIconsInPlayers
            skillPoints={player.perimetrerDefence}
            imgSrc={"./img/players-img/perimeterDefender.png"}
            text={"this player is a good perimeter defender"}
          />

          <DrawSkillsIconsInPlayers
            skillPoints={player.insideDefence}
            imgSrc={"./img/players-img/insideDefender.png"}
            text={"this player is a good paint defender"}
          />

          <DrawSkillsIconsInPlayers
            skillPoints={player.rebounding}
            imgSrc={"./img/players-img/rebounder.png"}
            text={"this player is a good rebounder"}
          />

          <DrawSkillsIconsInPlayers
            skillPoints={player.perimetrerScoring}
            imgSrc={"./img/players-img/perimeterScorer.png"}
            text={"this player is a good perimeter scorer"}
          />

          <DrawSkillsIconsInPlayers
            skillPoints={player.insideScoring}
            imgSrc={"./img/players-img/insideScorer.png"}
            text={"this player is a good inside scorer"}
          />

          <DrawSkillsIconsInPlayers
            skillPoints={player.playMaking}
            imgSrc={"./img/players-img/playmaker.png"}
            text={"this player is a good playmaker"}
          />
        </div>
        {drawStatRowOfPopup("Heigth", player.height)}

        {drawStatRowOfPopup("Heigth", player.height)}

        {drawStatRowOfPopup("Weight", player.weight)}
        {drawStatRowOfPopup("Weight", player.weight)}

        {drawStatRowOfPopup("Atleticism", player.atleticism)}
        {drawStatRowOfPopup("Atleticism", player.atleticism)}

        {drawStatRowOfPopup("Per def", player.perimetrerDefence)}
        {drawStatRowOfPopup("Per def", player.perimetrerDefence)}

        {drawStatRowOfPopup("Ins def", player.insideDefence)}
        {drawStatRowOfPopup("Ins def", player.insideDefence)}

        {drawStatRowOfPopup("Rebs", player.rebounding)}
        {drawStatRowOfPopup("Rebs", player.rebounding)}

        {drawStatRowOfPopup("Per scor", player.perimetrerScoring)}
        {drawStatRowOfPopup("Per scor", player.perimetrerScoring)}

        {drawStatRowOfPopup("Ins scor", player.insideScoring)}
        {drawStatRowOfPopup("Ins scor", player.insideScoring)}

        {drawStatRowOfPopup("Playmkn", player.playMaking)}
        {drawStatRowOfPopup("Playmkn", player.playMaking)}

        {drawStatRowOfPopup("Action pts", player.actionPoints)}

        {drawStatRowOfPopup("Have turn", player.movementLeft)}
      </div>
    );
  }

  function drawStatRowOfPopup(skillName: string, statValue: number | boolean) {
    if (skillName != "Have turn") {
      return (
        <div>
          <h4>{skillName}:</h4>
          <span className="stat-value">{statValue.toString()}</span>
        </div>
      );
    } else {
      return (
        <div>
          <h4>{skillName}:</h4>
          <span className="stat-value">{statValue ? "Yes" : "No"}</span>
        </div>
      );
    }
  }

  return (
    <div>
      <div
        className="player-tile-container"
        onMouseLeave={PlayerImgContainerClickHandler()}
        onMouseEnter={PlayerImgContainerClickHandler()}
      >
        {drawPlayer()}
        {team.players.map((player) => {
          if (player.ubicationX == col && player.ubicationY == row) {
            return drawPlayerInfoPopupInBoard(player);
          }
        })}
      </div>
      <div
        className="player-tile-container"
        onMouseLeave={PlayerImgContainerClickHandler()}
        onMouseEnter={PlayerImgContainerClickHandler()}
      >
        {drawPlayer()}
        {team.players.map((player) => {
          if (player.ubicationX == col && player.ubicationY == row) {
            return drawPlayerInfoPopupInBoard(player);
          }
        })}
      </div>
    </div>
  );
}

export default PlayerImgContainer;
