export type ChatUser = {
	id: number;
	first_name: string;
	second_name: string;
	avatar: string;
	email: string;
	login: string;
	role: string;
};

export type ChatType = {
	id: number;
	title: string;
	avatar: string;
	unread_count: number;
	created_by: number;
	last_message: {
		user: {
			first_name: string;
			second_name: string;
			avatar: string;
			email: string;
			login: string;
			phone: string;
		};
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

export type GetChatUsersRequest = {
	chatId: number;
	offset?: number;
	limit?: number;
	name?: string;
	email?: string;
};
export type GetChatUsersResponse = ChatUser[];

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
