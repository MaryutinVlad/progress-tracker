import React, { useState, useEffect } from "react";

import ChallengeActionItem from './ChallengeActionItem';

function ActionsAndMajorChallenges({ availableChallenges, availableActions, mouseOver, mouseMove, mouseOut }) {

  const [switchInfo, setSwitchInfo] = useState([]);

  function switchToChallenges() {
    setSwitchInfo(availableChallenges);
  }

  function switchToActions() {
    setSwitchInfo(availableActions);
  }

  useEffect(() => {
    setSwitchInfo(availableChallenges);
  }, []);

  return (
    <div className="challenges">
			<div className="challenges__navigation">
        <button className="challenges__navigation-link" onClick={switchToActions}>Actions</button>
        <button className="challenges__navigation-link" onClick={switchToChallenges}>Challenges</button>
			</div>
			<div className="challenges__container">
        {switchInfo.map((item) => {
          return (
            <ChallengeActionItem 
              key={item._id}
              name={item.name}
              description={item.description}
              reward={item.reward}
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

export default ActionsAndMajorChallenges;