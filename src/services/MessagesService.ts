import { MessagesApi, MessagesTypes } from 'src/shared/api/MessagesApi';
import { getChatToken } from './ChatsService';
import { GetChatTokenResponseData } from 'src/shared/models/ChatModels';

export const updateFeed = (messages: unknown[]) => {
	const { messages: oldMessages } = window.store.getState();
	// window.store.set({
	// 	messages: [...messages.filter(mes => mes.type === ), ...oldMessages],
	// });
};

const createOrGetMessagesApi = async (needNewToken: boolean): Promise<MessagesApi | null> => {
	const { activeChat, activeCahtToken, user } = window.store.getState();
	if (!activeChat || !user) return null;
	let token = activeCahtToken;
	if (!token || needNewToken) {
		const tokenInfo = await getChatToken({ id: activeChat.id });
		// eslint-disable-next-line prefer-destructuring
		token = (tokenInfo as GetChatTokenResponseData).token;
		window.store.set({
			activeCahtToken: token,
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
	createOrGetMessagesApi(true);
};

export const closeChat = () => {
	MessagesApi.instance?.closeConnection();
	window.store.set({
		activeCahtToken: undefined,
		messages: [],
	});
};

export const sendMessage = (message: string) => {
	createOrGetMessagesApi(false).then(api => {
		api?.sendMessage(message, MessagesTypes.Message);
	});
};
