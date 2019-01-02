import Net from "rbx-net"
import * as Roact from "rbx-roact"
import { IFeedback } from "shared/IFeedback"
import { FeedbackList } from "./FeedbackList"

const GetAllFeedbackRemote = Net.GetClientFunction("GetAllFeedback")
const GetMyFeedbackRemote = Net.GetClientFunction("GetMyFeedback")
const postFeedbackRemote = Net.GetClientFunction("PostFeedback")
const postFeedbackCommentRemote = Net.GetClientFunction("PostFeedbackComment")

const allFeedback = GetAllFeedbackRemote!.CallServer() as any

const Main = <screengui IgnoreGuiInset={true} Key="Main">
	<frame Size={new UDim2(1, 0, 1, 0)} Key="Frame" BackgroundColor3={new Color3(1, 1, 1)}>
		<FeedbackList feedback={allFeedback[1] as IFeedback[]} />
	</frame>
</screengui>

Roact.mount(Main, game.GetService("Players").LocalPlayer!.WaitForChild("PlayerGui"), "Main")
