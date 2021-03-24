import React, { useState, useEffect } from "react";
import callSheet from "../../../../Images/callSheet.png";

const FIleDisplay = ({ displayFiles }) => {
	console.log(displayFiles);

	const [eachFile, setEachFile] = useState([]);

	useEffect(() => {
		console.log("effect", displayFiles[0]);
	}, []);
	return (
		<div className="salmon">
			FIleDisplay
			<img src={callSheet} alt="fileDisplay" />
		</div>
	);
};

export default FIleDisplay;
