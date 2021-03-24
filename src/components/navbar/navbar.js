import React from "react";
import { NavLink } from "react-router-dom";

import "./navbar.css";
import Avatar from "../../Images/avatar.png";

const navbar = (props) => {
	return (
		<React.Fragment>
			<nav className="navbar navbar-expand-lg navbar-light bg-white">
				<NavLink to="/" className="navbar-brand" exact>
					STYDO
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<NavLink to="/dashboard" className="nav-link" exact>
								Dashboard <span className="sr-only">(current)</span>
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/projectHome" className="nav-link" exact>
								Projects
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/notFound" className="nav-link " exact>
								Forum
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/database" className="nav-link " exact>
								Database
							</NavLink>
						</li>
						{/* <li className="nav-item">
							<NavLink to="/notFound" className="nav-link " exact>
								Search
							</NavLink>
						</li> */}
						<img src={Avatar} alt="Avatar" className="avatar"></img>
					</ul>
				</div>
			</nav>
		</React.Fragment>
	);
};

export default navbar;
