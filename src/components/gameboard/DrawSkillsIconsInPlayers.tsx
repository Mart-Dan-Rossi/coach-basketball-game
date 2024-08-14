import React from "react";

interface Props {
  skillPoints: number;
  imgSrc: string;
  text: string;
}

const DrawSkillsIconsInPlayers = ({ skillPoints, imgSrc, text }: Props) => {
  return (
    <>
      {skillPoints >= 65 && (
        <img
          src={imgSrc}
          alt={text}
          className={
            skillPoints <= 75
              ? "bronze"
              : skillPoints > 75 && skillPoints < 85
              ? "silver"
              : "gold"
          }
        />
      )}
    </>
  );
};

export default DrawSkillsIconsInPlayers;
