import React, { useState } from "react";
import testImage from "../images/-Hm.png"

function AchievementItem({ name, description, reward, cost, achieved, mouseMove, mouseOut, mouseOver }) {

	const [ isVisible, setIsVisible ] = useState(false);

	function handleMouseOver() {
		mouseOver({ name, description, reward });
	}

	function handleClickAchievement(e) {
		setIsVisible(!isVisible);
	}

  return (
		<div
		  className="achievementItem"
			onClick={handleClickAchievement}
			onMouseOver={handleMouseOver}
			onMouseMove={mouseMove}
			onMouseOut={mouseOut}
		>
	  	<img
			  className="achievementItem__image"
				alt={name}
				src={testImage}
			/>
		</div>
	)
}

export default AchievementItem;

/*{!isVisible ? (
	<img className={`achievementItem__image ${!achieved ? 'achievementItem__image_paled' : ''}`} alt={name} src={testImage} />
) : (
	<div className="achievements__info">
		<h3 className="achievements__info-title">{name}</h3>
		<p className="achievements__info-text">{description}</p>
		<p className="achievements__info-numbers">Reward: {reward} WP</p>
	</div>
)}*/