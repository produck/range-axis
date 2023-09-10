import * as Utils from './Utils.mjs';
import * as Boundary from './Boundary.mjs';

const SPEC_LIST = [
	Array.isArray,
	range => range.length === 2,
	range => range.every(Boundary.isBoundary),
	range => range[0] <= range[1],
];

export const isTupleRange = any => SPEC_LIST.every(Utils.MATCHED, any);
export const isSimpleRange = Boundary.isBoundary;
export const isRange = any => isSimpleRange(any) || isTupleRange(any);

export const assert = any => {
	if (!isRange(any)) {
		Utils.throwError('Invalid range, one "integer" or "[integer, integer]" expected.');
	}
};

export const normalize = range => {
	assert(range);

	return isSimpleRange(range) ? [range, range] : [...range];
};
