export const isYesterdayOrMore = (date: Date) => {
	const dateNow = new Date();
	dateNow.setHours(0, 0, 0, 0);

	if (date < dateNow) {
		return true;
	}

	return false;
};

export const calculateManyDays = (date1: Date, date2: Date): number => {
	const differenceMs = date2.getTime() - date1.getTime();
	return Math.floor(differenceMs / (1000 * 60 * 60 * 24));
};
