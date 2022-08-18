import React, { useState } from "react";

function Activities({ data }) {

  const [description, setDescription] = useState('');

  function viewDescription(e) {
    setDescription(e.target.name + '\n' + e.target.value);
  }

  return (
    <div className="activities">

      <div className="activities__current">
        <div className="activities__current-slots">
          <h2 className="activities__slots-number">
            Slots: 
          </h2>
        </div>
      </div>

      <div className="activities__available">
        {data.map(item => {
          return (<img key={item._id} alt={item.name} name={item.description} value={item.cost} onMouseOver={viewDescription} />)
        })}
      </div>

      <div className="activities__description">
        {description}
      </div>

    </div>
  )
}

export default Activities;