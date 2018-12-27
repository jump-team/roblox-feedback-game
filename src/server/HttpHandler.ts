import { HttpService } from "rbx-services"
import { baseUrl, secretToken } from "./config"

function makeHttpServiceCall(options: RequestAsyncRequest): RequestAsyncResponse {
	const pcallResponse = pcall(function() {
		const response = HttpService.RequestAsync(options)
		return response
	})
	if (pcallResponse[0]) {
		const [, httpResponse] = pcallResponse
		if (httpResponse.StatusCode !== 200) {
			throw "Status code is not 200."
		} else {
			return httpResponse
		}
	} else {
		throw `Request failed: ${pcallResponse[1]}`
	}
}

export namespace HttpHandler {
	export interface IFeedback {
		subject: string,
		author: string,
		body: string,
		comments: [{ body: string, author: string, date: string }],
		date: string,
	}
	export function getAllFeedback(): [boolean, IFeedback[] | string] {
		const pcallResponse = pcall(function() {
			const response = makeHttpServiceCall({ Url: baseUrl + "/feedback" })
			return response
		})
		if (pcallResponse[0]) {
			const [, feedback] = pcallResponse
			return [true, HttpService.JSONDecode(feedback.Body) as IFeedback[]]
		} else {
			const [, response] = pcallResponse
			return [false, response]
		}
	}
	export function getMyFeedback(playerId: number): [boolean, IFeedback[] | string] {
		const pcallResponse = pcall(function() {
			const response = makeHttpServiceCall({ Url: baseUrl + `/feedback/${playerId}` })
			return response
		})
		if (pcallResponse[0]) {
			const [, feedback] = pcallResponse
			return [true, HttpService.JSONDecode(feedback.Body) as IFeedback[]]
		} else {
			return [false, pcallResponse[1]]
		}
	}
	export function postFeedback(subject: string, author: number, body: string): [boolean, string] {
		const object = {
			author,
			body,
			subject,
		}
		const httpBody = HttpService.JSONEncode(object)
		const httpOptions: RequestAsyncRequest = {
			Body: httpBody,
			Headers: { Authorization: "Bearer" + secretToken },
			Method: "POST",
			Url: baseUrl + "/feedback",
		}
		const pcallResponse = pcall(function() {
			const response = makeHttpServiceCall(httpOptions)
			return response
		})
		if (pcallResponse[0]) {
			const [, response] = pcallResponse
			return [true, response.Body]
		} else {
			return [false, pcallResponse[1]]
		}
	}
	export function postFeedbackComment(feedbackId: string, subject: string, author: number, body: string): [boolean, string] {
		const object = {
			author,
			body,
			subject,
		}
		const httpBody = HttpService.JSONEncode(object)
		const httpOptions: RequestAsyncRequest = {
			Body: httpBody,
			Headers: { Authorization: "Bearer" + secretToken },
			Method: "POST",
			Url: baseUrl + `/feedback/${feedbackId}/comment`,
		}
		const pcallResponse = pcall(function() {
			const response = makeHttpServiceCall(httpOptions)
			return response
		})
		if (pcallResponse[0]) {
			const [, response] = pcallResponse
			return [true, response.Body]
		} else {
			return [false, pcallResponse[1]]
		}
	}
}
