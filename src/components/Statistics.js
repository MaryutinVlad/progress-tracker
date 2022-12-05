import React from "react";

import StatisticsItem from "./StatisticsItem";
import listOfStatistics from "../resources/listOfStatistics.json";

function Statistics() {

  const { titles } = listOfStatistics

  return (
    <div className="statistics">
      {titles.map(item => {
        return (
          <StatisticsItem
            key={item}
            title={item}
          />
        )
      })}
    </div>
  )
}

export default Statistics;