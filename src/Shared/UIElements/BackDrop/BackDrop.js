import React from "react";
import ReactDOM from "react-dom";

import "./BackDrop.css";

//this component renders a div behind the side drawer and is used to deselect the sidedrawer
//this
const Backdrop = (props) => {
	//Portal allows you render a component in a different place than the component itself
	//this backdrop component is render in the backdrop-hook div, which is in the index.html file
	//above the drawer-hook and root div
	//look at side drawer component for a similar approach, portal requires some content in a div, and a dom call
	//to place on where to place that content
	return ReactDOM.createPortal(
		<div className="backdrop" onClick={props.onClick}></div>,
		document.getElementById("backdrop-hook")
	);
};

export default Backdrop;
