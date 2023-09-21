import Block from 'src/core/Block';
import { logFormData } from 'src/shared/logFormData';
import { RefsType } from 'src/shared/types';
import { profileValidationScheme } from 'src/shared/validation';
import { default as EditProfilePageTemplate } from './EditProfilePage.hbs?raw';


export class EditProfilePage extends Block {
	constructor() {
		super({
			validate: profileValidationScheme,
			onSubmit: (event: MouseEvent) => logFormData(this.refs as RefsType, event)
		});
	}

	protected render(): string {
		return EditProfilePageTemplate;
	}
}
