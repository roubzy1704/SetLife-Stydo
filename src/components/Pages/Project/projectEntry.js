import React from "react";
// import { Link } from "react-router-dom";

import Button from "../../../Shared/UIElements/Button/Button";
import hangar from "../../../Images/hangar.png";
import trashCan from "../../../Images/trashCan.png";
import "./projectEntry.css";

const projectEntry = (props) => {
	const { values, deleteProject, dashboard } = props;
	const { projectCreateDate, projectName, productionDate, projectId } = values;

	//if display on dashboard, return shortened version of project Entry
	const projectEntryDisplay =
		dashboard === "true" ? (
			<Button to={`/ProjectBoard/${projectId}`}>
				<div className="dashProjectEntry row">
					<div className="col-sm-2 icon">
						<img src={hangar} className="hangar" alt="hangar"></img>
					</div>
					<div className="col-sm-10 projectName dashEntry textFont">
						<p>
							{projectName} / {productionDate}
						</p>
					</div>
				</div>
			</Button>
		) : (
			//else return long version with delete button

			<div className="projectEntry row">
				{/* these columns each is wrapped with a button component, the reason we cant wrap
			the whole thing with a single button component, is because we dont want to deleteProject button
			to be triggered, when a project link is clicked */}
				<div className="col-sm-1">
					<Button to={`/ProjectBoard/${projectId}`}>
						<img src={hangar} alt="hangar"></img>
					</Button>
				</div>

				<div className="col-sm-6 projectName">
					<Button to={`/ProjectBoard/${projectId}`}>
						<p>
							{projectName} / {productionDate}
						</p>
					</Button>
				</div>
				<div className=" col-sm-4 projectCreateDate">
					<Button to={`/ProjectBoard/${projectId}`}>
						<p>{projectCreateDate}</p>
					</Button>
				</div>

				<div className=" col-sm-1">
					<label onClick={() => deleteProject(projectId)}>
						<img src={trashCan} alt="hangar" className="trashCan"></img>
					</label>
				</div>
			</div>
		);

	return projectEntryDisplay;
};

export default projectEntry;
