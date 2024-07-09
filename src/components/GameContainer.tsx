import React from "react";
import GameBoard from "./GameBoard";
import "../styles/GameContainer.css";
import MatchInfo from "./MatchInfo";
import MatchActionsContainer from "./MatchActionsContainer";

export default function GameContainer() {
  return (
    <div className="game-container">
      <MatchInfo />
      <GameBoard />
      <MatchActionsContainer />
    </div>
  );
}
