import React from "react";
import { Link } from "react-router-dom";

import Button from "../../Shared/UIElements/Button/Button";
import NotFoundImg from "../../Images/404NotFound.png";

//TODO spruce up Not Found page, and move to folder
const NotFound = () => {
	return (
		<React.Fragment>
			<div className="container text-center mt-5">
				<img src={NotFoundImg} alt="NotFoundImage"></img>
				<h3>Sorry this page has not been created yet</h3>
				<Link to="/">
					<Button value="GO TO HOMEPAGE" type="submit" />
				</Link>
			</div>
		</React.Fragment>
	);
};

export default NotFound;
