import * as Utils from './Utils.mjs';

export const HEAD = [-Infinity, -Infinity];
export const TAIL = [Infinity, Infinity];

export const operator = Utils.defineOperator((a, b, result) => {
	const merged = [...a, ...b, TAIL].sort(Utils.ASC);
	const reference = [...HEAD];

	for (const range of merged) {
		if (range[0] > reference[1]) {
			result.push([...reference]);
			reference[0] = range[0];
		}

		if (range[1] > reference[1]) {
			reference[1] = range[1];
		}
	}

	result.shift();
});
