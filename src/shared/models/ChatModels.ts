export type ChatUser = {
	first_name: string;
	second_name: string;
	avatar: string;
	email: string;
	login: string;
	phone: string;
};

export type ChatType = {
	id: number;
	title: string;
	avatar: string;
	unread_count: number;
	created_by: number;
	last_message: {
		user: ChatUser;
		time: string;
		content: string;
	};
};

export type ChatsList = ChatType[];

export type CreateChatSubmitData = {
	title: string;
};
export type CreateChatResponseData = {
	id: number;
};

export type DeleteChatSubmitData = {
	chatId: number;
};
export type DeleteChatResponseData = {
	userId: number;
	result: {
		id: number;
		title: string;
		avatar: string;
		created_by: number;
	};
};

export type GetChatTokenRequest = {
	id: number;
};
export type GetChatTokenResponseData = {
	token: string;
};

export type ChangeChatAvatarSubmitData = {
	chatId: number;
	file: File;
};
export type ChangeChatAvatarResponseData = ChatType;

export type AddUsersToChatSubmitData = {
	chatId: number;
	users: number[];
};

export type DeleteUsersFromChatSubmitData = {
	chatId: number;
	users: number[];
};
