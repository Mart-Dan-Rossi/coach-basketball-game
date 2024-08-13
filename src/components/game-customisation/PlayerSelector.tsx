import React, { useContext } from "react";
import {
  calculatePlayerOverallRating,
  playerPositionDetection,
} from "../../utilities/exportableFunctions";
import { GameContext } from "../../context/GameContext";

interface Props {
  i: number;
  team: string;
  playerSelected: boolean;
  pointsUsedOnThisPlayer: number;
}

const PlayerSelector = ({
  i,
  team,
  playerSelected,
  pointsUsedOnThisPlayer,
}: Props) => {
  const { createPlayer, setCreatePlayer } = useContext(GameContext);

  function selectPlayer(player: number) {
    return () => {
      if (player != createPlayer) {
        setCreatePlayer(player);
      } else {
        setCreatePlayer(0);
      }
    };
  }
  return (
    <div
      key={`player-selector-${i}-${team}`}
      className={
        playerSelected ? "player-selector selected" : "player-selector"
      }
      onClick={() => selectPlayer(i)}
    >
      <h3>{playerPositionDetection(i.toString())}</h3>

      <h4>
        Player valoration{" "}
        <span>{calculatePlayerOverallRating(pointsUsedOnThisPlayer)}</span>
      </h4>
    </div>
  );
};

export default PlayerSelector;
