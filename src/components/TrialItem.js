import React from "react";

function TrialItem({ name, description, baseReward, mouseOver, mouseMove, mouseOut }) {

	function handleMouseOver() {
		mouseOver({ name, description, baseReward });
	}

  return (
		<div className="trialItem">
			<img className="trialItem__image" alt={name} onMouseOver={handleMouseOver} onMouseMove={mouseMove} onMouseOut={mouseOut} />
			<button className="trialItem__unlock-button">unlock</button>
			<button className="trialItem__complete-button">complete</button>
		</div>
	)
}

export default TrialItem;