import React from "react";
import Button from "../../../Shared/UIElements/Button/Button";

import "./Database.css";

const Database = () => {
	return (
		<div className="center">
			<div className="row">
				<div className="col-md-2 pageNav">
					<span style={{ textDecoration: "underline" }}>
						<Button to="/dashBoard">Home</Button>
					</span>
					/ Database
				</div>

				<div className="col col-md-9">Database</div>
			</div>
		</div>
	);
};

export default Database;
