import { throwError } from './Utils.mjs';
import * as Boundary from './Boundary.mjs';

const SPEC = {
	TUPLE: [{
		test: Array.isArray,
		message: 'It MUST be an array as tuple',
	}, {
		test: range => range.length === 2,
		message: 'There MUST be only 2 number',
	}, {
		test: range => range.every(Boundary.isBoundary),
		message: 'All element MUST be boundaries.',
	}, {
		test: ([from, to]) => from.number < to.number,
		message: 'A from-boundary MUST be less than its to-boundary.',
	}],
};

export const isTupleRange = any => SPEC.TUPLE.every(spec => spec.test(any));
export const isSimpleRange = Boundary.isBoundary;
export const isRange = any => isTupleRange(any);
export const isLikeRange = any => isSimpleRange(any) || isRange(any);

const T = 'BoundaryLike';

export const assert = any => {
	if (!isRange(any)) {
		throwError(`Invalid range, one "${T} | [${T}, ${T}]" expected.`);
	}
};

export const normalize = range => {
	assert(range);

	return isSimpleRange(range) ? [range, range] : [...range];
};
