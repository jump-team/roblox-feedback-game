import { HttpService } from "rbx-services";
import { baseUrl, secretToken } from "./config";

function makeHttpServiceCall(options: RequestAsyncRequest): RequestAsyncResponse {
	let pcallResponse = pcall(function() {
		let response = HttpService.RequestAsync(options);
		return response;
	});
	if (pcallResponse[0]) {
		const [,httpResponse] = pcallResponse;
		if (httpResponse.StatusCode !== 200) {
			throw "Status code is not 200.";
		}else{
			return httpResponse;
		}
	}else{
		throw `Request failed: ${pcallResponse[1]}`;
	}
}

export namespace HttpHandler {
	export function getAllFeedback() {
		let pcallResponse = pcall(function() {
			let response = makeHttpServiceCall({ Url: baseUrl + "/feedback" })
			return response;
		});
		if (pcallResponse[0]) {
			const [,feedback] = pcallResponse;
			return [true, HttpService.JSONDecode(feedback.Body)];
		}else{
			return [false, pcallResponse[1]];
		}
	}
	export function getMyFeedback(playerId: number) {
		let pcallResponse = pcall(function() {
			let response = makeHttpServiceCall({ Url: baseUrl + `/feedback/${playerId}` })
			return response;
		});
		if (pcallResponse[0]) {
			const [,feedback] = pcallResponse;
			return [true, HttpService.JSONDecode(feedback.Body)];
		}else{
			return [false, pcallResponse[1]];
		}
	}
	export function postFeedback(subject: string, author: number, body: string) {
		let object = {
			subject: subject,
			author: author,
			body: body
		}
		let httpBody = HttpService.JSONEncode(object)
		let httpOptions: RequestAsyncRequest = {
			Url: baseUrl + "/feedback",
			Method: "POST",
			Headers: { Authorization: "Bearer" + secretToken },
			Body: httpBody
		}
		let pcallResponse = pcall(function() {
			let response = makeHttpServiceCall(httpOptions);
			return response;
		});
		if (pcallResponse[0]) {
			const [,response] = pcallResponse;
			return [true, response.Body]
		}else{
			return [false, pcallResponse[1]];
		}
	}
	export function postFeedbackComment(feedbackId: string, subject: string, author: number, body: string) {
		let object = {
			subject: subject,
			author: author,
			body: body
		}
		let httpBody = HttpService.JSONEncode(object)
		let httpOptions: RequestAsyncRequest = {
			Url: baseUrl + `/feedback/${feedbackId}/comment`,
			Method: "POST",
			Headers: { Authorization: "Bearer" + secretToken },
			Body: httpBody
		}
		let pcallResponse = pcall(function() {
			let response = makeHttpServiceCall(httpOptions);
			return response;
		});
		if (pcallResponse[0]) {
			const [,response] = pcallResponse;
			return [true, response.Body]
		}else{
			return [false, pcallResponse[1]];
		}
	}
}