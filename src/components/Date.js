import React from "react";

function Day({date}) {

    return (
        <div className="dates__item">
          <p className="dates__item-data">
            {date}
          </p>
        </div>  
    )
}

export default Day;