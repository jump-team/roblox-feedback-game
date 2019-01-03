import { HttpService } from "rbx-services"
import { IFeedback } from "shared/IFeedback"
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
	export function getAllFeedback(): IFeedback[] {
		const response = makeHttpServiceCall({ Url: baseUrl + "/feedback" })
		return HttpService.JSONDecode(response.Body) as IFeedback[]
	}
	export function getMyFeedback(playerId: number): IFeedback[] {
		const response = makeHttpServiceCall({ Url: baseUrl + `/feedback/${playerId}` })
		return HttpService.JSONDecode(response.Body) as IFeedback[]
	}
	export function postFeedback(subject: string, author: number, body: string): string {
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
		const response = makeHttpServiceCall(httpOptions)
		return response.Body
	}
	export function postFeedbackComment(feedbackId: string, author: number, body: string): string {
		const object = {
			author,
			body,
		}
		const httpBody = HttpService.JSONEncode(object)
		const httpOptions: RequestAsyncRequest = {
			Body: httpBody,
			Headers: { Authorization: "Bearer" + secretToken },
			Method: "POST",
			Url: baseUrl + `/feedback/${feedbackId}/comment`,
		}
		const response = makeHttpServiceCall(httpOptions)
		return response.Body
	}
}
