import React, { useState, useEffect } from "react";
import Day from "./Date";

function Dates() {
    
    const date = new Date();
    const options = {
        month: 'long',
        year: 'numeric',
        day: 'numeric'
    }
    const formatedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
    const [dates, setDates] = useState([]);


    function handleAddDate() {
        setDates((formatedDate) => [formatedDate,...dates]);
        localStorage.setItem('dates', JSON.stringify(dates));
        console.log(localStorage);
        //localStorage.removeItem('dates');
    }

    useEffect(() => {
        const savedDates = JSON.parse(localStorage.getItem('dates'));
         if (savedDates) {
          setDates([...savedDates, ...dates]);
          console.log(dates);
        }
    }, []);

    return (
        <div className="dates">
            <h2 className="dates__header">Dates</h2>
            <div className="dates__container">
            <button className="dates__add-button" onClick={handleAddDate}>+</button>
                {dates.map((item) => (
                    <Day key={Math.random()} date={formatedDate}/>
                ))}
            </div>
        </div>
    )
}

export default Dates;