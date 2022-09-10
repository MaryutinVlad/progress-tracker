import React, { useState, useEffect } from "react";
import arrow from '../images/arrow-button.png';

function CurrentActivityItem({ name, description, mouseOver, mouseOut, source, rank, gatherValue, completed, isDataSent }) {

  const [inputValue, setInputValue] = useState(0);

  function handleMouseOver() {
    mouseOver({ name, description});
  }

  function handleMouseOut() {
    mouseOut();
  }

  function increaseValue() {
    setInputValue(inputValue + 1);
    gatherValue({ [name]: inputValue + 1 + completed });
  }

  function decreaseValue() {
    if (inputValue) {
      setInputValue(inputValue - 1);
      gatherValue({ [name]: inputValue - 1 + completed });
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
          style={{ "background": `linear-gradient(to right, rgb(200, 38, 38) ${completed}%, #2c3441 ${completed}%)`}}
        >
          <div className="activities__progress-bar_completed">
            {completed}%
          </div>
        </div>

        <div className="activities__info-rank">
          <button className="activities__upgrade-button">
            upgrade
          </button>
          <span>
            {rank}
          </span>
        </div>
        
      </div>
    </div>
  )
}

export default CurrentActivityItem;