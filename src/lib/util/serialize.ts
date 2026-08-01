export const serializeNonPOJOs = <T>(value: T): T => {
	return structuredClone(value);
};
