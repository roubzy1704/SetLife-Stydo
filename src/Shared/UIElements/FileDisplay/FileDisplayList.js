import React from "react";

import FileDisplayEntry from "./FileDisplayEntry";
import "./FileDisplay.css";

const FIleDisplayList = ({ fileData, files, receipts, callsheet }) => {
	if (files) {
		if (fileData === null || !fileData.length) {
			return (
				<div className="proxima">No File to Display, Upload one above</div>
			);
		}

		if (fileData.length) {
			return (
				<div className="horizontalList">
					{fileData.map((eachFile) => {
						return (
							<FileDisplayEntry
								key={eachFile.id}
								file={eachFile.file}
								fileName={eachFile.file_name}
							/>
						);
					})}
				</div>
			);
		}
	}

	if (receipts) {
		if (fileData === null || !fileData.length) {
			return (
				<div className="proxima">
					No Budget Receipts to Display, Upload one above
				</div>
			);
		}

		if (fileData.length) {
			return (
				<div className="horizontalList">
					{fileData.map((eachFile) => {
						return (
							<FileDisplayEntry
								key={eachFile.id}
								file={eachFile.receipt}
								fileName={eachFile.receipt_name}
							/>
						);
					})}
				</div>
			);
		}
	}

	if (callsheet) {
		if (fileData === null || !fileData.length) {
			return (
				<div className="proxima">
					No Call Sheet to Display, Upload one above
				</div>
			);
		}

		if (fileData.length) {
			return (
				<div className="horizontalList">
					{fileData.map((eachFile) => {
						return (
							<FileDisplayEntry
								key={eachFile.id}
								file={eachFile.call_sheet}
								fileName={eachFile.call_sheet_name}
								callsheet
							/>
						);
					})}
				</div>
			);
		}
	}
};

export default FIleDisplayList;
