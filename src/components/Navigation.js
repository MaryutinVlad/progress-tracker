import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';

function Navigation() {

  const location = useLocation();
  const activitiesClassList = `navigation__link ${location.pathname === '/activities' ? 'navigation__link_active' : ''}`;
  const trialsClassList = `navigation__link ${location.pathname === '/trials' ? 'navigation__link_active' : ''}`;
  const achievementsClassList = `navigation__link ${location.pathname === '/achievements' ? 'navigation__link_active' : ''}`;
  const statisticsClassList = `navigation__link ${location.pathname === '/statistics' ? 'navigation__link_active' : ''}`;
  
  useEffect(() => {
  }, [location.pathname]);

  return (
    <nav className="navigation">
      <NavLink className={activitiesClassList} to='/activities'>Activities</NavLink>
      <NavLink className={trialsClassList} to='/trials'>Trials</NavLink>
      <NavLink className={achievementsClassList} to='/achievements'>Achievements</NavLink>
      <NavLink className={statisticsClassList} to='/statistics'>Statistics</NavLink>
    </nav>
  )
}

export default Navigation;