import type { PageLoad } from './$types';
import { browser } from '$app/environment';

export const load = async ({ fetch, params, url }) => {
	if (browser) {
		const params = url.searchParams;
		const token = params.get('token');
		if (token) {
			const auth_url = 'https://cointhink.com/api/auth/' + token;
			return await fetch(auth_url).then((ps) => ({ status: ps.status, response: ps.json() }));
		}
	}
};
