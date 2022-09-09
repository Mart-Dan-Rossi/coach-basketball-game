import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import Rules from "./components/Rules";
import { GameContextProvider } from "./context/GameContextProvider";
import GameStarted from "./GameStarted";


function App() {  
  return (
    <>
      <GameContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainMenu/>}/>
            <Route path="/home" element={<MainMenu/>}/>
            <Route path="/game-started" element={<GameStarted/>}/>
            <Route path="/rules" element={<Rules />}/>
          </Routes>
        </BrowserRouter>
      </GameContextProvider>
    </>
  );
}

export default App;
