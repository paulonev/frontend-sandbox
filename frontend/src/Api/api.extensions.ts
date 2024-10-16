import { AxiosError } from "axios";

export type AxiosErrorResponse = {
  readonly detail?: string;
  readonly instance?: string;
  readonly status?: number;
  readonly title?: string;
  readonly errorId?: string;
};

export class ApiExtensions {
    public static processAxiosError(error: AxiosError<AxiosErrorResponse>, methodName?: string): AxiosErrorResponse | undefined {
        if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx

			console.error(`Axios Error [${methodName}]. Response: { data: ${JSON.stringify(error.response.data)}, headers: ${JSON.stringify(error.response.headers)}`);

			return error.response.data;
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.error(`Axios Error [${methodName}]. Request: ${JSON.stringify(error.request)}`);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.error(`Axios Error [${methodName}]. Message: ${error.message}`);
		}

		console.error(`Axios Error [${methodName}]. Config: ${JSON.stringify(error.config)}`);
		
		return;
    }
}