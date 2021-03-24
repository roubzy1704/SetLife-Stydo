import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { Formik } from "formik";
import * as Yup from "yup";

import TextInput from "../../UIElements/input/TextInput";
import BackDrop from "../BackDrop/BackDrop";
import Button from "../Button/Button";
import "./Modal.css";

const ModalOverlay = (props) => {
	const content = (
		<div
			className={`modals proxima center ${props.className}`}
			style={props.style}>
			<header className={`modal__header ${props.headerClass}`}>
				{/* form title */}
				<h3>{props.header}</h3>
			</header>
			<Formik
				initialValues={{
					modalInput: "",
				}}
				validationSchema={
					//contains errors that will be displayed for entry
					Yup.object({
						modalInput: Yup.string().required("Enter a Template name"),
					})
				}
				onSubmit={async (values) => {
					props.onSubmit(values.modalInput);
				}}>
				{(formik) => (
					<form onSubmit={formik.handleSubmit}>
						<div className={`modal__content ${props.contentClass}`}>
							{props.message.length ? props.message : "Something went wrong"}
							{props.statusCode && <p>Error Code : {props.statusCode}</p>}
							{props.input && (
								<TextInput
									type="text"
									className="form-control modalInput center"
									name="modalInput"
								/>
							)}
						</div>
						<footer className={`modal__footer ${props.footerClass}`}>
							<Button
								type="button"
								onClick={props.onClear}
								//dont disable button if errorOnly, else disable based on input
								disabled={
									props.errorOnly ? null : !(formik.isValid && formik.dirty)
								}>
								{props.buttonText}
							</Button>
						</footer>
					</form>
				)}
			</Formik>
		</div>
	);
	return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
	return (
		// using the backdrop component to exit the modal
		<React.Fragment>
			{props.show && <BackDrop onClick={props.onClear} />}
			<CSSTransition
				in={props.show}
				mountOnEnter
				unmountOnExit
				timeout={200}
				classNames="modal">
				{/* forward all the props we get from outside to modalOverlay, which is the internal component we dont export, using the spread operator
			spreading the header, children, footer props*/}
				<ModalOverlay {...props} />
			</CSSTransition>
		</React.Fragment>
	);
};

export default Modal;
