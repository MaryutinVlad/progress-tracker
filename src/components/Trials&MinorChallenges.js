import React, { useContext } from "react";

import TrialItem from './TrialItem';
import { ResourceContext } from '../contexts/ResourceContext';

function TrialsAndMinorChallenges({
	trials,
	mouseOver,
	mouseMove,
	mouseOut,
	onUnlockTrial,
	onCompleteTrial
}) {
	const { wp } = useContext(ResourceContext);
	let totalCompleted = 0;

  return (
		<div className="trials-tab">
			<h3 className="trials-tab__title">
				Trials and minor challenges
			</h3>

			<div className="trials-tab__sets">
				{trials.map((item) => {
					totalCompleted += item.completed;
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
			<div className="trials-tab__resources">
				<p className="trials-tab__resource">
					WP: {wp}
				</p>
				<p className="trials-tab__resource">
					Done: {totalCompleted}
				</p>
			</div>
		</div>
	)
}

export default TrialsAndMinorChallenges;