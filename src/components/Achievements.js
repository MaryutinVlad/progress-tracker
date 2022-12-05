import React, { useState } from "react";
import AchievementItem from "./AchievementItem";

function Achievements({ achievements }) {

  const [popupClassList, setPopupClassList] = useState('challenges__popup');
  const [coordinates, setCoordinates] = useState([]);
  const [popupInfo, setPopupInfo] = useState('');
  console.log(achievements)

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
    <div className="achievements">
      {achievements.map(item => {
        return (
          <>
            <AchievementItem
              key={item._id}
              name={item.name}
              description={item.description}
              reward={item.reward}
              cost={item.cost}
              achieved={item.achieved}
              mouseOver={openPopup}
              mouseMove={getCoordinates}
              mouseOut={closePopup}
            />
            <div className={popupClassList} style={{top: coordinates[1], left: coordinates[0]}}>
              <span>{popupInfo.name}</span>
              <span>{popupInfo.description}</span>
              <span>Reward: {popupInfo.reward ? popupInfo.reward : popupInfo.baseReward} WP</span>
            </div>
          </>
        )
      })}
    </div>
  )
}

export default Achievements;