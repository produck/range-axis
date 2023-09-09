export function MATCHED(spec) {
	return spec(this);
}

export const throwError = message => {
	throw new TypeError(message);
};

const TypeOf = (any, name) => typeof any === name;

export const TypeNumber = any => TypeOf(any, 'number');
export const TypeBoolean = any => TypeOf(any, 'boolean');
export const TypeObject = any => TypeOf(any, 'object');
