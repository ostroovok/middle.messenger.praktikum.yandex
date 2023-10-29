import Block from 'src/core/Block/Block';
import { default as ChatActionsTemplate } from './ChatActions.hbs?raw';

export class ChatActions extends Block {
	constructor() {
		super();
	}

	protected render() {
		return ChatActionsTemplate;
	}
}
