import React, { useState } from "react";
import CreateTeam from "./CreateTeam";
import "../../styles/CustomizeGame.css";
import { SwitchTransition, CSSTransition } from "react-transition-group";

const CustomizeGame = () => {
  let maxTeamPoints = 70 * 5 * 9;

  const [totalTeamAPoints, setTotalTeamAPoints] = useState(maxTeamPoints);
  const [totalTeamBPoints, setTotalTeamBPoints] = useState(maxTeamPoints);
  const [showTeam, setShowTeam] = useState(true);

  function changeTeamToCustomize() {
    setShowTeam(!showTeam);
  }

  return (
    <div
      className={
        showTeam
          ? "team-a customize-game-container"
          : "team-b customize-game-container"
      }
    >
      <div className="team-customization-header">
        <svg
          onClick={changeTeamToCustomize}
          className="arrow-go-left"
          width="16"
          height="21"
          viewBox="0 0 16 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.3776 9.14146C1.24392 9.23256 1.13439 9.35479 1.05844 9.49762C0.982489 9.64046 0.9424 9.79961 0.941624 9.96138C0.940847 10.1231 0.979406 10.2827 1.05398 10.4262C1.12855 10.5698 1.23691 10.6931 1.3697 10.7854L14.3263 19.8477C14.4758 19.9526 14.6511 20.0146 14.8333 20.0268C15.0155 20.0391 15.1975 20.0011 15.3596 19.9172C15.5218 19.8332 15.6578 19.7065 15.7529 19.5506C15.8481 19.3948 15.8987 19.2159 15.8993 19.0333L15.9857 1.03349C15.9858 0.851337 15.9363 0.672591 15.8424 0.516481C15.7485 0.360372 15.6139 0.232803 15.4529 0.147496C15.292 0.0621879 15.1108 0.0223684 14.929 0.0323194C14.7471 0.0422703 14.5713 0.101615 14.4207 0.203972L1.3776 9.14146Z"
            fill="#050259"
          />
        </svg>
        {showTeam ? (
          <SwitchTransition>
            <CSSTransition
              classNames="fade"
              key={"teamA-create-team"}
              addEndListener={(node, done) => {
                node.addEventListener("transitionend", done, false);
              }}
            >
              <h2>Create team A</h2>
            </CSSTransition>
          </SwitchTransition>
        ) : (
          <SwitchTransition>
            <CSSTransition
              classNames="fade"
              key={"teamB-create-team"}
              addEndListener={(node, done) => {
                node.addEventListener("transitionend", done, false);
              }}
            >
              <h2>Create team B</h2>
            </CSSTransition>
          </SwitchTransition>
        )}

        <svg
          onClick={changeTeamToCustomize}
          className="arrow-go-right"
          width="16"
          height="21"
          viewBox="0 0 16 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.3776 9.14146C1.24392 9.23256 1.13439 9.35479 1.05844 9.49762C0.982489 9.64046 0.9424 9.79961 0.941624 9.96138C0.940847 10.1231 0.979406 10.2827 1.05398 10.4262C1.12855 10.5698 1.23691 10.6931 1.3697 10.7854L14.3263 19.8477C14.4758 19.9526 14.6511 20.0146 14.8333 20.0268C15.0155 20.0391 15.1975 20.0011 15.3596 19.9172C15.5218 19.8332 15.6578 19.7065 15.7529 19.5506C15.8481 19.3948 15.8987 19.2159 15.8993 19.0333L15.9857 1.03349C15.9858 0.851337 15.9363 0.672591 15.8424 0.516481C15.7485 0.360372 15.6139 0.232803 15.4529 0.147496C15.292 0.0621879 15.1108 0.0223684 14.929 0.0323194C14.7471 0.0422703 14.5713 0.101615 14.4207 0.203972L1.3776 9.14146Z"
            fill="#050259"
          />
        </svg>
      </div>
      {showTeam ? (
        <SwitchTransition>
          <CSSTransition
            classNames="fade"
            key={"create-team-A"}
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
          >
            <CreateTeam
              totalTeamAPoints={totalTeamAPoints}
              setTotalTeamAPoints={setTotalTeamAPoints}
              totalTeamBPoints={totalTeamBPoints}
              setTotalTeamBPoints={setTotalTeamBPoints}
              maxTeamPoints={maxTeamPoints}
              team={"A"}
            />
          </CSSTransition>
        </SwitchTransition>
      ) : (
        <SwitchTransition>
          <CSSTransition
            classNames="fade"
            key={"create-team-B"}
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
          >
            <CreateTeam
              totalTeamAPoints={totalTeamAPoints}
              setTotalTeamAPoints={setTotalTeamAPoints}
              totalTeamBPoints={totalTeamBPoints}
              setTotalTeamBPoints={setTotalTeamBPoints}
              maxTeamPoints={maxTeamPoints}
              team={"B"}
            />
          </CSSTransition>
        </SwitchTransition>
      )}
    </div>
  );
};

export default CustomizeGame;
