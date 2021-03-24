import React from "react";

import ProjectEntry from "./projectEntry";

const ProjectList = (props) => {
	const { projectList, deleteProject, dashboard } = props;

	// console.log(projectList.length);

	if (projectList.length === 0) {
		return (
			<div>
				<h3>No Project Available</h3>
				<h5>Create One Below</h5>
			</div>
		);
	}

	//if displaying on dashboard only display show first 3 results
	if (dashboard === "true") {
		let shortProjectList = [];
		let length = Math.min(projectList.length, 3);
		for (let i = 0; i < length; i++) {
			shortProjectList.push(projectList[i]);
		}
		return (
			<ul>
				{shortProjectList.map((eachProject) => {
					return (
						<ProjectEntry
							key={eachProject.projectId}
							values={eachProject}
							dashboard={dashboard}
						/>
					);
				})}
			</ul>
		);
	}

	//else display is on project tab
	return (
		<ul>
			{projectList.map((eachProject) => {
				return (
					<ProjectEntry
						key={eachProject.projectId}
						values={eachProject}
						deleteProject={deleteProject}
					/>
				);
			})}
		</ul>
	);
};

export default ProjectList;
