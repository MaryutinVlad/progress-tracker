import React from "react";

function Header({ logout, email }) {
  return (
    <header className="header">
      <h1 className="header__title">
        Header
      </h1>
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