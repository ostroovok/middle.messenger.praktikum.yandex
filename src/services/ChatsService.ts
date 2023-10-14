import { Router } from 'src/core/Router/Router';
import { Routes } from 'src/shared/navigation/routes';
import { ChatsApi } from 'src/shared/api/ChatsApi';
import { ChatsList } from 'src/shared/models/ChatModels';

const chatsApi = new ChatsApi();
const router = new Router();

export const getChats = async () => {
	const chats = await chatsApi.getChats();
	if (!chats) return;
	window.store.set({
		chats: chats as ChatsList,
	});
	return chats;
};
