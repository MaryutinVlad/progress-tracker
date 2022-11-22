import React from "react";

function LocalModePopup({
  isShown,
	onCloseClick,
	onSubmit
}) {

	function closeClick() {
		onCloseClick(false);
	}

	function enableLocalMode(e) {
		e.preventDefault();
		onSubmit(true);
	}

  return (
		<div className={`overlay ${isShown ? 'overlay_visible' : ''}`} onClick={closeClick}>
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
					onClick={enableLocalMode}
			  >
				  Start in local mode
			  </button>
		  </form>
		</div>
	)
}

export default LocalModePopup;