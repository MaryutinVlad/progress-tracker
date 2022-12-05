import React from "react";

import StatisticsItem from "./StatisticsItem";
import listOfStatistics from "../resources/listOfStatistics.json";

function Statistics() {
  return (
    <div className="statistics">
      {
        listOfStatistics.map(item => {
          return (
            <StatisticsItem
              title={item}
            />
          )
        })
      }
    </div>
  )
}

export default Statistics;