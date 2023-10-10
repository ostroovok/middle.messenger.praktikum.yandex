import Block from 'src/core/Block';
import { default as ProfileTemplate } from './Profile.hbs?raw';


export class Profile extends Block {
	constructor() {
		super();
	}

	protected render(): string {
		return ProfileTemplate;
	}
}
