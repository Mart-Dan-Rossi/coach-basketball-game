import React, { useContext } from "react";
import "../styles/GameBoard.css";
import PlayerImgContainer from "./PlayerImgContainer";
import { GameContext } from "../context/GameContext";

function GameBoard() {
  const { gameBoard, addClassIfNeeded, matchState, clickTileHandler } =
    useContext(GameContext);

  return (
    <div id="gameboard-container">
      <div id="gameboard">
        {gameBoard!.map((rowContent, rowIndex) => {
          return rowContent.map((player, colIndex) => {
            return (
              <div
                key={`tile-${colIndex + 1}-${rowIndex + 1}`}
                id={`tile-${colIndex + 1}-${rowIndex + 1}`}
                className={`tile ROW${rowIndex + 1} COL${
                  colIndex + 1
                } ${addClassIfNeeded(player, colIndex + 1, rowIndex + 1)}`}
                onClick={clickTileHandler(player, colIndex + 1, rowIndex + 1)!}
              >
                {player == 0 ? (
                  <></>
                ) : player == 1 ? (
                  <PlayerImgContainer
                    team={matchState.teamA}
                    col={colIndex + 1}
                    row={rowIndex + 1}
                    teamLetterProps={"a"}
                  />
                ) : (
                  <PlayerImgContainer
                    team={matchState.teamB}
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
