
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

function addZ(n) {
	return n < 10 ? `0${n}` : n;
}

export function getDate(dateTime) {
	if (dateTime !== null) {
		const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const dateAndTimeCreated = new Date(Date.parse(dateTime));
		const getDay = days[dateAndTimeCreated.getDay()];
		const fetchDate = addZ(dateAndTimeCreated.getDate());
		const getMonth = months[dateAndTimeCreated.getMonth()];
		const getYear = dateAndTimeCreated.getFullYear();
		const timeCreated = `${addZ(dateAndTimeCreated.getHours() + 1)}:${addZ(dateAndTimeCreated.getMinutes())}`;
		return (`${getDay}, ${getMonth} ${fetchDate}, ${getYear} ${timeCreated}`);
	}
	return '----';
}

export const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
