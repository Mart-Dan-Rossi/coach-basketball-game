import React from "react";
import { Team } from "../../entities/team";
import DrawPlayer from "./DrawPlayer";
import DrawPlayerInfoPopupInBoard from "./DrawPlayerInfoPopupInBoard";

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

  return (
    <div>
      <div
        className="player-tile-container"
        onMouseLeave={PlayerImgContainerClickHandler()}
        onMouseEnter={PlayerImgContainerClickHandler()}
      >
        <DrawPlayer
          team={team}
          col={col}
          row={row}
          teamLetterProps={teamLetterProps}
        />

        {team.players.map((player) => {
          if (player.ubicationX == col && player.ubicationY == row) {
            return (
              <DrawPlayerInfoPopupInBoard
                key={`player-info-popup-${player.team}-${player.position}`}
                player={player}
                teamLetterProps={teamLetterProps}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default PlayerImgContainer;
