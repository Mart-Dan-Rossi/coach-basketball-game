import React from "react";
import { useContext } from "react";
import { GameContext } from "./context/GameContext";
import CustomizeGame from "./components/game-customisation/CustomizeGame";
import GameContainer from "./components/game-started/GameContainer";
import { Link } from "react-router-dom";

const Main = () => {
  const { teamsCreated } = useContext(GameContext);
  return (
    <>
      <Link to={"/"}>
        <div className="back-container">
          <div className="back-button-container">
            <svg
              className="arrow-go-left back-button"
              width="16"
              height="21"
              viewBox="0 0 16 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.3776 9.14146C1.24392 9.23256 1.13439 9.35479 1.05844 9.49762C0.982489 9.64046 0.9424 9.79961 0.941624 9.96138C0.940847 10.1231 0.979406 10.2827 1.05398 10.4262C1.12855 10.5698 1.23691 10.6931 1.3697 10.7854L14.3263 19.8477C14.4758 19.9526 14.6511 20.0146 14.8333 20.0268C15.0155 20.0391 15.1975 20.0011 15.3596 19.9172C15.5218 19.8332 15.6578 19.7065 15.7529 19.5506C15.8481 19.3948 15.8987 19.2159 15.8993 19.0333L15.9857 1.03349C15.9858 0.851337 15.9363 0.672591 15.8424 0.516481C15.7485 0.360372 15.6139 0.232803 15.4529 0.147496C15.292 0.0621879 15.1108 0.0223684 14.929 0.0323194C14.7471 0.0422703 14.5713 0.101615 14.4207 0.203972L1.3776 9.14146Z"
                fill="#050259"
              ></path>
            </svg>
          </div>
          <span>Back</span>
        </div>
      </Link>
      {teamsCreated ? <CustomizeGame /> : <GameContainer />}
    </>
  );
};

export default Main;
