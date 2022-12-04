import React from "react";

import TrialItem from './TrialItem';

function TrialsAndMinorChallenges({
	trials,
	mouseOver,
	mouseMove,
	mouseOut,
	onUnlockTrial,
	onCompleteTrial
}) {

  return (
		<div className="trials-tab">
			<h3 className="trials-tab__title">
				Trials and minor challenges
			</h3>

			<div className="trials-tab__sets">
				{trials.map((item) => {
					return (
						<TrialItem
						  key={item._id}
							item={item}
							mouseOver={mouseOver}
							mouseMove={mouseMove}
							mouseOut={mouseOut}
							onUnlockTrial={onUnlockTrial}
							onCompleteTrial={onCompleteTrial}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default TrialsAndMinorChallenges;