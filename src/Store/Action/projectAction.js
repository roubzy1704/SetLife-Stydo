import axios from "axios";
import imageCompression from "browser-image-compression";

import { setErrors } from "./errorAction";

export const CREATE_NEW_PROJECT = "CREATE_NEW_PROJECT";
export const DELETE_A_PROJECT = "DELETE_A_PROJECT";
export const FETCH_ALL_PROJECTS = "FETCH_ALL_PROJECTS";
export const UPDATE_A_PROJECT = "UPDATE_A_PROJECT";
export const LOADING_PROJECTS = "LOADING_PROJECTS";
export const END_LOADING = "END_LOADING";

//!for testing purpose, clear later
var options = {
	weekday: "long",
	month: "long",
	day: "numeric",
};

//function used to convert images to binary format
//for more info
//https://riptutorial.com/javascript/example/14207/getting-binary-representation-of-an-image-file
//https://stackoverflow.com/questions/38334315/how-to-create-a-textual-binary-representation-of-an-image-in-javascript

// function ArrayBufferToBinary(buffer) {
// 	var uint8 = new Uint8Array(buffer);
// 	return uint8.reduce((binary, uint8) => binary + uint8.toString(2), "");
// }

// function ArrayBufferToBinary(buffer) {
// 	// Convert an array buffer to a string bit-representation: 0 1 1 0 0 0...
// 	var dataView = new DataView(buffer);
// 	var response = "",
// 		offset = 8 / 8;
// 	for (var i = 0; i < dataView.byteLength; i += offset) {
// 		response += dataView.getInt8(i).toString(2);
// 	}
// 	return response;
// }

export const fetchAllProjects = (user_id) => (dispatch) => {
	dispatch(setLoadingProject());

	axios({
		url: "http://localhost:5000/projects",
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		params: { user_id: user_id },
	})
		.then((res) => {
			//?maybe add if a res is good check, then dispatch
			// console.log(res.data.data);
			const response = res.data.data;
			console.log(response);
			let userProjects = [];
			userProjects = response.map((project) => {
				return {
					projectName: project.name,
					client: project.client,
					productionDate: project.production_date,
					aboutProject: project.description,
					projectId: project.id,
					moodBoardImages: project.mood_images, //!have to resolve the moodboard binary thing and line below
					moodBoardImageName: project.mood_images_name,
					projectCreateDate: new Date().toLocaleDateString("en-US", options), //!this is not sent to me in response, will have to ask what the date in the project is about
					files: project.files,
					notes: project.notes,
					callSheet: project.call_sheet,
					contacts: project.contacts,
					budgetReceipts: project.receipts,
					defaultTemplate: project.default_template, //TODO
					emailTemplates: [], //TODO there is no response for this
					//pullInventory: [], //nor this
				};
			});

			dispatch({
				type: FETCH_ALL_PROJECTS,
				payload: userProjects,
			});
		})
		.catch((err) => {
			// console.log(err.response);
			//this check for statusText is to prevent an issue that occurs when there are no projects but the
			//page displays an error received from the server, since they is not need to show an error saying
			///user project doesnot exist, I just check to see if that server error happens and ignore it
			err.response.statusText !== "NOT FOUND" &&
				dispatch(
					setErrors(err.response.data.message, err.response.status, true)
				);
			dispatch(endLoading());
		});
};

