import React, { useState, useEffect } from "react";

function ActionsAndMajorChallenges({ availableChallenges, availableActions }) {

  const [switchInfo, setSwitchInfo] = useState([]);
  const [popupClassList, setPopupClassList] = useState('challenges__popup');
  const [coordinates, setCoordinates] = useState([]);

  function switchToChallenges() {
    setSwitchInfo(availableChallenges);
  }

  function switchToActions(e) {
    setSwitchInfo(availableActions);
  }

  function openPopup(e) {
    setPopupClassList(popupClassList + ' challenges__popup_opened');
  }

  function getCoordinates(e) {
    const newCoordinates = [e.pageX + 10, e.pageY - 50];
    setCoordinates(newCoordinates);
  }

  function closePopup() {
    setPopupClassList('challenges__popup');
  }

  useEffect(() => {
    setSwitchInfo(availableChallenges);
  }, []);

  return (
    <div className="challenges">
			<div className="challenges__navigation">
        <button className="challenges__navigation-link" onClick={switchToActions}>Actions</button>
        <button className="challenges__navigation-link" onClick={switchToChallenges}>Challenges</button>
			</div>
			<div className="challenges__container">
        {switchInfo.map((item) => {
          return (
            <div key={item._id} className="challenges__item">
              <img className="challenges__item-image" alt={item.name}  onMouseOver={openPopup} onMouseMove={getCoordinates} onMouseOut={closePopup} />
              <button className="challenges__buy-button">Complete</button>
            </div>
          )
        })}
			</div>
      <div className={popupClassList} style={{top: coordinates[1], left: coordinates[0]}}>
        ok
      </div>
    </div>
	)
}

export default ActionsAndMajorChallenges;