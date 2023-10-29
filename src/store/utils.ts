import isEqual from 'src/shared/utils/isEqual';
import Block from '../core/Block/Block';
import { Store, StoreEvents } from './store';
import { State } from './types';

export const SESSION_STORAGE_STATE_KEY = 'app-store';

const defaultState: State = {
	error: null,
	user: null,
	isOpenDialogAddChat: false,
	isChatPopoverOpened: false,
	isOpenDialogAddUserToChat: false,
	isOpenDialogRemoveUserFromChat: false,
	isChangeChatAvatarDialogOpen: false,
	isOpenDialogDeleteChat: false,
	activeChatUsers: [],
	chats: [],
	messages: [],
};

export const initStore = () => {
	if (window.store) return;
	const sessionState = sessionStorage.getItem(SESSION_STORAGE_STATE_KEY);
	const appStore = sessionState ? (JSON.parse(sessionState) as State) : defaultState;
	window.store = new Store<State>(appStore);
};

export const resetStoreState = () => {
	if (!window.store) return;
	window.store.set(defaultState);
	sessionStorage.setItem(SESSION_STORAGE_STATE_KEY, JSON.stringify(defaultState));
};

export const connect = (mapStateToProps: (state: State) => Partial<State>) => {
	if (!window.store) initStore();
	return function <P extends object>(Component: typeof Block) {
		return class extends Component {
			private onChangeStoreCallback: () => void;
			constructor(props: P) {
				const { store } = window;

				// сохраняем начальное состояние
				let state = mapStateToProps(store.getState());

				super({ ...props, ...state });

				this.onChangeStoreCallback = () => {
					if (!store) return;

					// при обновлении получаем новое состояние
					const newState = mapStateToProps(store.getState());

					// если что-то из используемых данных поменялось, обновляем компонент
					if (!isEqual(state, newState)) {
						this.setProps({ ...newState });
					}

					// не забываем сохранить новое состояние
					state = newState;
				};

				// подписываемся на событие
				store.on(StoreEvents.Updated, this.onChangeStoreCallback);
			}

			componentWillUnmount() {
				super.componentWillUnmount();
				window.store?.off(StoreEvents.Updated, this.onChangeStoreCallback);
			}
		};
	};
};
