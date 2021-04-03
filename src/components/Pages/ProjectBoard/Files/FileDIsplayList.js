import React from "react";

import FileDisplayEntry from "./FileDisplayEntry";

const FIleDisplayList = ({ displayFiles }) => {
	if (!displayFiles) {
		return <React.Fragment></React.Fragment>;
	}

	console.log(displayFiles);

	if (displayFiles.length) {
		return (
			<ul>
				{displayFiles.map((eachFile, index) => {
					return <FileDisplayEntry key={index} value={eachFile} />;
				})}
			</ul>
		);
	}
};

export default FIleDisplayList;
