import React, { useState } from "react";
import CustomizeGame from "./components/CustomizeGame";
import GameBoard from "./components/GameBoard";



function App() {
  const [isGameCreated, setIsGameCreated] = useState(false)
  return (
    <>
      <CustomizeGame />
      <GameBoard />
    </>
  );
}

export default App;
