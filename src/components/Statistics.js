import React from "react";

import StatisticsItem from "./StatisticsItem";

function Statistics({ data }) {

  return (
    <div className="statistics">
      {data.map(item => {
        return (
          <StatisticsItem
            key={item.title}
            title={item.title}
            value={item.value}
          />
        )
      })}
      <div className="overlay_in-section_first">
      </div>
      <div className="overlay_in-section_second">
      </div>
      <div className="overlay_in-section_third">
      </div>
      <div className="overlay_in-section_fourth">
      </div>
      <div className="overlay_in-section_last">
      </div>
    </div>
  )
}

export default Statistics;