import Block from '../../core/Block';

type ErrorProps = {
	title: string;
	subTitle: string;
};

export class Error extends Block {
	constructor(props: ErrorProps) {
		super(props);
	}

	protected render(): string {
		const { subTitle, title } = this.props as ErrorProps;
		return `
            <div class="error-page">
                {{#> Layout className="error-page__layout"}}
                    <div class="error-page__container">
                        <div class="error-page__title">${title}</div>
                        <div class="error-page__subTitle">${subTitle}</div>
                        {{{ Button label="Назад к чатам" type="link" navTo="chats" }}}
                    </div>
                {{/Layout}}
            </div>
        `;
	}
}
