import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

// used for genral blue button around the website
const Button = (props) => {
	const {
		onClick,
		children,
		type,
		disabled,
		htmlFor,
		to,
		exact,
		className,
	} = props;

	if (to) {
		return (
			<Link to={to} exact={exact} className={`blue-button-link ${className}`}>
				{children}
			</Link>
		);
	}
	return (
		<button
			type={type}
			className={`blue-button ${className}`}
			onClick={onClick}
			disabled={disabled}
			htmlFor={htmlFor}
		>
			{children}
		</button>
	);
};

export default Button;
