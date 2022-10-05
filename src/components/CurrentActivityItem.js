import React, { useState, useEffect, useContext } from "react";

import { ResourceContext } from "../contexts/ResourceContext";
import arrow from '../images/arrow-button.png';
import { rankList } from '../utils/tabs';

function CurrentActivityItem({
  id,
  name,
  description,
  rank,
  source,
  completed,
  step,
  rankTab,
  onMouseOver,
  onMouseOut,
  onArrowClick,
  onUpgradeClick,
  isDataSent,
  upgradeCost
}) {

  const [inputValue, setInputValue] = useState(0);
  const [activityRank, setActivityRank] = useState(rank);

  const wpCount = useContext(ResourceContext);

  function handleMouseOver() {
    onMouseOver({ name, description });
  }

  function handleMouseOverUpButton() {
    onMouseOver({ upgradeCost, rank, rankTitle: rankList[rank] });
  }

  function handleMouseOut() {
    onMouseOut();
  }

  function calculatePercentage(minor, major) {
    return Math.round((minor / major) * 100)
  }

  function increaseValue() {
    setInputValue(inputValue + step);
    onArrowClick({ [name]: { totalValue: (inputValue + step) * rank + completed, currentValue: (inputValue + step) * rank } });
  }

  function handleUpgradeClick() {
    if (wpCount.wp >= upgradeCost) {
      onUpgradeClick(id, rank + 1 );
      setActivityRank(rank + 1);
    } else {
      console.log('Not enough WP');
    }
  }

  function decreaseValue() {
    if (inputValue) {
      setInputValue(inputValue - step);
      onArrowClick({ [name]: { totalValue: (inputValue - step) * rank + completed, currentValue: (inputValue - step) * rank } });
    }
  }

  useEffect(() => {
    setInputValue(0);
  }, [isDataSent]);

  return (
    <div className="activities__current-item">
      <img className="activities__current-image" alt={name} src={require(`../images/${source}`)} onMouseOver={handleMouseOver} ononMouseOut={handleMouseOut} />
      <div className="activities__info">

        <h3 className="activities__info-title">
          {name}
        </h3>
        
        <div className="activities__progress-input">
          <img className="buttons__arrow" src={arrow} alt="up" onClick={increaseValue} />
          <span className="activities__progress-value">
            {inputValue}
          </span>
          <img className="buttons__arrow buttons__arrow_down" src={arrow} alt="down" onClick={decreaseValue} />
        </div>

        <div className="activities__progress-bar"
          style={
            { "background": `linear-gradient(to right, rgb(176, 66, 32) 
            ${calculatePercentage(completed, rankTab[rank - 1])}%,
             transparent ${calculatePercentage(completed, rankTab[rank - 1])}%)`}
            }
        >
          <div className="activities__progress-bar_completed">
            {calculatePercentage(completed, rankTab[rank - 1])} %
          </div>
        </div>

        <div className="activities__info-rank">
          <button
           className={`activities__upgrade-button ${rank >= 3 ? 'activities__upgrade-button_disabled' : ''}`}
           onClick={handleUpgradeClick}
           onMouseOver={handleMouseOverUpButton}
           onMouseOut={handleMouseOut}
           disabled={rank >= 3 ? true : false}
          />
          <span>
            {rankList[activityRank]}
          </span>
        </div>
        
      </div>
    </div>
  )
}

export default CurrentActivityItem;