import React from "react";

function TrialsAndMinorChallenges({ availableTrials }) {
  return (
		<div className="trials-tab">
			<h3 className="trials-tab__title">
				Trials and minor challenges
			</h3>

			<div className="trials-tab__sets">
				{availableTrials.map((trial) => {
					return (
						<div key={trial._id} className="trialItem"></div>
					)
				})}
			</div>
		</div>
	)
}

export default TrialsAndMinorChallenges;