import { Axis } from './Structure/index.mjs';

const ASC = (a, b) => a[0] - b[0] || a[1] - b[1];
const HEAD = [-Infinity, -Infinity];
const TAIL = [Infinity, Infinity];

export const operator = (_a, _b) => {
	const a = Axis.normalize(_a), b = Axis.normalize(_b);
	const target = [...HEAD], result = [];

	for (const range of [...a, ...b, TAIL].sort(ASC)) {
		if (range[0] > target[1]) {
			result.push([...target]);
			target[0] = range[0];
		}

		if (range[1] > target[1]) {
			target[1] = range[1];
		}
	}

	result.shift();

	return result;
};
