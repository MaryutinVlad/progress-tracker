import React, { useState } from "react";

import TrialsAndMinorChallenges from './Trials&MinorChallenges';
import ActionsAndMajorChallenges from './Actions&MajorChallenges';

function Trials({ trials, challenges, actions }) {

  const [popupClassList, setPopupClassList] = useState('challenges__popup');
  const [coordinates, setCoordinates] = useState([]);
  const [popupInfo, setPopupInfo] = useState('');

  function openPopup(data) {
    setPopupInfo(data);
    setPopupClassList(popupClassList + ' challenges__popup_opened');
  }

  function getCoordinates(e) {
    const newCoordinates = [e.pageX + 10, e.pageY - 115];
    setCoordinates(newCoordinates);
  }

  function closePopup() {
    setPopupClassList('challenges__popup');
  }

  return (
    <div className="trials">
      <TrialsAndMinorChallenges
       trials={trials}
       mouseOver={openPopup}
       mouseMove={getCoordinates}
       mouseOut={closePopup}
      />
      <ActionsAndMajorChallenges
        actions={actions}
        challenges={challenges}
        mouseOver={openPopup}
        mouseMove={getCoordinates}
        mouseOut={closePopup}
      />
      <div className={popupClassList} style={{top: coordinates[1], left: coordinates[0]}}>
        <span>{popupInfo.name}</span>
        <span>{popupInfo.description}</span>
        <span>Reward: {popupInfo.reward ? popupInfo.reward : popupInfo.baseReward} WP</span>
      </div>
    </div>
  )
}

export default Trials;