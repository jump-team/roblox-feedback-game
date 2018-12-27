import { HttpHandler } from "./HttpHandler";
import { baseUrl, approvedUser } from "./config";
import Net from 'rbx-net';

let getAllFeedbackRemote = new Net.ServerFunction("GetAllFeedback");
let getMyFeedbackRemote = new Net.ServerFunction("GetMyFeedback");
let postFeedbackRemote = new Net.ServerFunction("PostFeedback");
let postFeedbackCommentRemote = new Net.ServerFunction("PostFeedbackComment");

getAllFeedbackRemote.Callback = () => {
	
}