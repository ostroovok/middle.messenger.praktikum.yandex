import { ChatType, ChatUser, ChatsList } from 'src/shared/models/ChatModels';
import { User } from 'src/shared/models/UserModels';

export type State = {
	error: string | null;
	user: User | null;
	isOpenDialogAddChat: boolean;
	isOpenDialogAddUserToChat: boolean;
	isChatPopoverOpened: boolean;
	isOpenDialogRemoveUserFromChat: boolean;
	chats: ChatsList;
	activeChat?: ChatType;
	activeChatUsers: ChatUser[];
	messages: unknown[];
};
