import type { PageLoad } from './$types';
import { browser } from '$app/environment';

export const load = async ({ fetch, params, url }) => {
	let answer = { logs: [], params };
	if (browser) {
		const url = 'https://cointhink.com/sql/logs?address=eq.' + params.address;
		answer.logs = await fetch(url).then((ps) => ps.json());
	}
	return answer;
};
