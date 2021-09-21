import React from "react";
import { useHistory } from "react-router-dom";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
	const history = useHistory();

	if (props.goBack) {
		history.goBack();
	}
	return (
		<div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
			<div className="lds-dual-ring"></div>
		</div>
	);
};

export default LoadingSpinner;
