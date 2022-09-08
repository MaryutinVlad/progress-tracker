import React from "react";

import TrialsAndMinorChallenges from './Trials&MinorChallenges';
import ActionsAndMajorChallenges from './Actions&MajorChallenges';

function Trials({ availableTrials, availableChallenges, availableActions }) {
  return (
    <div className="trials">
      <TrialsAndMinorChallenges
       availableTrials={availableTrials}
      />
      <ActionsAndMajorChallenges
        availableActions={availableActions}
        availableChallenges={availableChallenges}
      />
    </div>
  )
}

export default Trials;