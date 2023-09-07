import { Axis } from './Structure/index.mjs';

export const ASC = (a, b) => a[0] - b[0] || a[1] - b[1];

const IS_EMPTY = axis => axis.length === 0;

export const defineOperator = (fn) => {
	return (...args) => {
		if (args.length !== 2) {
			throw new Error('There MUST be 2 arguments.');
		}

		const result = [];

		if (!args.every(IS_EMPTY)) {
			fn(...args.map(Axis.normalize), result);
		}

		return result;
	};
};
