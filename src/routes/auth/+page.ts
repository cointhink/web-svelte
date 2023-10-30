import type { PageLoad } from './$types';
import { browser } from '$app/environment';

export const load = async ({ fetch, params, url }) => {
	if (browser) {
		const token = url.searchParams.get('token');
		const auth_url = PUBLIC_AUTH_URL + '/auth/' + token;
		console.log(auth_url);
		const id = await fetch(auth_url).then(async (ps) => ({
			status: ps.status,
			response: await ps.json()
		}));
		return { token: token, id: id };
	}
};
