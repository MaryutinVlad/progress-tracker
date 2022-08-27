import React, { useState } from "react";

function CurrentActivityItem({ name, description, mouseOver, mouseOut, source, rank }) {

  let [progress, setProgress] = useState(0);

  function handleMouseOver() {
    mouseOver({ name, description});
  }

  function handleMouseOut() {
    mouseOut();
  }

  function handleProgressClick() {
    setProgress((progress + 1) % 100);
  }

  return (
    <div className="activities__current-item">
      <img className="activities__current-image" alt={name} src={require(`../images/${source}`)} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
      <div className="activities__info">
        <h3 className="activities__info-title">
          {name}
        </h3>
        <div className="activities__progress-bar"
          onClick={handleProgressClick}
          style={{ "background": `linear-gradient(to right, rgb(200, 38, 38) ${progress}%, #2c3441 ${progress}%)`}}
        >
          <div className="activities__progress-info">
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