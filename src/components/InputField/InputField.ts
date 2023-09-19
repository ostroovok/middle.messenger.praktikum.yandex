import Block from '../../core/Block';
import { ValidationCallback } from '../../shared/types';
import { InputProps } from '../Input/Input';

type InputFieldProps = InputProps & {
	labelClassName?: string;
	label?: string;
	validate: ValidationCallback;
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
		// @ts-ignore
		const value = this.refs.input._element.value;
		const errorText = this.props.validate?.(value);
		if (errorText) {
			this.refs.errorLine.setProps({ errorText });
			return false;
		}
		this.refs.errorLine.setProps({ errorText: undefined });
		return true;
	}

	protected render(): string {
		const {
			disabled = false,
			inputClassName,
			labelClassName,
			label,
			name,
			placeholder = '',
			type,
			value = '',
		} = this.props as InputFieldProps;

		return `
           <div class="input">
				<label for${name} class="input__container ${labelClassName}">
					<div class="input__label">${label}</div>
					{{{ Input 
						ref="input"
						inputClassName="${inputClassName}"
						name="${name}"
						type="${type}"
						value="${value}"
						onBlur=onBlur
						placeholder="${placeholder}"
						disabled=${disabled}
					}}}
				</label>
				{{{ ErrorLine errorText=error ref="errorLine"}}}
		   </div>
        `;
	}
}
