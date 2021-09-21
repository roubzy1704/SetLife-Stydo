import React from "react";
import { Formik, Form } from "formik";

import Button from "../../../../Shared/UIElements/Button/Button";
import "../Form/ProjectForm.css";
import "../../../../Shared/UIElements/Shared.css";

const ProjectFormDesign = (props) => {
	//controls used for form navigation
	const {
		snapshot,
		handleSubmit,
		currentProjectPage,
		stepNumber,
		previous,
		isLastStep,
		next,
	} = props;
	return (
		<React.Fragment>
			<Formik
				initialValues={snapshot}
				onSubmit={handleSubmit}
				validationSchema={currentProjectPage.props.validationSchema}>
				{(formik) => (
					<div className="container center">
						<div className="row">
							<div className="col-sm-1">
								{/* only display back button for fileUpload page in new project form */}
								{stepNumber !== 0 && (
									<label onClick={() => previous(formik.values)}>
										{" "}
										<span
											className="iconify backarrow prevBtn"
											data-icon="carbon:arrow-left"
											data-inline="false"></span>
									</label>
								)}
							</div>

							<div className="col-sm-10">
								<Form>
									<h1 className="newProjectPageHeader projectHeaderOnMobile">
										{" "}
										{stepNumber === 0
											? "NEW PROJECT"
											: stepNumber === 1
											? "MOOD BOARD"
											: "FINISH"}
									</h1>
									<h5 className="newProjectPageHeader">
										{stepNumber === 0
											? "Enter your project details"
											: stepNumber === 1
											? "Upload images to start your mood board"
											: null}
									</h5>

									{/* <!-- Circles which indicates the steps of the form: --> */}
									<div id="circles">
										<span
											className={`currentProjectPage ${
												stepNumber === 0 && "highlight"
											}`}></span>
										<span
											className={`currentProjectPage ${
												stepNumber === 1 && "highlight"
											}`}></span>
										<span
											className={`currentProjectPage ${
												stepNumber === 2 && "highlight"
											}`}></span>
									</div>
									<div className="new-project-form">
										{/* //! this is the current Form page here */}
										<div className="container tab center">
											{currentProjectPage}
										</div>
									</div>
									<div>
										<div>
											{/* if form is on image upload step include skip button */}
											{stepNumber !== 1 && (
												<Button
													//TODO RE-ENABLE DISABLED @roubzy1704
													// disabled={!(formik.isValid && formik.dirty)}
													type="submit">
													{isLastStep ? "Start" : "Continue"}
												</Button>
											)}
										</div>
									</div>
								</Form>
							</div>

							<div className="col-sm-1"></div>
						</div>
					</div>
				)}
			</Formik>
		</React.Fragment>
	);
};

export default ProjectFormDesign;
