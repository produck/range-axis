import * as Utils from './Utils.mjs';

export const operator = (A, B, Result, {}) => {
	const merged = [...A, ...B].sort(Utils.ASC);
	let [from, to] = merged.shift();

	while(merged.length > 0) {
		const range = merged.shift();

		if (range[0] > to) {
			Result.push([from, to]);
			from = range[0];
		}

		if (range[1] > to) {
			to = range[1];
		}
	}

	Result.push([from, to]);
};
