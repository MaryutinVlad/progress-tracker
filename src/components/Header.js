import React from "react";

function Header({ logout, email }) {
  return (
    <header className="header">
      <div className="logo">
        <p className="logo__first-line logo__animation-first-line">Progress</p>
        <p className="logo__second-line logo__animation-second-line">tracker</p>
      </div>
      <div className="header__profile-info">
        { email && 
          <>
            <p className="header__profile-email">
              {email}
            </p>
            <button className="header__logout-button" onClick={logout}>
              Log out
            </button>
          </>
        }
      </div>
    </header>
    )
}

export default Header;