import React, { useState } from "react";

import Button from "../../UIElements/Button/Button";
import Modal from "../../UIElements/Modal/Modal";
import "./Email.css";

const Email = (props) => {
	const [message, setMessage] = useState("");
	const [showModal, setShowModal] = useState(false);

	const textChange = (e) => {
		setMessage(e.target.value);
	};

	const templateData = { name: "", body: "" };

	const handleModalSubmit = (name) => {
		templateData.name = name;
		templateData.body = message;
		props.content(templateData);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	//FOR NEW TEMPLATE CREATION
	if (props.newTemp) {
		return (
			<div className="emailForm center proxima">
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<div className="input-group">
							<div className="input-group-prepend">
								<span className="input-group-text" id="basic-addon1">
									To:
								</span>
							</div>
							<input
								type="email"
								className="form-control"
								id="emailTo"
								readOnly
							/>
						</div>
						<div className="input-group">
							<div className="input-group-prepend">
								<span className="input-group-text" id="basic-addon1">
									CC / BCC:
								</span>
							</div>
							<input
								type="email"
								className="form-control"
								id="emailCCBCC"
								readOnly
							/>
						</div>
						<div className="input-group">
							<div className="input-group-prepend">
								<span className="input-group-text" id="basic-addon1">
									Subject:
								</span>
							</div>
							<input
								type="text"
								className="form-control"
								id="emailSubject"
								value={props.subject}
								readOnly
							/>
						</div>

						<textarea
							className="form-control"
							id="emailMessage"
							rows="10"
							placeholder="Type Message here"
							onChange={textChange}
						></textarea>
						<Button
							type="submit"
							className="saveBtn"
							onClick={() => setShowModal(true)}
						>
							Save
						</Button>
						<Modal
							className="center"
							onClear={() => setShowModal(false)}
							header="SAVE TEMPLATE AS"
							message="Enter name below"
							show={showModal}
							input
							buttonText="save"
							onSubmit={handleModalSubmit}
						/>
					</div>
				</form>
			</div>
		);
	}
};

export default Email;
