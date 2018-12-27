import Net from "rbx-net"
import { approvedUser, baseUrl } from "./config"
import { HttpHandler } from "./HttpHandler"

const getAllFeedbackRemote = new Net.ServerFunction("GetAllFeedback")
const getMyFeedbackRemote = new Net.ServerFunction("GetMyFeedback")
const postFeedbackRemote = new Net.ServerFunction("PostFeedback")
const postFeedbackCommentRemote = new Net.ServerFunction("PostFeedbackComment")

getAllFeedbackRemote.Callback = () => {
	return HttpHandler.getAllFeedback()
}

getMyFeedbackRemote.ClientCache = 15
getMyFeedbackRemote.Callback = (player: Player) => {
	const id = player.UserId

}
