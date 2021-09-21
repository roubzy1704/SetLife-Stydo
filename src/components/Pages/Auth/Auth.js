import React, { useState } from "react";
import { Formik, Form, useFormik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import LoginForm from "./LoginForm";
import RequestForm from "./RequestForm";
import TextInput from "../../../Shared/UIElements/input/TextInput";
import Button from "../../../Shared/UIElements/Button/Button";

import SSYSTM from "../../../Images/SSYSTM-image.png";
import "./Auth.css";
import "../../../Shared/UIElements/Shared.css";

//TODO remove later
import { Link } from "react-router-dom";

const Auth = () => {
	// const [logInMode, setLogInMode] = useState(true);

	const [authRequest, setAuthRequest] = useState(false);

	return (
		<React.Fragment>
			<div className="wrapper center">
				<div className="blue-box center">
					<div className="auth-form ">
						<div className="loginForm">
							{authRequest ? <RequestForm /> : <LoginForm />}
							<Button
								type="submit"
								onClick={() => {
									setAuthRequest(!authRequest);
								}}>
								{authRequest ? "Login" : "Request Account"}
							</Button>

							<br />
							<Link
								to={{
									pathname: "/registration",
								}}>
								Registration{" "}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Auth;
