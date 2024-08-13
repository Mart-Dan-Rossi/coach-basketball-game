import React, { useContext } from "react";
import PlayerSelector from "./PlayerSelector";
import { GameContext } from "../../context/GameContext";

interface Props {
  team: string;
  pointsUsedOnPlayersArray: number[];
}

const PlayersSelectors = ({ team, pointsUsedOnPlayersArray }: Props) => {
  const { createPlayer } = useContext(GameContext);

  return (
    <div className="all-players-selectors">
      {pointsUsedOnPlayersArray.map((pointsUsedOnPlayers, index) => {
        return (
          <PlayerSelector
            i={index + 1}
            team={team}
            playerSelected={createPlayer === index}
            pointsUsedOnThisPlayer={pointsUsedOnPlayers}
          />
        );
      })}
    </div>
  );
};

export default PlayersSelectors;
