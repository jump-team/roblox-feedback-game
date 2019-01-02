import Net from "rbx-net"
import { approvedUser, baseUrl } from "./config"
import { HttpHandler } from "./HttpHandler"

const getAllFeedbackRemote = new Net.ServerFunction("GetAllFeedback")
const getMyFeedbackRemote = new Net.ServerFunction("GetMyFeedback")
const postFeedbackRemote = new Net.ServerFunction("PostFeedback")
const postFeedbackCommentRemote = new Net.ServerFunction("PostFeedbackComment")

getAllFeedbackRemote.ClientCache = 10
getAllFeedbackRemote.Callback = () => {
	return HttpHandler.getAllFeedback()
}

getMyFeedbackRemote.ClientCache = 15
getMyFeedbackRemote.Callback = (player: Player) => {
	const id = player.UserId
	return HttpHandler.getMyFeedback(id)
}

postFeedbackRemote.Callback = (player: Player, subject: unknown, body: unknown) => {
	if (typeof subject !== "string") {
		throw "Subject is not a string."
	}
	if (typeof body !== "string") {
		throw "Body is not a string."
	}
	return HttpHandler.postFeedback(subject, player.UserId, body)
}

postFeedbackCommentRemote.Callback = (player: Player, feedbackId: unknown, body: unknown) => {
	if (typeof feedbackId !== "string") {
		throw "Id is not a string."
	}
	if (typeof body !== "string") {
		throw "Body is not a string."
	}
	return HttpHandler.postFeedbackComment(feedbackId, player.UserId, body)
}
