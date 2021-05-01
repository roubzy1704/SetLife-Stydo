import React, { useState, useRef, useEffect } from "react";
import { CheckCircle } from "react-feather";
import imageCompression from "browser-image-compression";

import dragDrop from "../../../Images/dragdrop.png";
import trashCan from "../../../Images/trashCan.png";
import "./FileUpload.css";

//for more info on the basis for this fileupload component
//https://blog.logrocket.com/create-a-drag-and-drop-component-with-react-dropzone/

const FileUpload = (props) => {
	const filePickerRef = useRef();
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	//To remove duplicates from the selectedFiles array
	const [files, setFiles] = useState([]);
	const [unsupportedFiles, setUnsupportedFiles] = useState([]);

	// const clearAll = () => {
	// 	setFiles([]);
	// 	setUnsupportedFiles([]);
	// 	setSelectedFiles([]);
	// };

	useEffect(() => {
		let filteredArray = selectedFiles.reduce((file, current) => {
			const x = file.find((item) => item.name === current.name);
			if (!x) {
				return file.concat([current]);
			} else {
				return file;
			}
		}, []);
		setFiles([...filteredArray]);
	}, [selectedFiles]);

	//send files and unsupportedFiles array to NewProjectForm
	const { allFiles } = props;

	const filesSelected = (event) => {
		// let pickedFile;
		if (filePickerRef.current.files.length) {
			handleFiles(filePickerRef.current.files);
		}
	};

	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	// When a file is dragged into a browser from the OS, the browser will attempt to open and display it by default.
	//If you want to allow a drop, you must prevent the default handling of the event handlers.
	const dragOver = (e) => {
		e.preventDefault();
	};

	const dragEnter = (e) => {
		e.preventDefault();
	};

	const dragLeave = (e) => {
		e.preventDefault();
	};

	const fileDrop = (e) => {
		e.preventDefault();
		//e.dataTransfer is a Data Transfer object that holds the data that is being dragged during a drag-and-drop operation.
		const files = e.dataTransfer.files;
		if (files.length) {
			handleFiles(files);
		}
	};

	const validateFile = (file) => {
		if (props.acceptAll) {
			return true;
		}
		const validTypes = [
			"image/jpeg",
			"image/jpg",
			"image/png",
			"image/gif",
			"image/x-icon",
		];
		if (validTypes.indexOf(file.type) === -1) {
			return false;
		}

		return true;
	};

	const handleFiles = (files) => {
		for (let i = 0; i < files.length; i++) {
			if (validateFile(files[i])) {
				//!before I save the file to SelectFiles array state, I want to compress the image
				handleImageCompression(files[i]);
			} else {
				// add a new property called invalid
				// add to the same array so we can display the name of the file
				// set error message
				files[i]["invalid"] = true;
				setSelectedFiles((prevArray) => [...prevArray, files[i]]);
				setErrorMessage("File type not permitted");
				setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
			}
		}
	};

	//function used to compress images
	function handleImageCompression(imageFile) {
		// var imageFile = event.target.files[0];
		// console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
		// console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

		var options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1920,
			useWebWorker: true,
		};
		imageCompression(imageFile, options)
			.then(function (compressedFile) {
				// console.log(
				// 	"compressedFile instanceof Blob",
				// 	compressedFile instanceof Blob
				// ); // true
				// console.log(
				// 	`compressedFile size ${compressedFile.size / 1024 / 1024} MB`
				// ); // smaller than maxSizeMB

				//add file to selectedFiles for display on screen
				setSelectedFiles((prevArray) => [...prevArray, compressedFile]);
			})
			.catch(function (error) {
				console.log(error);
				setSelectedFiles((prevArray) => [...prevArray, imageFile]);
				// set error message
				setErrorMessage("An error occured while compressing");
				//Each invalid file dropped by the user will be added to the array.
				setUnsupportedFiles((prevArray) => [...prevArray, imageFile]);
			});
	}

	const fileSize = (size) => {
		if (size === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
		const i = Math.floor(Math.log(size) / Math.log(k));
		return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	const fileType = (fileName) => {
		return (
			fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
			fileName
		);
	};

	const removeFile = (name) => {
		// find the index of the item
		// remove the item from array

		const validFileIndex = files.findIndex((e) => e.name === name);
		files.splice(validFileIndex, 1);
		// update files array
		setFiles([...files]);
		const selectedFileIndex = selectedFiles.findIndex((e) => e.name === name);
		selectedFiles.splice(selectedFileIndex, 1);
		// update selectedFiles array
		setSelectedFiles([...selectedFiles]);

		//Each invalid file dropped by the user will be removed from unsupportedFiles array.
		const unsupportedFileIndex = unsupportedFiles.findIndex(
			(e) => e.name === name
		);
		if (unsupportedFileIndex !== -1) {
			unsupportedFiles.splice(unsupportedFileIndex, 1);
			// update unsupportedFiles array
			setUnsupportedFiles([...unsupportedFiles]);
		}
	};

	const triggerFunc = () => {
		allFiles(files);
	};

	return (
		<React.Fragment>
			{unsupportedFiles.length === 0 && files.length ? triggerFunc() : null}
			<input
				type="file"
				id={props.id}
				ref={filePickerRef}
				style={{ display: "none" }}
				// className="hideInputFile"
				// data-multiple-caption="{count} files selected"
				accept=".jpg,.png,.jpeg"
				multiple
				onChange={filesSelected}
			/>
			<label
				htmlFor="projectFiles"
				className="dragdrop blue-button center"
				onClick={pickImageHandler}
				// When a file is dragged into a browser from the OS, the browser will attempt to open and display it by default.
				//If you want to allow a drop, you must prevent the default handling of the event handlers.
				onDragOver={dragOver}
				onDragEnter={dragEnter}
				onDragLeave={dragLeave}
				onDrop={fileDrop}>
				<React.Fragment>
					<img className="dragDropImg" src={dragDrop} alt="dragDropImg"></img>
					<p>DRAG AND DROP OR CLICK TO SELECT FILE(S)</p>
				</React.Fragment>
			</label>
			<div className="file-display-container center">
				{files.map((data, i) => (
					<div className="file-status-bar" key={i}>
						<div>
							<div className="file-type">{fileType(data.name)}</div>
							<span className={`file-name ${data.invalid ? "file-error" : ""}`}>
								{data.name.length > 15
									? data.name.slice(0, 15) + "..."
									: data.name}
							</span>
							<span className="file-size">({fileSize(data.size)})</span>{" "}
							{data.invalid && (
								<span className="file-error-message">({errorMessage})</span>
							)}
						</div>
						<div className="file-remove" onClick={() => removeFile(data.name)}>
							<img src={trashCan} alt="trashCan" />
						</div>
					</div>
				))}
			</div>
			<div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
				{files.length > 0 &&
					(files.length === 1
						? "1 File Selected"
						: files.length + " Files Selected")}
			</div>
			<div className="unsupported">
				{unsupportedFiles.length > 0 ? (
					<div>
						<p>Please remove unsupported file(s)</p>
					</div>
				) : files.length > 0 ? (
					<div className="center featherCircle">
						<CheckCircle color="green" size={36} />
					</div>
				) : null}
			</div>
		</React.Fragment>
	);
};

export default FileUpload;
