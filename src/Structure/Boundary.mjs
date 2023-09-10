import { throwError, TypeBoolean, TypeNumber, TypeObject } from './Utils.mjs';

const { freeze, hasOwn, isFrozen, keys } = Object;
const isRealNumber = any => TypeNumber(any) && !isNaN(any) && !isFinite(any);

const SPEC_LIST = [{
	test: any => TypeObject(any) && isFrozen(any),
	message: 'It SHOULD be a frozen object.',
}, {
	test: any => keys(any).length === 2 && hasOwn(any, 'number') && hasOwn('inclusive'),
	message: 'There SHOLD be only 2 properties: `.number`, `.inclusive`.',
}, {
	test: any => isRealNumber(any.number),
	message: 'The `.number` MUST be a numeric.',
}, {
	test: any => TypeBoolean(any.inclusive),
	message: 'The `.inclusive` MUST be a boolean.',
}];

const _Inclusive = number => freeze({ number, inclusive: true });
const _Exclusive = number => freeze({ number, inclusive: false });

export const INFINITY = freeze({
	POSITIVE: _Exclusive(Infinity),
	NEGATIVE: _Exclusive(-Infinity),
});

export const isBoundary = any => {
	if (any === INFINITY.POSITIVE) {
		return true;
	}

	if (any === INFINITY.NEGATIVE) {
		return true;
	}

	return SPEC_LIST.every(spec => spec.test(any));
};

export const assert = any => {
	for (const spec of SPEC_LIST) {
		if (!spec.test(any)) {
			throwError(spec.message);
		}
	}
};

const Constructor = native => number => {
	if (!isRealNumber(number)) {
		throwError('Invalid number, one numeric expected.');
	}

	return native(number);
};

export const Inclusive = Constructor(_Inclusive);
export const Exclusive = Constructor(_Exclusive);
export { Inclusive as I, Exclusive as E };

export const normalize = number => Exclusive(number);
