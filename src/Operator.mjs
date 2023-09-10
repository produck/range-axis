import { Axis } from './Structure/index.mjs';

const IS_EMPTY = axis => axis.length === 0;

export const define = (fn, comparator) => {
	return (...args) => {
		if (args.length !== 2) {
			throw new Error('There MUST be 2 arguments.');
		}

		args.forEach(Axis.assert);

		const result = [];

		if (!args.every(IS_EMPTY)) {
			fn(...args.map(Axis.normalize), result, comparator);
		}

		return result;
	};
};
