import type { PageLoad } from './$types';
import { browser } from "$app/environment";

console.log('browser', browser)

export const load = async ({ fetch, params, url }) => {
	console.log('load url', url)
	const token = url.location
	
	const auth_url = 'https://cointhink.com/api/auth/' + token;

	return await fetch(auth_url).then((ps) => ({ status: ps.status, response: ps.json() }));
};
