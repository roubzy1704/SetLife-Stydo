import React from "react";

import Modal from "../Modal/Modal";

const ErrorModal = (props) => {
	return (
		<Modal
			className="center"
			onClear={props.onClear}
			header="An Error Occurred!"
			show={!!props.show}
			message={props.message}
			statusCode={props.statusCode}
			buttonText="Okay"
			errorOnly>
			<p>{props.error}</p>
		</Modal>
	);
};

export default ErrorModal;
