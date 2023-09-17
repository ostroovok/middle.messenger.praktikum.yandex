import Block from '../../core/Block';
import { InputProps } from '../Input/Input';

type InputFieldProps = InputProps & {
	labelClassName?: string;
	labelText?: string;
};

export class InputField extends Block {
	constructor(props: InputFieldProps) {
		super({
			...props,
			onBlur: () => this.validate(),
		});
	}
	public value() {
		if (!this.validate()) {
			return false;
		}
		// @ts-ignore
		return this.refs.input._element.value;
	}

	private validate() {
		console.log(this.refs);

		// @ts-ignore
		const value = this.refs.input._element.value;
		// const error = this.props.validate?.(value);
		// if (error) {
		// 	this.refs.errorLine.setProps({ error });
		// 	return false;
		// }
		// this.refs.errorLine.setProps({ error: undefined });
		return true;
	}

	protected render(): string {
		const { disabled, inputClassName, labelClassName, labelText, name, placeholder, type, value } =
			this.props as InputFieldProps;

		const disabledAttr = disabled ? 'disabled="disabled"' : '';
		const valueAttr = disabled ? `value="${value}"` : '';

		return `
            <div class="input">
                <label for${name} class="input__container ${labelClassName}">
                    <div class="input__label">${labelText}</div>
                    {{{ Input 
						ref="input"
                        class="input__element ${inputClassName}"
                        placeholder="${placeholder}"
                        name="${name}"
                        type="${type}"
                        ${valueAttr}
                        ${disabledAttr}
					}}}
                </label>
            </div>
        `;
	}
}
