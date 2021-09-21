import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { clearErrors } from "../../../Store/Action/errorAction";
import ErrorModal from "../../../Shared/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../Shared/UIElements/LoadingSpinner/LoadingSpinner";
import Button from "../../../Shared/UIElements/Button/Button";
import Accordion from "../../../Shared/UIElements/Accordion/Accordion";
import "./BrandContact.css";

const BrandContacts = () => {
	// const projectId = useParams().projectId;
	// const allProjects = useSelector((state) => state.projects.project);
	// let allUserProjects = allProjects.filter(
	// 	(proj) => proj.projectId === parseInt(projectId)
	// );
	// let userProject = allUserProjects[0];
	const brandName = useParams().brandName;
	const error = useSelector((state) => state.error.error);
	const isLoading = useSelector((state) => state.projects.loading);

	const clearError = () => {
		dispatch(clearErrors());
	};

	const dispatch = useDispatch();
	let user_id = 1;

	// useEffect(() => {
	// 	dispatch(fetchAllProjects(user_id));
	// }, [dispatch, user_id]);

	let content = {
		first_name: "Nina",
		last_name: "Sisco",
		email: "nina.sisco@burberry.com",
		phone: "832-312-1337",
		brand_image_name: "Louis Vuitton",
		brand_image: "00010101011011",
		category: "Menswear",
		city: "New York",
	};

	const accordionData = [
		{
			title: "NEW YORK",
			content: content,
		},
		{
			title: "LONDON",
			content: content,
		},
		{
			title: "PARIS",
			content: content,
		},
		{
			title: "MILAN",
			content: content,
		},
		{
			title: "CHINA",
			content: content,
		},
	];

	// const { title, content } = accordionData;

	return (
		<React.Fragment>
			<ErrorModal
				show={error.show}
				message={error.message}
				statusCode={error.statusCode}
				onClear={clearError}
			/>
			{isLoading === undefined ? (
				<div className="center drop">
					<LoadingSpinner />
				</div>
			) : (
				!isLoading && (
					<div className="container-fluid center">
						<div className="pageNav">
							<span style={{ textDecoration: "underline" }}>
								<Button to="/dashBoard">Home </Button>
							</span>{" "}
							/{" "}
							<span style={{ textDecoration: "underline" }}>
								<Button to="/database/user_id">Database</Button>
							</span>{" "}
							/ {brandName}
						</div>
						<div className="moodTitle">
							{brandName}{" "}
							<span
								className="iconify pencil"
								data-icon="clarity:pencil-line"
								data-inline="false"></span>
						</div>
						<div className="row" style={{ marginTop: "30px" }}>
							<div className="col col-md-5">
								<span className="dashboardDatabaseTitle proxima">PRESS</span>
								<div style={{ marginTop: "20px" }}>
									<div className="accordion">
										{accordionData.map(({ title, content }) => (
											<Accordion title={title} content={content} />
										))}
									</div>
								</div>
							</div>
							<div className="col-md-2">
								<hr className="straightLine" />
								<hr className="straightLineTwo" />
							</div>
							<div className="col col-md-5">
								<span className="dashboardDatabaseTitle proxima">STORE</span>
								<div style={{ marginTop: "20px" }}>
									<div className="accordion">
										{accordionData.map(({ title, content }) => (
											<Accordion title={title} content={content} />
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			)}
		</React.Fragment>
	);
};

export default BrandContacts;
