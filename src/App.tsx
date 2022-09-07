import React, { useState } from "react";
import CustomizeGame from "./components/CustomizeGame";
import GameBoard from "./components/GameBoard";
import { GameContextProvider } from "./context/GameContextProvider";



function App() {
  const [isGameCreated, setIsGameCreated] = useState(false)
  return (
    <>
      <GameContextProvider>
        <CustomizeGame />
        <GameBoard />
      </GameContextProvider>
    </>
  );
}

export default App;
