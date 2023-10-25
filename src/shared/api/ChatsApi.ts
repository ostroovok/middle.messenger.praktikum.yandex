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
	GetChatUsersRequest,
	GetChatUsersResponse,
	GetCommonChatRequest,
	GetCommonChatResponseData,
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
			headers: { 'Content-Type': 'application/json' },
		});
	}
	async changeChatAvatar(
		data: ChangeChatAvatarSubmitData,
	): Promise<ChangeChatAvatarResponseData | Error> {
		const fileData = new FormData();
		fileData.append('avatar', data.file);
		fileData.set('chatId', String(data.chatId));
		return api.put('/avatar', {
			data: fileData,
		});
	}
	async addUsersToChat(data: AddUsersToChatSubmitData): Promise<void | Error> {
		return api.put('/users', { data, headers: { 'Content-Type': 'application/json' } });
	}
	async removeUsersFromChat(data: AddUsersToChatSubmitData): Promise<void | Error> {
		return api.delete('/users', { data, headers: { 'Content-Type': 'application/json' } });
	}
	async getChatUsers(data: GetChatUsersRequest): Promise<GetChatUsersResponse | Error> {
		const queryData: Omit<GetChatUsersRequest, 'chatId'> = {
			email: data.email,
			limit: data.limit,
			name: data.name,
			offset: data.offset,
		};
		return api.get(`/${data.chatId}/users`, { data: queryData });
	}
	async getChatToken(data: GetChatTokenRequest): Promise<GetChatTokenResponseData | Error> {
		return api.post(`/token/${data.id}`, { headers: { 'Content-Type': 'application/json' } });
	}
	async getCommonChat(data: GetCommonChatRequest): Promise<GetCommonChatResponseData | Error> {
		return api.get(`/${data.id}/common`);
	}
}
