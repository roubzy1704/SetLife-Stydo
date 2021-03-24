import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { changeDefaultTemplate } from "../../../../../Store/Action/userAction";

import emailTemplate from "../../../../../Images/emailTemplate.png";
import trashCan from "../../../../../Images/trashCan.png";
import "./TemplateEntry.css";

const TemplateEntry = (props) => {
	const [radioBtnDefault, setRadioBtnDefault] = useState(0);

	const defaultTemplate = useSelector((state) => state.user.defaultTemplate);

	//TODO i have to get project_id for now but tell Tommy to remove this requirement for patching default template
	//TODO add default Checked
	//TODO make template list responsive

	const project_id = useParams().projectId;

	const user_id = useParams().user_id; //retireve user_id from route url

	// console.log(props.id);
	console.log(props.id, defaultTemplate);

	const dispatch = useDispatch();

	// console.log(props.id);
	// console.log(radioBtnDefault);

	const onChangeValue = (e) => {
		const defaultTemplateChange = e.target.value;
		// console.log(defaultTemplateChange);
		dispatch(changeDefaultTemplate(user_id, project_id, defaultTemplateChange));
		// console.log(radioBtnDefault);
		// console.log(
		// 	document.querySelectorAll(`input[value="${props.id}"]`)[0].value
		// );
	};

	useEffect(() => {
		// defaultTemplate = useSelector((state) => state.user.defaultTemplate);
		// if (defaultTemplate === undefined) console.log("why");
		// else {
		// 	console.log("g2g");
		// }
		setRadioBtnDefault(parseInt(defaultTemplate));
	}, [defaultTemplate]);

	// const checkIt = (value) => {
	// 	// console.log(document.querySelector("input").getAttribute("value"));
	// 	// let checkedBtn = document.querySelectorAll(`input[value="${props.id}"]`);
	// 	// // console.log(checkedBtn);
	// 	// if (checkedBtn === radioBtnSelect) {
	// 	// 	document.getElementsByClassName("input").checked = true;
	// 	// }
	// 	console.log(value);
	// 	return true;
	// };

	//* also have to resolve the default button checked
	//TODO implement delete button
	//TODO edit templates
	return (
		<React.Fragment>
			<ul>
				<div className="container templateEntries">
					<div className="row">
						<div className="col-sm-8">
							<img src={emailTemplate} alt="TemplateImg" className="left" />

							<p className="templateTitle">
								<span className="title">{props.templateTitle}</span>
							</p>
						</div>
						<div className="col-sm-2">
							{props.id === defaultTemplate ? (
								<label className="radioBtnGrp">
									<input
										type="radio"
										value={props.id}
										name="default"
										className="radioBtn"
										defaultChecked={!!radioBtnDefault}
										// onChange={() => setRadioBtnDefault(!radioBtnDefault)}
									/>
									<span className="checkmark"></span>
								</label>
							) : (
								<label className="radioBtnGrp">
									<input
										type="radio"
										value={props.id}
										name="default"
										className="radioBtn"
										// defaultChecked={false}
										onChange={onChangeValue}
									/>
									<span className="checkmark"></span>
								</label>
							)}
						</div>
						<div className="col-sm-1">
							<label onClick={() => props.deleteTemplate(props.id)}>
								<img src={trashCan} alt="TemplateImg" className="trashCan" />
							</label>
						</div>
					</div>
				</div>
			</ul>
		</React.Fragment>
	);
};

export default TemplateEntry;
