import React, { useContext } from "react";

import { ResourceContext } from '../contexts/ResourceContext';

function AvailableActivityItem({ name, description, cost, mouseOver, mouseOut, click, id, source }) {

  const wpCount = useContext(ResourceContext);

  const classList = "activities__item" + (wpCount.wp < cost ? " activities__item_paled" : "");

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
    <img
      className={classList}
      alt={name}
      src={require(`../images/${source}`)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleActivityClick}
    />
  )
}

export default AvailableActivityItem;