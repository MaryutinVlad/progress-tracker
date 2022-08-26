import React from "react";

function CurrentActivityItem({ name, description, mouseOver, mouseOut, source }) {

  function handleMouseOver() {
    mouseOver({ name, description});
  }

  function handleMouseOut() {
    mouseOut();
  }

  return (
    <img className="activities__item" alt={name} src={require(`../images/${source}`)} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
  )
}

export default CurrentActivityItem;