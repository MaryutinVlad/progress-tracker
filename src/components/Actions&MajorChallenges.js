import React from "react";
import { NavLink, useLocation } from 'react-router-dom';

function ActionsAndMajorChallenges() {
  return (
    <div className="challenges">
			<div className="challenges__navigation">
        <button className="challenges__navigation-link">Actions</button>
        <button className="challenges__navigation-link">Challenges</button>
			</div>
			<div className="challenges__container">

			</div>
    </div>
	)
}

export default ActionsAndMajorChallenges;