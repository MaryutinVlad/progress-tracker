import React, { useContext } from "react";

import { ResourceContext } from '../contexts/ResourceContext';

function AvailableActivityItem({
  id,
  name,
  description,
  cost,
  source,
  mouseOver,
  mouseOut,
  click,
  isZone
}) {

  const wpCount = useContext(ResourceContext);

  const classList = "activities__available-item" + (((wpCount.wp < cost && isZone) || (wpCount.slots < 1 && !isZone)) ? " activities__available-item_paled" : "");

  function handleMouseOver() {
    if (isZone) {
      mouseOver({ name, description, cost: `${cost} WP` });
    } else {
      mouseOver({ name, description });
    }
  }

  function handleMouseOut() {
    mouseOut();
  }

  function handleActivityClick() {
    if (isZone && wpCount.wp >= cost) {
      return click(id);
    }

    if (wpCount.slots) {
      return click(id);
    }

    console.log(wpCount.wp < cost ? 'Not enough WP' : 'No slots available');
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