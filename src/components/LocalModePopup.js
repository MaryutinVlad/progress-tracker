import React from "react";

function LocalModePopup() {
  return (
		<div className="overlay">
		  <form className="localMode">
			  <h3 className="localMode__title">
				  Connection failed
			  </h3>
			  <p className="localMode__description">
				  Something is wrong with server or Internet connection.
				  Try again later or check your connection.
				  You can also run programm locally.
			  </p>
			  <button
				  type="submit"
				  className="localMode__button"
			  >
				  Start in local mode
			  </button>
		  </form>
		</div>
	)
}

export default LocalModePopup;