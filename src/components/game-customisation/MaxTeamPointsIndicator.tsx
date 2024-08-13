import React from "react";
import { numberEntire } from "../../utilities/exportableFunctions";

import "../../styles/MaxTeamPointsIndicator.css";

interface Props {
  maxTeamPoints: number;
  totalTeamPoints: number;
}

const MaxTeamPointsIndicator = ({ maxTeamPoints, totalTeamPoints }: Props) => {
  return (
    <div className="max-team-points-input-container">
      <label htmlFor="maxTeamPoints">Max team points</label>
      <input
        type="range"
        name="maxTeamPoints"
        id="maxTeamPoints-input"
        min="0"
        max={maxTeamPoints}
        value={totalTeamPoints}
        readOnly
      />
      <span className="maxTeamPoints-number">
        {numberEntire(totalTeamPoints)}
      </span>
    </div>
  );
};

export default MaxTeamPointsIndicator;
