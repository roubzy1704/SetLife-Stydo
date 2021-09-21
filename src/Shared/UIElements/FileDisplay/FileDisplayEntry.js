import React, { useRef } from "react";

import callSheet from "../../../Images/callSheet.png";
import trashCan from "../../../Images/trashCan.png";
import "./FileDisplay.css";

const FileDisplayEntry = (props) => {
	if (props.callsheet) {
		console.log("d");
		console.log(props.fileName);
	}
	const startDownload = useRef(null);

	const downloadFile = () => {
		startDownload.current.click();
	};

	//TODO CODE DELETE FILE BUTTON
	//TODO Might add a preview button and seperate download button
	return (
		<React.Fragment>
			<div
				style={{
					display: "inline-block",
					margin: "0 auto",
					textAlign: "center",
				}}>
				<label
					className="hover fileItem"
					color="transparent"
					onClick={downloadFile}>
					<img src={callSheet} alt="fileDisplay" />
					<div>{props.fileName}</div>
				</label>
				{/* <img
					src={trashCan}
					alt="delete"
					className="fileDelete"
					style={{
						width: "15px",
						paddingTop: "20px",
						opacity: "0.2",
						margin: "0 auto",
					}}
				/> */}
			</div>

			<a
				style={{ display: "none" }}
				download={props.fileName}
				href={props.file}
				ref={startDownload}>
				download it
			</a>
		</React.Fragment>
	);
};

export default FileDisplayEntry;
