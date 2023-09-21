import Block from 'src/core/Block';
import { default as ProfileTemplate } from './Profile.hbs?raw';

type ProfileProps = {};

export class Profile extends Block {
	constructor(props: ProfileProps) {
		super(props);
	}

	protected render(): string {
		return ProfileTemplate;
	}
}
