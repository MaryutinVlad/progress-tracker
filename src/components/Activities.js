import React, { useState, useEffect } from "react";
import ActivityItem from './ActivityItem';

function Activities({ data, handleActivityClick }) {

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');
  const [slots, setSlots] = useState(1);

  function handleMousingOverItem(param) {
    setDescription(param.description);
    setTitle(param.name);
    setCost(param.cost);
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
        {data.response.map(item => {
          return (
            <ActivityItem
              key={item._id}
              name={item.name}
              description={item.description}
              cost={item.cost}
              mouseOver={handleMousingOverItem}
              mouseOut={handleMousingOut}
              click={handleClick}
              id={item._id}
              />
          )
        })}
        <div className="activities__current-slots">
          <h2 className="activities__slots-number">
            Slots: {slots}
          </h2>
        </div>
      </div>

      <div className="activities__available">
        {data.availableActivities.map(item => {
          return (
            <ActivityItem
              key={item._id}
              name={item.name}
              description={item.description}
              cost={item.cost}
              mouseOver={handleMousingOverItem}
              mouseOut={handleMousingOut}
              click={handleClick}
              id={item._id}
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