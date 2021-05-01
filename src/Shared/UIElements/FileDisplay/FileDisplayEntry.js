import React from "react";

import callSheet from "../../../Images/callSheet.png";
import "./FileDisplay.css";

const FileDisplayEntry = (props) => {
	// console.log(props);

	const downloadFile = () => {
		debugBase64(props.value);
	};

	/**
	 * Display a base64 URL inside an iframe in another window.
	 */
	function debugBase64(base64URL) {
		var win = window.open();
		win.document.write(
			'<iframe src="' +
				base64URL +
				'" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
		);
	}

	return (
		<React.Fragment>
			<label
				// href={props.value}
				// download
				className="hover"
				color="transparent"
				// target="_blank"
				onClick={downloadFile}>
				<img src={callSheet} alt="fileDisplay" />
				<div>
					{props.name}
					{"Happy long giving.pfdf"}
				</div>
			</label>
		</React.Fragment>
	);
};

export default FileDisplayEntry;
