import * as Utils from './Utils.mjs';

export const operator = (A, B, Result, { LE }) => {
	const merged = [...A, ...B].sort(Utils.ASC);
	let [from, to] = merged.shift();

	while (merged.length > 0) {
		const range = merged.shift();

		if (range[0] <= to) { // sensitive =?
			from = range[0];

			if (range[1] <= to) {
				Result.push([...range]);
				from = range[1];
			} else {
				Result.push([from, to]);
				from = to;
				to = range[1];
			}
		} else {
			[from, to] = range;
		}
	}
};
