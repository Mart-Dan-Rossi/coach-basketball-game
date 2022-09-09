import React, { useContext, useState } from "react";
import CustomizeGame from "./components/CustomizeGame";
import GameBoard from "./components/GameBoard";
import { GameContextProvider } from "./context/GameContextProvider";
import {GameContext} from './context/GameContext';
import Main from "./Main";


function App() {
  
  return (
    <>
      <GameContextProvider>
        <Main/>
      </GameContextProvider>
    </>
  );
}

export default App;
