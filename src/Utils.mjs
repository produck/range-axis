import { Axis } from './Structure/index.mjs';

export const ASC = (a, b) => a[0] - b[0] || a[1] - b[1];

export const defineOperator = (fn) => {
	return (_a, _b) => {
		const result = [];

		fn(...[_a, _b].map(Axis.normalize), result);

		return result;
	};
};
