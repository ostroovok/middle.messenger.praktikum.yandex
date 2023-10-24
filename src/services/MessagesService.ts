import { MessagesApi, MessagesTypes } from 'src/shared/api/MessagesApi';
import { getChatToken } from './ChatsService';
import { GetChatTokenResponseData } from 'src/shared/models/ChatModels';
import { NewMessagesResponse } from 'src/shared/models/MessagesModels';

const updateFeed = (messages: unknown[]) => {
	const { messages: oldMessages } = window.store.getState();
	const newMessages = messages.filter(
		mess => (mess as NewMessagesResponse).type === MessagesTypes.Message,
	);
	window.store.set({
		messages: [...newMessages, ...oldMessages],
	});
};

const getNewToken = async (chatId: number) => {
	const tokenInfo = await getChatToken({ id: chatId });
	return (tokenInfo as GetChatTokenResponseData).token;
};

const createOrGetMessagesApi = async (needNewToken: boolean): Promise<MessagesApi | null> => {
	const { activeChat, activeChatToken, user } = window.store.getState();
	if (!activeChat || !user) return null;
	let token = activeChatToken;
	if (!token || needNewToken) {
		token = await getNewToken(activeChat.id);
		if (!token) return null;
		window.store.set({
			activeChatToken: token,
		});
	}
	const api = new MessagesApi({
		callback: updateFeed,
		chatId: activeChat.id,
		token: token,
		userId: user.id,
	});

	return api;
};

export const openChat = async () => {
	window.store.set({
		messages: [],
	});
	createOrGetMessagesApi(true);
};

export const closeChat = () => {
	MessagesApi.instance?.closeConnection();
	window.store.set({
		activeChatToken: undefined,
		messages: [],
	});
};

export const sendMessage = (message: string) => {
	createOrGetMessagesApi(false).then(api => {
		api?.sendMessage(message, MessagesTypes.Message);
	});
};
