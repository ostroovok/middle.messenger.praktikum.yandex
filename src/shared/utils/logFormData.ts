import { InputField } from 'src/components';
import { RefsType } from '../types';

export const logFormData = (refs: RefsType<InputField>, event: MouseEvent) => {
	event.preventDefault();

	const logData = Object.keys(refs).reduce(
		(acc, key) => Object.assign(acc, { [key]: refs[key].value() }),
		{}
	);

	console.log(logData);
};
