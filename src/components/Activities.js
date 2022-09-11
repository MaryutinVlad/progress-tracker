import React, { useState } from "react";
import AvailableActivityItem from './AvailableActivityItem';
import CurrentActivityItem from "./CurrentActivityItem";

function Activities({ availableActivities, currentActivities, handleActivityClick, wp, slots, onEndDay, isDataSent, onClick }) {

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');
  const [values, setValues] = useState({});

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

  function handleClick(data) {
    handleActivityClick(data);
  }

  function gatherValue(data) {
    setValues(Object.assign(values, data));
  }

  function endDay() {
    onEndDay(values);
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
              gatherValue={gatherValue}
              completed={item.completed}
              isDataSent={isDataSent}
              onClick={onClick}
            />
          )
        })}
        <div className="activities__current-slots">
          <span
            className="activities__slots-number"
            onMouseOver={() => {
              setTitle('Willpower');
              setDescription('Main resource for purchasing activities, upgrades and many other things');
            }} 
            onMouseOut={() => {
              setTitle('');
              setDescription('');
            }}
          >
            WP: {wp}
          </span>
          <span
            className="activities__slots-number"
            onMouseOver={() => {
              setTitle('Slots');
              setDescription('Amount of activities you can add');
            }} 
            onMouseOut={() => {
              setTitle('');
              setDescription('');
            }}
          >
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
        <div className="activities__global-buttons">
          <button
            className="buttons__end-day"
            onClick={endDay}
            onMouseOver={() => {
              setDescription('Submit completed activities to get WP');
            }} 
            onMouseOut={() => {
              setDescription('');
            }}
          >
            End day
          </button>
          <button
            className="buttons__restart"
            onMouseOver={() => {
              setTitle('Restart map');
              setDescription('You will lose all your current progress and start with 1 slot and 10 WP');
            }} 
            onMouseOut={() => {
              setTitle('');
              setDescription('');
            }}
          >
            Erase map
          </button>
        </div>
      </div>

      <div className="activities__description">
        <span>{title ? `${title}` : ''}</span>
        <span>{description ? `${description}` : ''}</span>
        <span>{cost ? `${cost} WP` : ''}</span>
      </div>

    </div>
  )
}

export default Activities;