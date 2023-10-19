export function numDec(num, dec) {
	let value = num / 10 ** dec;
	return value.toFixed(dec);
}
