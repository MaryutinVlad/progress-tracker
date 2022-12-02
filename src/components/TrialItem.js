import React from "react";

function TrialItem({ item, mouseOver, mouseMove, mouseOut }) {
	const { name, description, baseReward} = item;

	function handleMouseOver() {
		mouseOver({ name, description, baseReward });
	}

	function handleUnlockTrial() {

	}

  return (
		<div className="trialItem">
			<img className="trialItem__image" alt={name} onMouseOver={handleMouseOver} onMouseMove={mouseMove} onMouseOut={mouseOut} />
			<button
			  className="trialItem__unlock-button"
				onClick={handleUnlockTrial}
			>
				unlock
				</button>
			<button className="trialItem__complete-button">complete</button>
		</div>
	)
}

export default TrialItem;