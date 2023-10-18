import { ChatsApi } from 'src/shared/api/ChatsApi';
import {
	ChangeChatAvatarResponseData,
	ChangeChatAvatarSubmitData,
	ChatsList,
	CreateChatResponseData,
	CreateChatSubmitData,
	DeleteChatResponseData,
	DeleteChatSubmitData,
	GetChatUsersRequest,
	GetChatUsersResponse,
} from 'src/shared/models/ChatModels';
import { getUsersByLogin } from './UserService';
import { User } from 'src/shared/models/UserModels';

const chatsApi = new ChatsApi();

export const getChats = async () => {
	const chats = await chatsApi.getChats();
	if (!chats) return;
	window.store.set({
		chats: chats as ChatsList,
	});
	return chats;
};

export const createChat = async (data: CreateChatSubmitData) => {
	const newChatId = await chatsApi.createChat(data);
	if (newChatId) {
		getChats();
	}
	return (newChatId as CreateChatResponseData).id;
};

export const addUserToChat = async (data: { userLogin: string; chatId: number }) => {
	const users = await getUsersByLogin(data.userLogin);
	if (!users || !(users as User[]).length) {
		throw new Error('not found users with same login');
	}
	await chatsApi.addUsersToChat({ chatId: data.chatId, users: [(users as User[])[0].id] });
};

export const deleteUserFromChat = async (data: { users: number[]; chatId: number }) => {
	await chatsApi.removeUsersFromChat({ chatId: data.chatId, users: data.users });
};

export const changeChatAvatar = async (
	data: ChangeChatAvatarSubmitData,
): Promise<ChangeChatAvatarResponseData | Error> => await chatsApi.changeChatAvatar(data);

export const deleteChat = async (
	data: DeleteChatSubmitData,
): Promise<DeleteChatResponseData | Error> => await chatsApi.deleteChat(data);

export const getChatUsers = async (
	data: GetChatUsersRequest,
): Promise<GetChatUsersResponse | Error> => await chatsApi.getChatUsers(data);
