import React, { useState } from "react";

function ActivityItem({ name, description, cost, mouseOver, mouseOut }) {

  function handleMouseOver() {
    mouseOver({ name, description, cost });
  }

  function handleMouseOut() {
    mouseOut();
  }

  return (
    <img className="activities__item" alt={name} src="" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
  )
}

export default ActivityItem;