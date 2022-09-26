import React, { useState } from "react";
import AvailableActivityItem from './AvailableActivityItem';
import CurrentActivityItem from "./CurrentActivityItem";

function Activities({
  availableActivities,
  currentActivities,
  onPurchaseActivity,
  availableZones,
  wp,
  slots,
  onEndDay,
  isDataSent,
  onMapRestart,
  onPurchaseZone
}) {

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

  function handlePurchaseActivity(data) {
    onPurchaseActivity(data);
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
        {availableActivities.filter((item) => item.bought === true).map(item => {
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
              onClick={onPurchaseZone}
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
        {slots ? availableActivities.filter((item) => item.bought === false).map(item => {
          return (
            <AvailableActivityItem
              key={item._id}
              name={item.name}
              description={item.description}
              cost={item.cost}
              mouseOver={handleMousingOverItem}
              mouseOut={handleMousingOut}
              click={handlePurchaseActivity}
              id={item._id}
              source={item.src}
              zone={false}
            />
          )
        }) : availableZones.map(item => {
          return (
            <AvailableActivityItem
              key={item._id}
              name={item.name}
              description={item.description}
              cost={item.cost}
              mouseOver={handleMousingOverItem}
              mouseOut={handleMousingOut}
              click={onPurchaseZone}
              id={item._id}
              source={item.src}
              zone={true}
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
            onClick={onMapRestart}
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