export const createNewProject = (values, files, user_id) => (dispatch) => {
	dispatch(setLoadingProject());
	console.log(files);
	//before the image files are sent to the backend they have to be converted to base64
	//and a image name array has to be created.

	// console.log(files);
	//since files comes as an array of arrays (check allFiles function in NewProjectForm component),
	//I need to grab the last array in the array save that array in imageFIles and the image names in imageNames
	let imageFiles = [];
	//first check if a file exist
	if (files.length) {
		//then map thru array of last element in array and save the image in imageFiles variable
		imageFiles = files[files.length - 1].map((image) => {
			return image;
		});
	}

	let imageNames = [];
	if (files.length) {
		imageNames = imageFiles.map((image) => {
			return image.name;
		});
	}

	console.log(imageFiles);

	let imageBase64 = [];

	//now convert image to abse64
	//loop thru each image and call getBase64 function for conversion to base64
	imageFiles.forEach((image, index) => {
		getBase64(image);
	});

	//handles conversion to base 64
	//for more info
	//https://medium.com/@simmibadhan/converting-file-to-base64-on-javascript-client-side-b2dfdfed75f6
	function getBase64(file) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			//push results to imageBase64 array
			imageBase64.push(reader.result);
		};
		reader.onerror = function (error) {
			//?maybe throw an error
			console.log(error);
			dispatch(
				setErrors(
					"Something went wrong while converting file to base64",
					400,
					true
				)
			);
		};
	}

	//* A problem has arisen with images, depending on the size of an image / quality, the base 64 string can be insanely long
	//this issue ahs lead to the server crashing and client side not even able to see the full string in a console.log
	//TODO although this showed me an issue I have to address with my loading spinners (remove all setTimeouts and resolve setLoading issues)
	//my solution is to try a compression the image first using browser-image-compression then convert to base64 string before sending to server

	function handleImageUpload(event) {
		var imageFile = event.target.files[0];
		console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
		console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

		var options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1920,
			useWebWorker: true,
		};
		imageCompression(imageFile, options)
			.then(function (compressedFile) {
				console.log(
					"compressedFile instanceof Blob",
					compressedFile instanceof Blob
				); // true
				console.log(
					`compressedFile size ${compressedFile.size / 1024 / 1024} MB`
				); // smaller than maxSizeMB

				// return uploadToServer(compressedFile); // write your own logic
			})
			.catch(function (error) {
				console.log(error.message);
			});
	}

	// let compressed = [];
	// let compr = "";
	// compressed = imageBase64.map((baseImg) => {
	// 	console.log(baseImg);
	// 	console.log("Size of sample is: " + baseImg);
	// 	compressed.push(compress(baseImg));

	// 	console.log("Size of compressed sample is: " + compressed.length);
	// 	// return compressed;
	// 	// string = decompress(compressed);

	// 	return compressAndDecompress(baseImg);
	// });

	// function compressAndDecompress(string) {
	// 	const compressedData = compressToUTF16(string);
	// 	// const decompressed = await decompressFromUTF16(compressed);
	// 	// console.log(baseImg === decompressed); // true

	// 	console.log(compressedData);
	// 	return compressedData;
	// }

	// console.log(compressed);
	// console.log(compr);
	// console.log(imageBase64);

	setTimeout(() => {
		axios({
			url: "http://localhost:5000/projects",
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
			},
			data: {
				name: values.projectName,
				client: values.client,
				production_date: values.productionDate,
				description: values.aboutProject || "",
				mood_images: imageBase64,
				mood_images_name: imageNames,
				contacts: [], //!contacts will be removed later, as it is not collected when creating a project
				user_id: user_id,
			},
		})
			.then((res) => {
				console.log(res.data.data.created_data);
				dispatch({
					type: CREATE_NEW_PROJECT,
					payload: {
						projectName: res.data.data.created_data.name,
						client: res.data.data.created_data.client,
						productionDate: res.data.data.created_data.production_date,
						aboutProject: res.data.data.created_data.description,
						moodBoardImages: res.data.data.created_data.mood_images,
						//TODO add moodImageNames
						projectId: res.data.data.created_data.id,
					},
				});
			})
			.catch((err) => {
				console.log(err.response.status);
				dispatch(
					setErrors(err.response.data.message, err.response.status, true)
				);
				dispatch(endLoading());
			});
	}, 1000);
};

export const updateAProject = (projectId, user_id, files, patchRequestType) => (
	dispatch
) => {
	console.log(files, patchRequestType);
	dispatch(setLoadingProject());
	console.log(patchRequestType, files);

	dispatch({
		type: UPDATE_A_PROJECT,
		payload: {
			file_data: files,
			projectId,
			patchRequestType,
		},
	});

	axios({
		url: `http://localhost:5000/projects/${patchRequestType}`,
		method: "PATCH",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
		data: JSON.stringify({
			project_id: projectId,
			user_id: user_id,
			files_data: files,
		}),
	})
		.then((res) => {
			console.log(res.data.data);
			let fileData = res.data.data.files_data;
			dispatch({
				type: UPDATE_A_PROJECT,
				payload: {
					file_data: fileData, //!change this later
					projectId,
					patchRequestType,
				},
			});
		})
		.catch((err) => {
			console.log(err.response);
<<<<<<< HEAD
			// dispatch(setErrors(err.response.data.message, err.response.status, true));
=======
			
			dispatch(setErrors(err.response.data.message, err.response.status, true));
>>>>>>> a14a1e4440f994dfcef0b1c8735990d1492f756c
			dispatch(endLoading());
		});
};

export const deleteAProject = (projectId, user_id) => (dispatch) => {
	dispatch(setLoadingProject());
	axios({
		url: "http://localhost:5000/projects",
		method: "DELETE",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
		data: JSON.stringify({
			project_id: projectId,
			user_id: user_id,
		}),
	})
		.then((res) => {
			console.log(res); //TODO handle response
			dispatch({ type: DELETE_A_PROJECT, payload: projectId });
		})
		.catch((err) => {
			console.log(err.response.status);
			dispatch(setErrors(err.response.data.message, err.response.status, true));
			dispatch(endLoading());
		});
};

export const setLoadingProject = () => {
	return {
		type: LOADING_PROJECTS,
	};
};

export const endLoading = () => {
	return {
		type: END_LOADING,
	};
};
