import {
	AddUsersToChatSubmitData,
	ChangeChatAvatarResponseData,
	ChangeChatAvatarSubmitData,
	ChatsList,
	CreateChatResponseData,
	CreateChatSubmitData,
	DeleteChatResponseData,
	DeleteChatSubmitData,
	GetChatTokenRequest,
	GetChatTokenResponseData,
} from '../models/ChatModels';
import { HttpTransport } from './utils/HttpTransoprt';

const api = new HttpTransport('/chats');

export class ChatsApi {
	async getChats(): Promise<ChatsList | Error> {
		return api.get('');
	}
	async createChat(data: CreateChatSubmitData): Promise<CreateChatResponseData | Error> {
		return api.post('', {
			data,
			headers: { 'Content-Type': 'application/json' },
		});
	}
	async deleteChat(data: DeleteChatSubmitData): Promise<DeleteChatResponseData | Error> {
		return api.delete('', {
			data,
		});
	}
	async getChatToken(data: GetChatTokenRequest): Promise<GetChatTokenResponseData | Error> {
		return api.post('token', {
			data,
		});
	}
	async changeChatAvatar(
		data: ChangeChatAvatarSubmitData,
	): Promise<ChangeChatAvatarResponseData | Error> {
		return api.put('avatar', {
			data,
		});
	}
	async addUsersToChat(data: AddUsersToChatSubmitData): Promise<void | Error> {
		return api.put('users', { data });
	}
	async removeUsersFromChat(data: AddUsersToChatSubmitData): Promise<void | Error> {
		return api.delete('users', { data });
	}
}
