import Block from '../../../../core/Block';
import { profileValidationScheme } from '../../../../shared/validation';

type EditProfilePageProps = {};

export class EditProfilePage extends Block {
	constructor(props: EditProfilePageProps) {
		super({
			...props,
			validate: profileValidationScheme,
			onSubmit: (event: InputEvent) => {
				event.preventDefault();
				const email = this.refs.email.value();
				const login = this.refs.login.value();
				const first_name = this.refs.first_name.value();
				const second_name = this.refs.second_name.value();
				const display_name = this.refs.display_name.value();
				const phone = this.refs.phone.value();

				console.log({
					email,
					login,
					first_name,
					second_name,
					display_name,
					phone,
				});
			},
		});
	}

	protected render(): string {
		return `
        <div class="edit-profile-page">
            {{#> Sider }}
                {{{ IconButton navTo="profile" imageSrc="/src/assets/images/arrow-blue.svg" className="edit-profile-page__back-button"}}}
            {{/Sider}}
            {{#> Layout className="edit-profile-page__container"}}
                {{#> Form className="edit-profile-page__form-container"}}
                    <div class="edit-profile-page__form-data">
                    <div class="edit-profile-page__avatar">
                        {{{ Avatar 
                            imageSrc="/src/assets/images/unknown-image.svg" 
                            label="Поменять аватар" 
                            name="avatar" 
                            className="" 
                        }}}
                    </div>
                    <div class="edit-profile-page__fields">
                        {{{ ProfileInputField ref="email" name="email" label="Почта" type="email" value="pochta@yandex.ru" validate=validate.email}}}
                        {{{ ProfileInputField ref="login" name="login" label="Логин" type="text" value="ivanivanov" validate=validate.login}}}
                        {{{ ProfileInputField ref="first_name" name="first_name" label="Имя" type="text" value="Иван" validate=validate.firstName}}}
                        {{{ ProfileInputField ref="second_name" name="second_name" label="Фамилия" type="text" value="Иванов" validate=validate.secondName}}}
                        {{{ ProfileInputField ref="display_name" name="display_name" label="Имя в чате" type="text" value="Иван"}}}
                        {{{ ProfileInputField ref="phone" name="phone" label="Телефон" type="text" value="+7 (909) 967 30 30" validate=validate.phone}}}
                    </div>
                    </div>
                    <div class="edit-profile-page__actions">
                        {{{ Button label="Сохранить" navTo="profile" type="primary" className="edit-profile-page__action-button" onClick=onSubmit}}}
                    </div>
                {{/Form}}
            {{/Layout}}
        </div>
        `;
	}
}
