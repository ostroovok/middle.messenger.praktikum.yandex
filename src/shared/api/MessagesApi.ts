import { KEEP_ALIVE_DELAY, WAIT_CONNECTION_DELAY, WebSocketHost } from './utils/constants';

type MessagesApiProps = {
	userId: number;
	chatId: number;
	token: string;
	callback: (messages: unknown[]) => void;
};

enum MessagesEvents {
	Open = 'open',
	NewMessage = 'message',
	Close = 'close',
	Error = 'error',
}

export enum MessagesTypes {
	GetOldMessages = 'get old',
	Message = 'message',
	Error = 'error',
}

enum SocketReadyState {
	Connecting,
	Open,
	Closing,
	Closed,
}

export class MessagesApi {
	private _chatId?: number;
	private _userId?: number;
	private _token?: string;
	private _isConnectionOpen?: boolean;

	private socket?: WebSocket;
	private connectionKeepAlive?: NodeJS.Timeout;
	private _onNewMessageCallback?: MessagesApiProps['callback'];
	public static instance: MessagesApi | null = null;

	constructor(props: MessagesApiProps) {
		if (MessagesApi.instance && MessagesApi.instance.shouldResetInstance(props)) {
			MessagesApi.instance.closeConnection();
		} else if (MessagesApi.instance) {
			return MessagesApi.instance;
		}

		const { chatId, token, userId, callback } = props;

		this._token = token;
		this._chatId = chatId;
		this._userId = userId;
		this._isConnectionOpen = false;
		this._onNewMessageCallback = callback;

		this.createSocket(chatId, token, userId);
		this.setListeners();

		MessagesApi.instance = this;
	}

	private createSocket(chatId: number, token: string, userId: number) {
		this.socket = new WebSocket(`${WebSocketHost}/chats/${userId}/${chatId}/${token}`);
		this.connectionKeepAlive = setInterval(() => {
			this.socket?.send('');
		}, KEEP_ALIVE_DELAY);
	}

	private setOpenListener() {
		this.socket?.addEventListener(MessagesEvents.Open, () => {
			this._isConnectionOpen = true;
			this.getOldMessages();
		});
	}

	private setNewMessagesListener() {
		this.socket?.addEventListener(MessagesEvents.NewMessage, event => {
			const messages = JSON.parse(event.data);
			this._onNewMessageCallback?.(Array.isArray(messages) ? messages : [messages]);
		});
	}

	private setCloseListener() {
		this.socket?.addEventListener(MessagesEvents.Close, () => {
			this._isConnectionOpen = false;
			clearInterval(this.connectionKeepAlive);
		});
	}

	private setListeners() {
		this.setOpenListener();
		this.setNewMessagesListener();
		this.setCloseListener();
	}

	private getOldMessages() {
		this.sendMessage('', MessagesTypes.GetOldMessages);
	}

	private _closeConnection() {
		this.socket?.close();
	}

	shouldResetInstance(newProps: MessagesApiProps) {
		const { chatId, token, userId } = newProps;
		return this._chatId !== chatId || this._token !== token || this._userId !== userId;
	}

	closeConnection() {
		this._closeConnection();
	}

	sendMessage(message: string, type: string = MessagesTypes.Message) {
		if (this._isConnectionOpen) {
			this.socket?.send(JSON.stringify({ content: message, type }));
		} 
	}
}
