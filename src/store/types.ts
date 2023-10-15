import { ChatType, ChatsList } from 'src/shared/models/ChatModels';
import { User } from 'src/shared/models/UserModels';

export type State = {
	error: string | null;
	user: User | null;
	isOpenDialogChat: boolean;
	isChatPopoverOpened: boolean;
	chats: ChatsList;
	selectedChat?: ChatType;
	messages: unknown[];
};
