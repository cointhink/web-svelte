import { PUBLIC_SQL_URL } from '$env/static/public';

export async function moar(pool) {
	const url = PUBLIC_SQL_URL + '/reserves?contract_address=eq.' + pool.contract_address;
	pool.reserves = await fetch(url).then((ps) => ps.json());
	const url2 = PUBLIC_SQL_URL + '/coins?contract_address=eq.' + pool.token0;
	pool.token0 = (await fetch(url2).then((ps) => ps.json()))[0];
	const url3 = PUBLIC_SQL_URL + '/coins?contract_address=eq.' + pool.token1;
	pool.token1 = (await fetch(url3).then((ps) => ps.json()))[0];
}
