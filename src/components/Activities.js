import React, { useState } from "react";
import ActivityItem from './ActivityItem';

function Activities({ data }) {

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');

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

  return (
    <div className="activities">

      <div className="activities__current">
        <div className="activities__current-slots">
          <h2 className="activities__slots-number">
            Slots: 
          </h2>
        </div>
      </div>

      <div className="activities__available">
        {data.map(item => {
          return (
            <ActivityItem
              key={item._id}
              name={item.name}
              description={item.description}
              cost={item.cost}
              mouseOver={handleMousingOverItem}
              mouseOut={handleMousingOut} />
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