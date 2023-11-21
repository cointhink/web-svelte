import { PUBLIC_SQL_URL } from '$env/static/public';

export async function pool_extra(pool) {
	const url =
		PUBLIC_SQL_URL +
		'/reserves?contract_address=eq.' +
		pool.contract_address +
		'&order=block_number.desc&limit=1';
	pool.reserves = await fetch(url).then((ps) => ps.json());
	const url2 = PUBLIC_SQL_URL + '/coins?contract_address=eq.' + pool.token0;
	pool.token0 = (await fetch(url2).then((ps) => ps.json()))[0];
	const url3 = PUBLIC_SQL_URL + '/coins?contract_address=eq.' + pool.token1;
	pool.token1 = (await fetch(url3).then((ps) => ps.json()))[0];
}

export async function latestBlock() {
	const url = PUBLIC_SQL_URL + '/blocks?order=number.desc&limit=1';
	let block = (await fetch(url).then((ps) => ps.json()))[0];
	block.date = new Date(block.timestamp * 1000);
	return block;
}

export async function block(number) {
	const url = PUBLIC_SQL_URL + '/blocks?number=eq.' + number;
	let block = (await fetch(url).then((ps) => ps.json()))[0];
	block.date = new Date(block.timestamp * 1000);
	return block;
}
