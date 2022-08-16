import React from "react";
import { Routes, Route } from 'react-router-dom';

import Navigation from './Navigation';
import Maps from './Maps';
import Achievements from './Achievements';
import Trials from './Trials';
import Statistics from './Statistics';

function Main({ test }) {

  return (
    <div className="main">
      <Navigation />

      <Routes>

        <Route 
          path="/maps"
          element={
            <Maps />
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