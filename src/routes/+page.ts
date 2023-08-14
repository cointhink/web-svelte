import type { PageLoad } from './$types';

export const load = async ({ params }) => {
	const url = 'https://cointhink.com/sql/pools';
	const pools = await fetch(url).then((ps) => ps.json());
	for (const pool of pools) {
		const url = 'https://cointhink.com/sql/reserves?pool_index=eq.' + pool.index;
		pool.reserves = await fetch(url).then((ps) => ps.json());
	}
	return { pools: pools };
};
