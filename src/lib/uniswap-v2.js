const POOL_FEE = 0.003;

export function optimal_ay_in(Xa, Ya, Xb, Yb) {
	const k = (1 - POOL_FEE) * Xb + Math.pow(1 - POOL_FEE, 2) * Xa;
	const a = Math.pow(k, 2);
	const b = 2 * k * Ya * Xb;
	const c = Math.pow(Ya * Xb, 2) - Math.pow(1 - POOL_FEE, 2) * Xa * Xb * Ya * Yb;
	return quadratic_real_roots(a, b, c);
}

function quadratic_real_roots(a, b, c) {
	const D = b * b - 4 * a * c;
	if (D > 0) {
		return (-b + Math.sqrt(D)) / (2 * a);
	}
}

export function get_y_out(dX, x, y) {
	return (997 * dX * y) / (1000 * x + 997 * dX);
}

export function get_x_in(dY, x, y) {
	return (1000 * x * dY) / (997 * (y - dY)) + 1;
}
