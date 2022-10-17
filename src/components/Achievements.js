import React from "react";
import AchievementItem from "./AchievementItem";

function Achievements({ achievements }) {
  return (
    <div className="achievements">
      {achievements.map(item => {
        return (
          <AchievementItem
            key={item._id}
            name={item.name}
            description={item.description}
            reward={item.reward}
            cost={item.cost}
            achieved={item.achieved}
          />
        )
      })}
    </div>
  )
}

export default Achievements;