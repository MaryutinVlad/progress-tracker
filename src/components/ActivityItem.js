import React, { useState } from "react";

function ActivityItem({ name, description, cost, mouseOver, mouseOut, click, id }) {

  function handleMouseOver() {
    mouseOver({ name, description, cost });
  }

  function handleMouseOut() {
    mouseOut();
  }

  function handleActivityClick() {
    click(id);
  }

  return (
    <img className="activities__item" alt={name} src="" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleActivityClick} />
  )
}

export default ActivityItem;