export function MATCHED(spec) {
	return spec(this);
}

export const throwError = message => {
	throw new TypeError(message);
};
