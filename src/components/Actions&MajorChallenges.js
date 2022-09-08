import React, { useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';

function ActionsAndMajorChallenges({ availableChallenges, availableActions }) {

  const [switchInfo, setSwitchInfo] = useState([]);

  function switchToChallenges() {
    setSwitchInfo(availableChallenges);
  }

  function switchToActions() {
    setSwitchInfo(availableActions);
  }

  return (
    <div className="challenges">
			<div className="challenges__navigation">
        <button className="challenges__navigation-link" onClick={switchToActions}>Actions</button>
        <button className="challenges__navigation-link" onClick={switchToChallenges}>Challenges</button>
			</div>
			<div className="challenges__container">
        {switchInfo.map((item) => {
          return (
            <div className="challenges__item">{item.name}</div>
          )
        })}
			</div>
    </div>
	)
}

export default ActionsAndMajorChallenges;