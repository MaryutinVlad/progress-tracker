import React from "react";
import { Routes, Route } from 'react-router-dom';

import Navigation from './Navigation';
import Activities from './Activities';
import Achievements from './Achievements';
import Trials from './Trials';
import Statistics from './Statistics';

function Main({ currentActivities, availableActivities, onClickEvent, wp, slots, onEndDay, isDataSent }) {

  return (
    <div className="main">
      <Navigation />

      <Routes>

        <Route 
          path="/activities"
          element={
            <Activities
              currentActivities={currentActivities}
              availableActivities={availableActivities}
              handleActivityClick={ onClickEvent }
              wp={wp}
              slots={slots}
              onEndDay={onEndDay}
              isDataSent={isDataSent}
            />
          }
        />

        <Route 
          path="/trials"
          element={
            <Trials />
          }
        />

        <Route 
          path="/achievements"
          element={
            <Achievements />
          }
        />

        <Route 
          path="/statistics"
          element={
            <Statistics />
          }
        />

      </Routes>
      
    </div>
  )
}

export default Main;