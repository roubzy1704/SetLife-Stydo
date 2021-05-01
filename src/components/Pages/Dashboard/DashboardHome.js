import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllProjects } from "../../../Store/Action/projectAction";
import { clearErrors } from "../../../Store/Action/errorAction";
import ProjectList from "../../Pages/Project/ProjectList";
import DashBoardList from "./DashBoardList";
import Button from "../../../Shared/UIElements/Button/Button";
import LoadingSpinner from "../../../Shared/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../Shared/UIElements/ErrorModal/ErrorModal";
import "./DashboardHome.css";
import "../../../Shared/UIElements/Shared.css";

const DashboardHome = (props) => {
	const projectList = useSelector((state) => state.projects.project);
	const error = useSelector((state) => state.error.error);
	const isLoading = useSelector((state) => state.projects.loading);

	const dispatch = useDispatch();

	const clearError = () => {
		dispatch(clearErrors());
	};

	let user_id = 4;

	useEffect(() => {
		dispatch(fetchAllProjects(user_id));
	}, [dispatch, user_id]);

	//dashboard Home, split using grid layout
	//!for future, explore resolving the grid layout in upper row (dashProjectDatabase) to resemble figma sketch better
	return (
		<React.Fragment>
			<ErrorModal
				show={error.show}
				message={error.message}
				statusCode={error.statusCode}
				onClear={clearError}
			/>
			{isLoading ? (
				<div className="center drop">
					<LoadingSpinner />
				</div>
			) : (
				!isLoading &&
				projectList && (
					<div className="center">
						<h1 className="pageTitle">DASHBOARD</h1>
						<div className="col">
							<div className="row-sm-9 dashboardProjectDatabaseTab">
								{/* //!this row */}
								<div className="row  center">
									<div className="col-lg-5 projectTab">
										<h5 className="dashboardProjectTitle sahar">PROJECTS</h5>

										<div className="center">
											<ProjectList projectList={projectList} dashboard="true" />
										</div>
										<div className=" project-btn-grp">
											<Button to="/projectHome" className="blue-button">
												View All
											</Button>
											<Button to="/NewProjectForm" className="blue-button">
												New Project
											</Button>
										</div>
									</div>
									{/* //* Vertical line Divider, changes to horizontal on smaller screens */}
									<div className="col-lg-1 lines center">
										<hr className="straightLine" />
										<hr className="straightLineTwo" />
									</div>
									{/* //*column to hold database on dashboard */}
									<div className="col-lg-5 databaseTab">
										{" "}
										<div className="">
											<h5 className="dashboardDatabaseTitle proxima">
												<DashBoardList dashboard="true" />
											</h5>
											<div className=" project-btn-grp">
												<Button to="/database" className="blue-button">
													See More
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* //*Horizontal Divider */}
							<div className="row-sm-1">
								<hr className="horizontalLine" />
							</div>
							{/* //*column to hold Forum on dashboard */}
							<div className="row-sm-2 dashboardForumTab dashboardDatabaseTitle proxima">
								FORUM{" "}
								<Button to="/forum">
									<span
										className="iconify cross"
										data-icon="bx:bx-plus"
										data-inline="false"
										style={{ color: "grey" }}
										data-width="40"
										data-height="40"></span>
								</Button>
								<div className="forum"></div>
							</div>
						</div>
					</div>
				)
			)}
		</React.Fragment>
	);
};

export default DashboardHome;
