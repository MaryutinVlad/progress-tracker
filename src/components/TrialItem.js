import React, { useContext } from "react";

import { ResourceContext} from '../contexts/ResourceContext'

function TrialItem({
	item,
	mouseOver,
	mouseMove,
	mouseOut,
	onUnlockTrial,
	onCompleteTrial

}) {
	const { name, description, baseReward} = item;
	const { wp } = useContext(ResourceContext)

	function handleMouseOver() {
		mouseOver({ name, description, baseReward });
	}

	function handleUnlockTrial() {
		if (wp >= item.cost) {
		  onUnlockTrial(item);
		} else {
			console.log('Not enough WP');
		}
	}

	function handleCompleteTrial() {
		onCompleteTrial(item);
	}

  return (
		<div className="trialItem">
			<img
			  className="trialItem__image"
				alt={name}
				onMouseOver={handleMouseOver}
				onMouseMove={mouseMove}
				onMouseOut={mouseOut}
			/>
			{!item.unlocked ? (
			  <button
			    className="trialItem__unlock-button"
				  onClick={handleUnlockTrial}
			  >
				  unlock ({item.cost}WP)
			  </button>
			) : (
				<>
			    <p className="trialItem__unlocked">
					  unlocked
				  </p>
				  <button
					  className="trialItem__complete-button"
						onClick={handleCompleteTrial}
					>
				    complete
			    </button>
			  </>
			)}
		</div>
	)
}

export default TrialItem;