import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";

//*a custom hook must have a lowercase use... in its hook name
export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	//this helps cancel a http request if a user switches the page while a request is pending
	//and if this component tries to make a state change (say the request finished) and we
	//are on another page component, we would have gotten an error
	const activeHttpRequests = useRef([]);

	const sendRequest = useCallback(
		async (url, method = "GET", body = null, headers = {}) => {
			setIsLoading(true);
			//we create and assign an abortcontroller to the httpRequest
			//abortController is used to abort http request
			const httpAbortCtrl = new AbortController();
			activeHttpRequests.current.push(httpAbortCtrl);

			try {
				const response = await axios({
					url,
					method,
					data: body,
					headers,
					//attch the abort controller to the request
					signal: httpAbortCtrl.signal,
				});
				//clears the abort controller that belongs to the request which just completed
				activeHttpRequests.current = activeHttpRequests.current.filter(
					(reqCtrl) => reqCtrl !== httpAbortCtrl
				);

				// console.log(response.statusText);
				if (!response.statusText) {
					throw new Error(response.data.message);
				}

				setIsLoading(false);
				return response;
			} catch (err) {
				setError(err.response.data.message);
				console.log(err.response.data.message);
				setIsLoading(false);
				throw new Error(err.response.data.message);
			}
		},
		[]
	);

	const clearError = () => {
		setError(null);
	};

	//this use Effect cleans up http request
	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
		};
	}, []);

	return { isLoading, error, sendRequest, clearError };
};
