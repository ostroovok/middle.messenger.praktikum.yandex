import Block from '../../core/Block';

type ChatsProps = {};

export class Chats extends Block {
	constructor(props: ChatsProps) {
		super(props);
	}

	protected render(): string {
		return `
        <div class="chats-page">
            {{#> Layout className="chats-page__layout" direction="row"}}
                {{#> Sider className="chats-page__chats-list"}}
                    <div class="chats-page__profile-button-container">
                        {{{ Button label="Профиль" type="link" navTo="profile" className="chats-page__profile-button" }}}
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 9L5 5L1 1" stroke="#999999"/>
                        </svg>
                    </div>
                    <div class="chats-page__search-container">
                        {{{ Input placeholder="Поиск" ref="search" inputClassName="chats-page__search" }}}
                    </div>
                    {{#> ContactList }}
                        {{{ ContactCard
                            avatarUrl="/src/assets/images/unknown-image.svg" 
                            contactName="Андрей" 
                            lastMessagePreview="Друзья, у меня для вас особенный выпуск новостей!Друзья, у меня для вас особенный выпуск новостей!Друзья, у меня для вас особенный выпуск новостей!Друзья, у меня для вас особенный выпуск новостей!" 
                            lastMessagetime="10:49" 
                            unreadMessages="2"
                        }}}
                        {{{ ContactCard 
                            avatarUrl="/src/assets/images/unknown-image.svg" 
                            contactName="Канал со спамом" 
                            lastMessagePreview="Изображение" 
                            lastMessagetime="02:33" 
                            unreadMessages="10"
                        }}}
                        {{{ ContactCard 
                            avatarUrl="/src/assets/images/unknown-image.svg" 
                            contactName="Иван" 
                            lastMessagePreview="..." 
                            lastMessagetime="Пт" 
                            unreadMessages=""
                            sendByUser="true"
                        }}}
                        
                        <div>
                            {{{ Button label="Страница 404" type="link" navTo="notFound" className="" }}}
                            {{{ Button label="Страница 5**" type="link" navTo="serverError" className="" }}}
                        </div>
                    {{/ContactList}}
                {{/Sider}}
                {{#> Layout className="chats-page__messages-window"}}
                    {{{ Chat }}}
                {{/Layout}}
            {{/Layout}}
        </div>
        `;
	}
}