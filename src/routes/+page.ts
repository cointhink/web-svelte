import type { PageLoad } from './$types';

export const load = async ({ fetch, params }) => {
	const url = 'https://cointhink.com/sql/pools';
	const pools = await fetch(url).then((ps) => ps.json());
	for (const pool of pools) {
		const url = 'https://cointhink.com/sql/reserves?contract_address=eq.' + pool.contract_address;
		pool.reserves = await fetch(url).then((ps) => ps.json());
		const url2 = 'https://cointhink.com/sql/coins?contract_address=eq.' + pool.token0;
		pool.token0 = (await fetch(url2).then((ps) => ps.json()))[0];
		const url3 = 'https://cointhink.com/sql/coins?contract_address=eq.' + pool.token1;
		pool.token1 = (await fetch(url3).then((ps) => ps.json()))[0];
	}
	return { pools: pools };
};
