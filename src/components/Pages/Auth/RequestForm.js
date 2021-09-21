import React, { useState } from "react";
import { Formik, Form, useFormik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import TextInput from "../../../Shared/UIElements/input/TextInput";
import Button from "../../../Shared/UIElements/Button/Button";

import SSYSTM from "../../../Images/SSYSTM-image.png";
import "./Auth.css";
import "../../../Shared/UIElements/Shared.css";

const RequestForm = () => {
	const [submission, setSubmission] = useState(false);
	return (
		<Formik
			initialValues={{
				emailAddress: "",
				name: "",
				city: "",
				occupation: "",
			}}
			onSubmit={(values) => {
				console.log(values);
				setSubmission(true);
			}}
			validationSchema={Yup.object().shape({
				emailAddress: Yup.string()
					.email("Enter a valid email address")
					.required("Enter a email address"),
				name: Yup.string().required("Enter a name"),
				city: Yup.string().required("Enter a city"),
			})}>
			{(formik) => (
				<div className="container center">
					<div className="row">
						<div className="col-sm-1"></div>

						<div className="col-sm-10">
							{!submission ? (
								<React.Fragment>
									<br />
									<br />
									<h3 className="proxima">REQUEST TO BE A MEMBER!</h3>

									<Form>
										<br />
										<TextInput
											name="emailAddress"
											placeholder="Email Address"
											type="text"
										/>
										<br />
										<TextInput name="name" placeholder="Name" type="text" />
										<br />
										<TextInput name="city" placeholder="City" type="text" />
										<br />
										<div className="form-group col-14">
											{/* <label for="inputState">State</label> */}
											<select
												id="inputState"
												className="form-control occupation">
												<option>Occupation</option>
												<option name="occupation" value="designer">
													Designer
												</option>
												<option name="occupation" value="option2">
													Option 2
												</option>
												<option name="occupation" value="option3">
													Option 3
												</option>
											</select>
										</div>

										<br />
										<Button
											type="submit"
											onClick={formik.handleSubmit}
											//disabled={!(formik.isValid && formik.dirty)} //TODO REENABLE BUTTON
										>
											Submit
										</Button>
										<br />
									</Form>
								</React.Fragment>
							) : (
								<React.Fragment>
									<div className="submission proxima">
										<h2>THANK YOU</h2>
										<h6>You will receive a confirmation within 48hrs</h6>
										<br />
									</div>
								</React.Fragment>
							)}
						</div>

						<div className="col-sm-1"></div>
					</div>
				</div>
			)}
		</Formik>
	);
};

export default RequestForm;
