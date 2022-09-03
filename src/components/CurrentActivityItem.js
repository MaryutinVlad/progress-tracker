import React, { useState, useEffect } from "react";
import arrow from '../images/arrow-button.png';

function CurrentActivityItem({ name, description, mouseOver, mouseOut, source, rank, gatherValue }) {

  const [progress, setProgress] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  function handleMouseOver() {
    mouseOver({ name, description});
  }

  function handleMouseOut() {
    mouseOut();
  }

  function handleProgressClick() {
    setProgress((progress + 1) % 100);
  }

  function increaseValue() {
    setInputValue(inputValue + 1);
    gatherValue({ [name]: inputValue });
  }

  function decreseValue() {
    if (inputValue) {
      setInputValue(inputValue - 1);
    }
    gatherValue({ [name]: inputValue });
  }

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
          <img className="buttons__arrow buttons__arrow_down" src={arrow} alt="down" onClick={decreseValue} />
        </div>

        <div className="activities__progress-bar"
          onClick={handleProgressClick}
          style={{ "background": `linear-gradient(to right, rgb(200, 38, 38) ${progress}%, #2c3441 ${progress}%)`}}
        >
          <div className="activities__progress-bar_completed">
            {progress}%
          </div>
        </div>

        <p className="activities__info-rank">
          {rank}
        </p>
        
      </div>
    </div>
  )
}

export default CurrentActivityItem;