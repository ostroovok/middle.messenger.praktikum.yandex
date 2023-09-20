import Block from '../../core/Block';

type PlugProps = {
	text: string;
	className?: string;
};

export class Plug extends Block {
	constructor(props: PlugProps) {
		super(props);
	}

	protected render(): string {
		return `
        <div class="plug__container {{className}}">
            <span>
                {{text}}
            </span>
        </div>`;
	}
}

// Выберите чат чтобы отправить сообщение (в разработке)
