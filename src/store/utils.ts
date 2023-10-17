import isEqual from 'src/shared/utils/isEqual';
import Block from '../core/Block';
import { Store, StoreEvents } from './store';
import { State } from './types';

const defaultState: State = {
	error: null,
	user: null,
	isOpenDialogAddChat: false,
	isChatPopoverOpened: false,
	isOpenDialogAddUserToChat: false,
	isOpenDialogRemoveUserFromChat: false,
	activeChatUsers: [],
	chats: [],
	messages: [],
};

export const initStore = () => {
	if (window.store) return;

	window.store = new Store<State>(defaultState);
};

export const resetStoreState = () => {
	if (!window.store) return;
	window.store.set(defaultState);
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
