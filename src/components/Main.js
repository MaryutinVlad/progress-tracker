import React from "react";
import { Routes, Route } from 'react-router-dom';

import Navigation from './Navigation';
import Activities from './Activities';
import Achievements from './Achievements';
import Trials from './Trials';
import Statistics from './Statistics';

function Main({
  availableActivities,
  availableZones,
  onPurchaseActivity,
  wp,
  slots,
  onEndDay,
  isDataSent,
  availableTrials,
  availableChallenges,
  availableActions,
  onPurchaseZone,
  onMapRestart,
  onUpgradeClick,
  upgradeCost
}) {

  return (
    <div className="main">
      <Navigation />

      <Routes>

        <Route 
          path="/trials"
          element={
            <Trials
              availableTrials={availableTrials}
              availableChallenges={availableChallenges}
              availableActions={availableActions}
            />
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

        <Route 
          path='/activities'
          element={
            <Activities
              availableActivities={availableActivities}
              availableZones={availableZones}
              onPurchaseActivity={onPurchaseActivity}
              onUpgradeClick={onUpgradeClick}
              wp={wp}
              slots={slots}
              onEndDay={onEndDay}
              isDataSent={isDataSent}
              onPurchaseZone={onPurchaseZone}
              onMapRestart={onMapRestart}
              upgradeCost={upgradeCost}
            />
          }
        />

      </Routes>
      
    </div>
  )
}

export default Main;