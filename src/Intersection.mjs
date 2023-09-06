import * as Utils from './Utils.mjs';

export const operator = Utils.defineOperator((a, b, result) => {
	const merged = [...a, ...b].sort(Utils.ASC);
	const reference = merged.shift();

	while (merged.length > 0) {
		const range = merged.shift();

		if (range[0] <= reference[1]) {
			reference[0] = range[0];

			if (range[1] <= reference[1]) {
				result.push([...range]);
				reference[0] = range[1];
			} else {
				result.push([...reference]);
				reference[0] = reference[1];
				reference[1] = range[1];
			}
		} else {
			Object.assign(reference, range);
		}
	}
});
