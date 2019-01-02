import * as Roact from "rbx-roact"
import { IFeedback } from "shared/IFeedback"

function getPlayerBust(id: number): string {
	const data = game.GetService("Players").GetUserThumbnailAsync(id, Enum.ThumbnailType.AvatarBust, Enum.ThumbnailSize.Size420x420)
	const [image] = data
	return image
}

interface IFeedbackItemProps {
	author: number
	body: string
	subject: string,
	layoutOrder: number,
}

export class FeedbackItem extends Roact.Component<IFeedbackItemProps> {
	public render(): Roact.Element {
		return <frame Size={new UDim2(0.1, 0, 0.1, 0)} Key={`FeedbackItem ${this.props.layoutOrder}`}>
			<uipadding PaddingBottom={new UDim(0, 5)} PaddingLeft={new UDim(0, 5)} PaddingRight={new UDim(0, 5)} PaddingTop={new UDim(0, 5)} />
			<imagelabel Image={getPlayerBust(this.props.author)} BackgroundTransparency={1} Size={new UDim2(0.2, 0, 0.2, 0)} />
			<textlabel Text={game.GetService("Players").GetNameFromUserIdAsync(this.props.author)} BackgroundTransparency={1} BorderSizePixel={0} Size={new UDim2(0.75, 0, 0.2, 0)} TextScaled={true} Position={new UDim2(0.25, 0, 0, 0)} />
			<textbutton Size={new UDim2(1, 0, 0.75, 0)} Position={new UDim2(0, 0, 0.25, 0)} Text="Open" Event={{
				MouseButton1Click: () => { print("Open was clicked.") },
			}}/>
		</frame>
	}
}

interface IFeedbackListProps {
	feedback: IFeedback[]
}

export class FeedbackList extends Roact.Component<any> {
	private feedback: Roact.Element[] = []
	public render(): Roact.Element {
		const feedback: Roact.Element[] = []
		for (const key in this.props.feedback) {
			if (this.props.feedback[key] !== undefined) {
				const element = this.props.feedback[key]
				const props = {
					author: 1,
					body: element.body,
					layoutOrder: 1,
					subject: element.subject,
				}
				const feedbackItem = Roact.createElement(FeedbackItem, props)
				feedback.push(feedbackItem)
			}
		}
		function getFeedback() {
			return Roact.createElement("Folder", {}, feedback)
		}
		return <frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
			<uigridlayout Key="GridLayout" SortOrder={Enum.SortOrder.LayoutOrder} />
			{getFeedback()}
		</frame>
	}
}
