import React, { useState } from "react";
import { Formik, Form, useFormik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import TextInput from "../../../Shared/UIElements/input/TextInput";
import Button from "../../../Shared/UIElements/Button/Button";

import SSYSTM from "../../../Images/SSYSTM-image.png";
import "./Auth.css";
import "../../../Shared/UIElements/Shared.css";

const LoginForm = () => {
	const handleRequest = (e) => {
		e.preventDefault();
		console.log("Request Account");
	};

	const handleForgetPassword = () => {
		console.log("Forgot Password");
	};

	return (
		<Formik
			initialValues={{
				emailAddress: "",
				password: "",
			}}
			onSubmit={(values) => {
				console.log(values);
			}}
			validationSchema={Yup.object().shape({
				emailAddress: Yup.string()
					.email("Enter a valid email address")
					.required("Enter a Email Address"),
				password: Yup.string().required("Enter a valid password"),
			})}>
			{(formik) => (
				<div className="container center">
					<div className="row">
						<div className="col-sm-1"></div>

						<div className="col-sm-10">
							<React.Fragment>
								<img
									src={SSYSTM}
									alt="STYDO"
									style={{ paddingBottom: "30px" }}
								/>

								<Form>
									<TextInput
										name="emailAddress"
										placeholder="Email Address"
										type="text"
									/>
									<br />
									<TextInput
										name="password"
										placeholder="Password"
										type="text"
									/>
									<div className="row rememberForgot">
										<div className="col-md-6 rememberMe">
											<div role="group" aria-labelledby="checkbox-group">
												<label className="rememberMeText">
													<Field
														type="checkbox"
														name="checked"
														value="Remember"
														className="rememberMeText"
													/>{" "}
													Remember Me
												</label>
											</div>
										</div>
										<div className="col-md-6 forgotPW">
											{" "}
											<label
												onClick={handleForgetPassword}
												className="forgotPWText">
												Forgot Password?
											</label>
										</div>
									</div>

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
						</div>

						<div className="col-sm-1"></div>
					</div>
				</div>
			)}
		</Formik>
	);
};

export default LoginForm;
