import React from "react";

interface Props {
  skillName: string;
  statValue: number | boolean;
}

const DrawStatRowOfPopup = ({ skillName, statValue }: Props) => {
  if (skillName != "Have turn") {
    return (
      <div>
        <h4>{skillName}:</h4>
        <span className="stat-value">{statValue.toString()}</span>
      </div>
    );
  } else {
    return (
      <div>
        <h4>{skillName}:</h4>
        <span className="stat-value">{statValue ? "Yes" : "No"}</span>
      </div>
    );
  }
};

export default DrawStatRowOfPopup;
