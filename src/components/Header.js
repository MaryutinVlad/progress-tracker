import React from "react";

function Header({ logout, levelProgress, days, userData, level }) {
  return (
    <header className="header">
      <div className="logo">
        <p className="logo__first-line logo__animation-first-line">Progress</p>
        <p className="logo__second-line logo__animation-second-line">tracker</p>
      </div>
      <div className="header__profile-info">
        { userData.email && 
          <>
            <p className="header__profile-name">
              {userData.name}
            </p>
            <p className="header__profile-level">
              <span className="header__level-current">Lvl: {level}</span>
              <span className="header__level-progress">{levelProgress}</span>
            </p>
            <div className="header__lower-section">
              <span className="header__day-counter">
                Days passed: {days}
              </span>
              <button className="header__logout-button" onClick={logout}>
                Log out
              </button>
            </div>
          </>
        }
      </div>
    </header>
    )
}

export default Header;