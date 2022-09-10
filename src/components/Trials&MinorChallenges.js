import React, { useEffect } from "react";

import TrialItem from './TrialItem';

function TrialsAndMinorChallenges({ availableTrials, mouseOver, mouseMove, mouseOut }) {

	useEffect(() => {
		console.log(availableTrials);
	}, []);

  return (
		<div className="trials-tab">
			<h3 className="trials-tab__title">
				Trials and minor challenges
			</h3>

			<div className="trials-tab__sets">
				{availableTrials.map((item) => {
					return (
						<TrialItem
						  key={item._id}
							name={item.name}
							description={item.description}
							baseReward={item.baseReward}
							mouseOver={mouseOver}
							mouseMove={mouseMove}
							mouseOut={mouseOut}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default TrialsAndMinorChallenges;