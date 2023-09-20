import Block from '../../core/Block';

type MessageProps = {
	text: string;
	isUserSender: boolean;
    time: string;
};

export class Message extends Block {
	constructor(props: MessageProps) {
		super(props);
	}

	protected render(): string {
		return `
            <div class="message {{#if isUserSender}}message__user-sender{{else}}message__user-recipient{{/if}}">
                <div class="message__content">
                    {{text}}
                    <div class="message__meta-info {{#if isUserSender}}message__meta-info__checked{{/if}}">
                        {{#if isUserSender}}
                            <div class="message__check-marker">
                                <svg width="11" height="5" viewBox="0 0 11 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line y1="-0.5" x2="3.765" y2="-0.5" transform="matrix(0.705933 0.708278 -0.705933 0.708278 0.700195 2.33313)" stroke="#3369F3"/>
                                    <line y1="-0.5" x2="5.6475" y2="-0.5" transform="matrix(0.705933 -0.708278 0.705933 0.708278 3.35828 5.00006)" stroke="#3369F3"/>
                                    <line y1="-0.5" x2="5.6475" y2="-0.5" transform="matrix(0.705933 -0.708278 0.705933 0.708278 6.01587 5.00006)" stroke="#3369F3"/>
                                </svg>                        
                            </div>
                        {{/if}}
                        {{time}}
                    </div>
                </div>
            </div>
        `;
	}
}
