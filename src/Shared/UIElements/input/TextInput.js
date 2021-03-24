import React from "react";
import { useField } from "formik";

import "./input.css";

const TextInput = ({ ...props }) => {
	// useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	// which we can spread on <input> and data in meta can be used
	//for error handling and touch focus error and will replace ErrorMessage entirely.
	const [field, meta] = useField(props);

	//displays an input or textarea depending on props.type and saves it on a variable named element
	let element =
		props.type === "text" ? (
			<input {...field} {...props} />
		) : (
			<textarea {...field} {...props} />
		);

	return (
		<div
			//style input to show invalid based on the imported validate function and isTouch
			className={`form-design ${
				meta.touched && meta.error ? "form-design--invalid" : null
			}`}
		>
			{element}
			{/* used to display an error text below the input if it is invalid, and would be triggered
			based on porperties set */}
			{/* {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>} */}
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</div>
	);
};

export default TextInput;
