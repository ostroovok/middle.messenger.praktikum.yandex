import Block from '../../core/Block';

type ProfileProps = {};

export class Profile extends Block {
	constructor(props: ProfileProps) {
		super(props);
	}

	protected render(): string {
		return `
        <div class="profile-page">
            {{#> Sider }}
                {{{ IconButton navTo="chats" className="profile-page__back-button" imageSrc="/src/assets/images/arrow-blue.svg"}}}
            {{/Sider}}
            {{#> Layout direction="row"}}
                <div class="profile-page__container">
                    <div class="profile-page__avatar">
                        {{{ Avatar imageSrc="/src/assets/images/unknown-image.svg" label="Поменять аватар" name="avatar" className="" disabled=true}}}
                        <div class="profile-page__display-name">Иван</div>
                    </div>
                    <div class="profile-page__fields">
                        {{{ ProfileInputField 
                            ref="email" 
                            name="email" 
                            label="Почта" 
                            type="email"
                            value="pochta@yandex.ru" 
                            disabled=true 
                        }}}
                        {{{ ProfileInputField 
                            ref="login"
                            name="login" 
                            label="Логин" 
                            type="text" 
                            value="ivanivanov" 
                            disabled=true
                        }}}
                        {{{ ProfileInputField 
                            ref="first_name" 
                            name="firstName" 
                            label="Имя" 
                            type="text" 
                            value="Иван" 
                            disabled=true
                        }}}
                        {{{ ProfileInputField 
                            ref="second_name" 
                            name="secondName" 
                            label="Фамилия" 
                            type="text" 
                            value="Иванов" 
                            disabled=true
                        }}}
                        {{{ ProfileInputField 
                            ref="display_name" 
                            name="displayName" 
                            label="Имя в чате" 
                            type="text" 
                            value="Иван" 
                            disabled=true
                        }}}
                        {{{ ProfileInputField 
                            ref="phone" 
                            name="phone" 
                            label="Телефон" 
                            type="text" 
                            value="+7 (909) 967 30 30" 
                            disabled=true
                        }}}
                    </div>
                    <div class="profile-page__actions">
                        {{{ Button label="Изменить данные" navTo="editProfile" className="profile-page__action-button"}}}
                        {{{ Button label="Изменить пароль" navTo="changePassword" className="profile-page__action-button"}}}
                        {{{ Button label="Выйти" navTo="login" className="profile-page__action-button profile-page__action-button__red"}}}
                    </div>
                </div>
            {{/Layout}}
        </div>
        `;
	}
}
