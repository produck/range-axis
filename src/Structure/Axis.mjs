import * as Utils from './Utils.mjs';
import * as Range from './Range.mjs';

const SPEC_LIST = [
	Array.isArray,
	axis => axis.every(Range.isRange),
	axis => {
		let last = -Infinity;

		for (const range of axis.map(Range.normalize)) {
			if (range[0] < last) {
				return false;
			}

			last = range[1];
		}

		return true;
	},
];

export const isAxis = any => SPEC_LIST.every(Utils.MATCHED, any);

export const assert = any => {
	if (!isAxis(any)) {
		Utils.throwError('Invalid axis, one "Range[]" expected.');
	}
};

export const normalize = axis => {
	assert(axis);

	return axis.map(Range.normalize);
};
