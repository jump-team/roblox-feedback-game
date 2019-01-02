export declare interface IFeedback {
	subject: string,
	author: string,
	body: string,
	comments: [{ body: string, author: string, date: string }],
	date: string,
}
