import React from "react";
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <div className="navigation">
      <NavLink className="navigation__link" to='/maps'>Maps</NavLink>
      <NavLink className="navigation__link" to='/trials'>Trials</NavLink>
      <NavLink className="navigation__link" to='/achievements'>Achievements</NavLink>
      <NavLink className="navigation__link" to='/statistics'>Statistics</NavLink>
    </div>
  )
}

export default Navigation;