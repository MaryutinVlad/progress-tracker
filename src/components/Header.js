import React from "react";
import logo from '../images/logo.png';

function Header({ logout, email }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Progress tracker"/>
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