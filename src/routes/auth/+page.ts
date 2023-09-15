import type { PageLoad } from './$types';

export const load = async ({ fetch, params, url }) => {
	const token = url.searchParams.get('token');
	const auth_url = 'https://cointhink.com/api/auth/' + token;

	return await fetch(auth_url).then((ps) => {
		if (ps.status == 200) {
			cookies.set('token', token, { path: '/' });
		}
		return { status: ps.status, response: ps.json() };
	});
};
