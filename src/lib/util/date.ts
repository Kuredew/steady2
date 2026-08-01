export const isYesterdayOrMore = (date: Date) => {
	const dateNow = new Date();
	dateNow.setHours(0, 0, 0, 0);

	if (date < dateNow) {
		return true;
	}

	return false;
};
