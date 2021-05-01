import React from "react";

import FileDisplayEntry from "./FileDisplayEntry";
import "./FileDisplay.css";

const FIleDisplayList = ({ filesBase64, fileNames }) => {
	if (!filesBase64.length) {
		return <div className="proxima">No File to Display, Upload one above</div>;
	}

	if (filesBase64.length) {
		return (
			<div className="horizontalList">
				{filesBase64.map((eachFile, index) => {
					return (
						<FileDisplayEntry
							key={index}
							value={eachFile}
							// name={fileNames[index]}
						/>
					);
				})}
			</div>
		);
	}
};

export default FIleDisplayList;
