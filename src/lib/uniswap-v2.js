const POOL_FEE = 0.03;

export function optimal_in(Xa, Xb, Ya, Yb) {
	const k = (1 - POOL_FEE) * Xb + Math.pow(1 - POOL_FEE, 2) * Xa;
	const a = Math.pow(k, 2);
	const b = 2 * k * Ya * Xb;
	const c = Math.pow(Ya * Xb, 2) - Math.pow(1 - POOL_FEE, 2) * Xa * Xb * Ya * Yb;
	return quadratic_real_roots(a, b, c);
}

function quadratic_real_roots(a, b, c) {
	const D = b * b - 4 * a * c;
	if (D > 0) {
		const root1 = (-b + Math.sqrt(D)) / (2 * a);
		const root2 = (-b - Math.sqrt(D)) / (2 * a);
		return [root1, root2];
	}
}
