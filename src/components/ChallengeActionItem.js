import React from "react";

function ChallengeActionItem({ name, description, reward, mouseOver, mouseMove, mouseOut }) {

	function handleMouseOver() {
		mouseOver({ name, description, reward });
	}

  return (
		<div className="challenges__item">
      <img className="challenges__item-image" alt={name}  onMouseOver={handleMouseOver} onMouseMove={mouseMove} onMouseOut={mouseOut} />
      <button className="challenges__buy-button">Complete</button>
    </div>
	)
}

export default ChallengeActionItem;