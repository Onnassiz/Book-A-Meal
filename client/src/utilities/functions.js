
export const hasError = (errors, field) => {
	let fieldHasError = false;
	errors.forEach((item) => {
		const key = Object.keys(item)[0];
		if (key === field) {
			fieldHasError = true;
		}
	});
	return fieldHasError;
};

export const doSome = () => true;
