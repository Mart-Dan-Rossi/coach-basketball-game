import React from "react";
import { Player } from "../../entities/players";
import DrawSkillsIconsInPlayers from "./DrawSkillsIconsInPlayers";
import DrawStatRowOfPopup from "./DrawStatRowOfPopup";

interface Props {
  player: Player;
  teamLetterProps: "a" | "b";
}

const DrawPlayerInfoPopupInBoard = ({ player, teamLetterProps }: Props) => {
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
        <h4 className="player-position">{player.playerPositionDetection()}</h4>
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
      <DrawStatRowOfPopup skillName={"Heigth"} statValue={player.height} />

      <DrawStatRowOfPopup skillName={"Weight"} statValue={player.weight} />

      <DrawStatRowOfPopup
        skillName={"Atleticism"}
        statValue={player.atleticism}
      />

      <DrawStatRowOfPopup
        skillName={"Per def"}
        statValue={player.perimetrerDefence}
      />

      <DrawStatRowOfPopup
        skillName={"Ins def"}
        statValue={player.insideDefence}
      />

      <DrawStatRowOfPopup skillName={"Rebs"} statValue={player.rebounding} />

      <DrawStatRowOfPopup
        skillName={"Per scor"}
        statValue={player.perimetrerScoring}
      />

      <DrawStatRowOfPopup
        skillName={"Ins scor"}
        statValue={player.insideScoring}
      />

      <DrawStatRowOfPopup skillName={"Playmkn"} statValue={player.playMaking} />

      <DrawStatRowOfPopup
        skillName={"Have turn"}
        statValue={player.movementLeft}
      />
    </div>
  );
};

export default DrawPlayerInfoPopupInBoard;
