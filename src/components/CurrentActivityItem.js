import React, { useState, useEffect } from "react";
import arrow from '../images/arrow-button.png';
import { rankList } from '../utils/userLevelTab';

function CurrentActivityItem({
  id,
  name,
  description,
  mouseOver,
  mouseOut,
  source,
  rank,
  gatherValue,
  completed,
  isDataSent,
  onUpgradeClick,
  upgradeCost
}) {

  const [inputValue, setInputValue] = useState(0);

  function handleMouseOver() {
    mouseOver({ name, description});
  }

  function handleMouseOut() {
    mouseOut();
  }

  function increaseValue() {
    setInputValue(inputValue + 1);
    gatherValue({ [name]: { value: inputValue + 1 + completed, rank, input: inputValue + 1 } });
  }

  function handleUpgradeClick() {
    onUpgradeClick(id, rank + 1 );
  }

  function decreaseValue() {
    if (inputValue) {
      setInputValue(inputValue - 1);
      gatherValue({ [name]: { value: inputValue - 1 + completed, rank, input: inputValue + 1 } });
    }
  }

  useEffect(() => {
    setInputValue(0);
  }, [isDataSent])

  return (
    <div className="activities__current-item">
      <img className="activities__current-image" alt={name} src={require(`../images/${source}`)} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
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
          style={{ "background": `linear-gradient(to right, rgb(176, 66, 32) ${completed}%, transparent ${completed}%)`}}
        >
          <div className="activities__progress-bar_completed">
            {completed}%
          </div>
        </div>

        <div className="activities__info-rank">
          <button
           className={`activities__upgrade-button ${rank >= 3 ? 'activities__upgrade-button_disabled' : ''}`}
           onClick={handleUpgradeClick}
           disabled={rank >= 3 ? true : false}
          />
          <span>
            {rankList[rank]}
          </span>
        </div>
        
      </div>
    </div>
  )
}

export default CurrentActivityItem;