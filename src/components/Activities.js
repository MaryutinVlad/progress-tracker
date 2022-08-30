import React, { useState } from "react";
import AvailableActivityItem from './AvailableActivityItem';
import CurrentActivityItem from "./CurrentActivityItem";

function Activities({ availableActivities, currentActivities, handleActivityClick, wp, slots }) {

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');

  function handleMousingOverItem(item) {
    setDescription(item.description);
    setTitle(item.name);
    setCost(item.cost);
  }

  function handleMousingOut() {
    setDescription('');
    setTitle('');
    setCost('');
  }

  function handleClick(id) {
    handleActivityClick(id);
  }

  return (
    <div className="activities">

      <div className="activities__current">
        {currentActivities.map(item => {
          return (
            <CurrentActivityItem
              key={item._id}
              name={item.name}
              description={item.description}
              mouseOver={handleMousingOverItem}
              mouseOut={handleMousingOut}
              id={item._id}
              source={item.src}
              rank={item.rank}
            />
          )
        })}
        <div className="activities__current-slots">
          <span className="activities__slots-number">
            WP: {wp}
          </span>
          <span className="activities__slots-number">
          Slots: {slots}
          </span>
        </div>
      </div>

      <div className="activities__available">
        {availableActivities.map(item => {
          return (
            <AvailableActivityItem
              key={item._id}
              name={item.name}
              description={item.description}
              cost={item.cost}
              mouseOver={handleMousingOverItem}
              mouseOut={handleMousingOut}
              click={handleClick}
              id={item._id}
              source={item.src}
            />
          )
        })}
      </div>

      <div className="activities__description">
        {title ? `Title: ${title}` : ''}<br/>
        {description ? `Description: ${description}` : ''}<br/>
        {cost ? `Cost: ${cost}` : ''}
      </div>

    </div>
  )
}

export default Activities;