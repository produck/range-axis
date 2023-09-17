export const throwError = message => {
	throw new TypeError(message);
};

const TypeOf = (any, name) => typeof any === name;

export const TypeNumber = any => TypeOf(any, 'number');
export const InstanceOf = (any, Constructor) => any instanceof Constructor;
