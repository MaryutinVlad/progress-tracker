import React from "react";

import TrialsAndMinorChallenges from './Trials&MinorChallenges';
import ActionsAndMajorChallenges from './Actions&MajorChallenges';

function Trials() {
  return (
    <div className="trials">
      <TrialsAndMinorChallenges/>
      <ActionsAndMajorChallenges/>
    </div>
  )
}

export default Trials;