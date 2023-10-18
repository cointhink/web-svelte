import type { PageLoad } from './$types';
import { browser } from '$app/environment';

export const load = async ({ fetch, params, url }) => {
	let answer = { logs: [], params }; // placeholder for server-side build step
	if (browser) {
    // event Swap(
    //   address indexed sender,
    //   uint amount0In,
    //   uint amount1In,
    //   uint amount0Out,
    //   uint amount1Out,
    //   address indexed to ); 
		const topic_swap = 'd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822';
		const url = 'https://cointhink.com/sql/logs?address=eq.' + params.address +
			          '&topic0=eq.' + topic_swap;
		answer.logs = await fetch(url).then((ps) => ps.json());
	}
	return answer;
};
