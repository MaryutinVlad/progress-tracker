import React from "react";
import { Routes, Route } from 'react-router-dom';

import Navigation from './Navigation';
import Activities from './Activities';
import Achievements from './Achievements';
import Trials from './Trials';
import Statistics from './Statistics';
import FrontPage from './FrontPage';

function Main({
  availableActivities,
  currentActivities,
  zones,
  trials,
  challenges,
  actions,
  achievements,
  onPurchaseActivity,
  onEndDay,
  onPurchaseZone,
  onMapRestart,
  onUpgradeActivity,
  isDataSent,
  upgradeCost,
  onUnlockTrial,
  onCompleteTrial
}) {

  return (
    <div className="main">
      <Navigation />

      <Routes>

        <Route 
          path="/trials"
          element={
            <Trials
              trials={trials}
              challenges={challenges}
              actions={actions}
              onUnlockTrial={onUnlockTrial}
              onCompleteTrial={onCompleteTrial}
            />
          }
        />

        <Route 
          path="/achievements"
          element={
            <Achievements
              achievements={achievements}
            />
          }
        />

        <Route 
          path="/statistics"
          element={
            <Statistics />
          }      
        />

        <Route 
          path='/activities'
          element={
            <Activities
              availableActivities={availableActivities}
              currentActivities={currentActivities}
              zones={zones}
              onPurchaseActivity={onPurchaseActivity}
              onUpgradeActivity={onUpgradeActivity}
              onEndDay={onEndDay}
              isDataSent={isDataSent}
              onPurchaseZone={onPurchaseZone}
              onMapRestart={onMapRestart}
              upgradeCost={upgradeCost}
            />
          }
        />

        <Route
          path="*"
          element= {
            <FrontPage />
          }
        />

      </Routes>
      
    </div>
  )
}

export default Main;