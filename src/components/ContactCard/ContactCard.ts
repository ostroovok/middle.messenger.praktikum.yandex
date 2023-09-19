import Block from '../../core/Block';

type ContactCardProps = {
	avatarUrl: string;
	contactName: string;
	lastMessagePreview: string;
	lastMessagetime: string;
	unreadMessages: number;
	sendByUser: boolean;
};

export class ContactCard extends Block {
	constructor(props: ContactCardProps) {
		super(props);
	}

	protected render(): string {
		const {
			avatarUrl,
			contactName,
			lastMessagePreview,
			lastMessagetime,
			unreadMessages,
		} = this.props as ContactCardProps;

		return `
            <div class="contact-card">
                <div class="contact-card__container">
                    <div class="contact-card__image-container">
                        <img src="${avatarUrl}" class="contact-card__image" />
                    </div>
                    <div class="contact-card__content-container">
                        <div class="contact-card__main-data">
                            <div class="contact-card__name">
                                ${contactName}
                            </div>
                            <div class="contact-card__message-preview">
                                {{#if sendByUser}}
                                    <span class="contact-card__message-preview-user-prefix">Вы:</span>
                                {{/if}}
                                ${lastMessagePreview}
                            </div>
                        </div>
                        <div class="contact-card__meta-data">
                            <div class="contact-card__time">
                                ${lastMessagetime}
                            </div>
                            {{#if unreadMessages}}
                                <div class="contact-card__unread-messages">
                                    ${unreadMessages}
                                </div>
                            {{/if}}
                        </div>
                    </div>
                </div>
            </div>
        `;
	}
}
