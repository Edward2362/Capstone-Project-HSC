export const capitalizeFirstLetter = (str: string | undefined) => {
	let splitted;
	if (str !== undefined) {
		splitted = str.split("");
		splitted[0] = splitted[0]?.toUpperCase();
		return splitted.join("");
	}
	return str;
};
