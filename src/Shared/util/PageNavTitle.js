import React from "react";
import Button from "../UIElements/Button/Button";

export const ProjectBoardPageNav = (
	projectId,
	projectName,
	boardTitle,
	productionDate,
	addtionalRoute,
	user_id
) => {
	//this is the pageNav for components in projectBoard
	if (!addtionalRoute) {
		return (
			<React.Fragment>
				<div className="pageNav">
					<span style={{ textDecoration: "underline" }}>
						<Button to="/dashBoard">Home </Button>
					</span>{" "}
					/{" "}
					<span style={{ textDecoration: "underline" }}>
						<Button to="/projectHome">Projects </Button>
					</span>{" "}
					/{" "}
					<span style={{ textDecoration: "underline" }}>
						<Button to={`/projectBoard/${projectId}`}>{projectName} </Button>
					</span>{" "}
					/ {boardTitle}
				</div>
				<div className="projectTitle">
					{projectName} / {productionDate}
				</div>
				<div className="boardTitle">{boardTitle}</div>
			</React.Fragment>
		);
	}

	//this will be the pageNav for components in projectBoard that have neested components

	//first store boardTitle under a different name,
	//because I need the title with a space, if it has one before i remove it below
	let tempBoardTitle = boardTitle;

	// then change boardTitle String so it can be used in button to route
	boardTitle = boardTitle.replace(/\s+/g, ""); //remove any space
	boardTitle = boardTitle.charAt(0).toLowerCase() + boardTitle.slice(1); //convert first char toLowerCase

	return (
		<React.Fragment>
			{/* path="/ProjectBoard/:projectId/requests/selectRequest" */}

			<div className="pageNav">
				<span style={{ textDecoration: "underline" }}>
					<Button to="/dashBoard">Home </Button>
				</span>{" "}
				/{" "}
				<span style={{ textDecoration: "underline" }}>
					<Button to="/projectHome">Projects </Button>
				</span>{" "}
				/{" "}
				<span style={{ textDecoration: "underline" }}>
					<Button to={`/projectBoard/${projectId}`}>{projectName} </Button>
				</span>{" "}
				/{" "}
				<span style={{ textDecoration: "underline" }}>
					<Button to={`/projectBoard/${projectId}/${user_id}/${boardTitle}`}>
						{boardTitle}{" "}
					</Button>
				</span>{" "}
				/ {addtionalRoute}
			</div>
			<div className="projectTitle">
				{projectName} / {productionDate}
			</div>
			<div className="boardTitle">{tempBoardTitle}</div>
		</React.Fragment>
	);
};
