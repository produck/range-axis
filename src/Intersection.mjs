import * as Utils from './Utils.mjs';

export const operator = Utils.defineOperator((A, B, Result) => {
	const merged = [...A, ...B].sort(Utils.ASC);
	const reference = [...merged.shift()];

	while (merged.length > 0) {
		const range = [...merged.shift()];

		if (range[0] <= reference[1]) { // sensitive =?
			reference[0] = range[0];

			if (range[1] <= reference[1]) {
				Result.push([...range]);
				reference[0] = range[1];
			} else {
				Result.push([...reference]);
				reference[0] = reference[1];
				reference[1] = range[1];
			}
		} else {
			[reference[0], reference[1]] = range;
		}
	}
});
