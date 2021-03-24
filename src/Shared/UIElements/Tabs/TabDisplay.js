import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useDispatch, useSelector } from "react-redux";

import Button from "../Button/Button";
import ErrorModal from "../ErrorModal/ErrorModal";
import { setErrors, clearErrors } from "../../../Store/Action/errorAction";
import trashCan from "../../../Images/trashCan.png";

// import "react-tabs/style/react-tabs.css";
import "./Tabs.css";

const TabDisplay = () => {
	const [defaultNote, setDefaultNote] = useState("");
	const [tabContent, setTabContent] = useState([
		"devil wears prada",
		"angle and kurts",
	]);
	const error = useSelector((state) => state.error.error);

	//TODO send note to server for saving or local storage ?????
	const handleDefaultNoteChange = (event) => {
		let note = event.target.value;
		setDefaultNote(note);
	};

	//TODO send note to server for saving or local storage ?????
	//! send to projects/dashboard
	const handleNoteArrayChange = (event, index) => {
		let note = event.target.value;

		// 1. Make a shallow copy of the array
		let temp_state = [...tabContent];

		// 2. Make a shallow copy of the element you want to mutate
		let temp_element = { ...tabContent[index] };

		// 3. Update the property you're interested in
		temp_element = note;

		// 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
		temp_state[index] = temp_element;

		// 5. Set the state to our new copy
		setTabContent(temp_state);
	};

	const dispatch = useDispatch();

	//add a new Note tab to state array
	function addTab() {
		if (tabContent.length < 4) setTabContent((prevState) => [...prevState, ""]);
		else {
			dispatch(
				setErrors("max number of notes is 5, please delete a note", "", true)
			);
		}
	}

	function clearError() {
		dispatch(clearErrors());
	}

	//prep note tab title
	let tabTitle = tabContent.map((content, index) => {
		let str = <Tab key={index}>NOTE {index + 2}</Tab>;
		return str;
	});

	//prep note tab text area
	let TabNotePanel = tabContent.map((content, index) => {
		let str = (
			<TabPanel key={index}>
				<div className="textElement">
					<textarea
						className="textarea salmon border proxima"
						name="note"
						placeholder="Type your notes here"
						onChange={(event) => handleNoteArrayChange(event, index)}
						value={content}
					/>
					<Button className="deleteBtn" onClick={() => handleDelete(index)}>
						<img src={trashCan} alt="delete" />
					</Button>
				</div>
			</TabPanel>
		);
		return str;
	});

	function handleDelete(position) {
		let tempArray = tabContent.filter((content, index) => {
			return index !== position;
		});
		setTabContent(tempArray);
	}

	return (
		<React.Fragment>
			<ErrorModal
				show={error.show}
				message={error.message}
				statusCode={error.statusCode}
				onClear={clearError}
			/>

			<div style={{ width: "100%", float: "left" }}>
				<Tabs>
					<TabList>
						<Tab>NOTE 1</Tab>
						{tabTitle}
						<Button type="submit" className="noteBtn" onClick={addTab}>
							+
						</Button>
					</TabList>

					<TabPanel>
						<div className="textElement">
							<textarea
								className="textarea salmon border proxima"
								name="note"
								placeholder="Type your notes here"
								onChange={handleDefaultNoteChange}
								value={defaultNote}
							/>
						</div>
					</TabPanel>
					{TabNotePanel}
				</Tabs>
			</div>
		</React.Fragment>
	);
};

export default TabDisplay;
