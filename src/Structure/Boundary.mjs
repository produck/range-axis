import { throwError, TypeBoolean, TypeNumber, TypeObject } from './Utils.mjs';

const { freeze, hasOwn, isFrozen, keys } = Object;

export const isRealNumber = any => TypeNumber(any) && !isNaN(any) && isFinite(any);

export const assertRealNumber = any => {
	if (!isRealNumber(any)) {
		throwError('Invalid number, one numeric expected.');
	}
};

const SPEC_LIST = [{
	test: any => TypeObject(any) && isFrozen(any),
	message: 'It SHOULD be a frozen object.',
}, {
	test: any => keys(any).length === 2 && hasOwn(any, 'number') && hasOwn(any, 'inclusive'),
	message: 'There SHOLD be only 2 properties: `.number`, `.inclusive`.',
}, {
	test: any => isRealNumber(any.number),
	message: 'The `.number` MUST be a numeric.',
}, {
	test: any => TypeBoolean(any.inclusive),
	message: 'The `.inclusive` MUST be a boolean.',
}];

export const isBoundary = any => {
	if (any === INFINITY.POSITIVE) {
		return true;
	}

	if (any === INFINITY.NEGATIVE) {
		return true;
	}

	return SPEC_LIST.every(spec => spec.test(any));
};

export const isLikeBoundary = any => isRealNumber(any) || isBoundary(any);

export const assertBoundary = any => {
	for (const sign in INFINITY) {
		if (any === INFINITY[sign]) {
			return;
		}
	}

	for (const spec of SPEC_LIST) {
		if (!spec.test(any)) {
			throwError(spec.message);
		}
	}
};

const Boundary = (number, inclusive) => freeze({ number, inclusive });
const _Inclusive = number => Boundary(number, true);
const _Exclusive = number => Boundary(number, false);

export const INFINITY = freeze({
	POSITIVE: _Exclusive(Infinity),
	NEGATIVE: _Exclusive(-Infinity),
});

const Constructor = native => number => {
	assertRealNumber(number);

	return native(number);
};

export const Inclusive = Constructor(_Inclusive);
export const Exclusive = Constructor(_Exclusive);
export { Inclusive as I, Exclusive as E };

export const normalize = _boundary => {
	if (TypeObject(_boundary)) {
		assertBoundary(_boundary);
	} else {
		assertRealNumber(_boundary);
	}

	return isBoundary(_boundary) ? _boundary : Exclusive(_boundary);
};
