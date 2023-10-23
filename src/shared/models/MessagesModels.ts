export type NewMessagesResponse = {
	chat_id: number;
	content: string | null;
	file: File | null;
	id: number;
	is_read: boolean;
	time: string;
	type: string;
	user_id: number;
};
