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
				style={ isVisible ? {
					"transition-property": "transform transform-origin opacity",
					"opacity": "0",
					"transition-duration":".5s",
					"transform-origin": "0%",
					"transform": "rotateY(90deg)"
				} : {
					"transition-property": "transform transform-origin opacity",
					"opacity": "1",
					"transition-duration":".5s",
					"transform-origin": "0%",
					"transform": "rotateY(0deg)"
				}} 
			/>
	    <div
			  className="achievements__info"
				style={ isVisible ? {
					"transition-property": "transform transform-origin opacity",
					"opacity": "1",
					"transition-duration":".5s",
					"transform-origin": "100%",
					"transform": "rotateY(0deg)"
				} : {
					"transition-property": "transform transform-origin opacity",
					"opacity": "0",
					"transition-duration":".5s",
					"transform-origin": "100%",
					"transform": "rotateY(90deg)"
				}}
			>
		    <h3 className="achievements__info-title">{name}</h3>
		    <p className="achievements__info-text">{description}</p>
		    <p className="achievements__info-numbers">Reward: {reward} WP</p>
	    </div>
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