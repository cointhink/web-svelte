import type { PageLoad } from './$types';
import { browser } from '$app/environment';

export const load = async ({ fetch, params, url }) => {
	return { params };
};
