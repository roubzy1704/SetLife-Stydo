import React, { useState, useRef, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import { ReactPhotoCollage } from "react-photo-collage";
import { useDispatch, useSelector } from "react-redux";
import { Stage, Layer, Rect, Image, Transformer } from "react-konva";
import Konva from "konva";
import Button from "../Button/Button";
import ErrorModal from "../ErrorModal/ErrorModal";
import { setErrors, clearErrors } from "../../../Store/Action/errorAction";
import trashCan from "../../../Images/trashCan.png";

// import "react-tabs/style/react-tabs.css";
import "./MoodBoardTabDisplay.css";

const MoodBoardTabDisplay = (props) => {
	const [defaultNote, setDefaultNote] = useState("");
	const [tabContent, setTabContent] = useState([
		"devil wears prada",
		"angle and kurts",
	]);

	//To add an image, we create a window.Image instance, set the URL of our image to the src attribute,
	//and then pass the image object as the value of the image prop to the Image component
	const [image, setImage] = useState(new window.Image());
	const imageRef = useRef();

	//us the useEffect Hook to load the image when our app first loads by passing an empty array to the second argument of useEffect.
	useEffect(() => {
		const img = new window.Image();
		img.crossOrigin = "Anonymous";
		img.src =
			"https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80";

		props.moodboardData.forEach((boardData, index) => {
			boardData.image_data.forEach((image) => {
				console.log(image.mood_image);
				// data.push(image.mood_image);
				img.src = image.mood_image;
			});
		});
		setImage(img);
	}, []);

	// useEffect(() => {
	// 	if (image) {
	// 		imageRef.current.cache();
	// 		imageRef.current.getLayer().batchDraw();
	// 	}
	// }, [image]);

	console.log(props.moodboardData);

	let data = [];

	//settings for react photo collage

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
					{/* <textarea
						className="textarea salmon border proxima"
						name="note"
						placeholder="Type your notes here"
						onChange={(event) => handleNoteArrayChange(event, index)}
						value={content}
					/> */}

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

						{/* Am hidding the add button using a hidden className but not deleting because of a line ma using in the style sheet */}
						<Button type="submit" className="noteBtn hidden" onClick={addTab}>
							+
						</Button>
					</TabList>

					<TabPanel>
						<div className="textElement">
							<Stage
								style={{
									border: "1px solid black",
									// height: "80vh",
									// width: "100%",
								}}
								width={window.innerWidth}
								height={window.innerHeight}>
								<Layer>
									{/* <Text text="Try click on rect" /> */}
									{/* <ColoredRect /> */}
									<Image x={100} y={200} image={image} />
									{/* <Image
										blurRadius={10}
										filters={[Konva.Filters.Blur]}
										x={100}
										y={200}
										image={image}
										ref={imageRef}
									/> */}
								</Layer>
							</Stage>
							{/* <div>
								<canvas
									id="canvas"
									style={{
										border: "1px solid black",
										width: "100%",
										height: "100%",
									}}>
									<Stage>
										<Layer>
											<Text text="Try click on rect" />
										
										</Layer>
									</Stage>
								</canvas>
							</div> */}
						</div>
					</TabPanel>
					{TabNotePanel}
				</Tabs>
			</div>
		</React.Fragment>
	);
};

export default MoodBoardTabDisplay;
