import { PUBLIC_SQL_URL, PUBLIC_API_URL } from '$env/static/public';
import Generatorics from 'generatorics';

export async function pools_for(token_contract_address) {
	const url = PUBLIC_API_URL + '/pools/for?token_contract_address=' + token_contract_address;
	const pools = await fetch(url).then((ps) => ps.json());
	return pools;
}

export async function pools_load(hours) {
	const url = PUBLIC_API_URL + '/pools/top?since=' + hours;
	const pools = await fetch(url).then((ps) => ps.json());
	return pools;
}

export async function pools_count_load() {
	const url = PUBLIC_SQL_URL + '/pools';
	const resp = await fetch(url, { method: 'HEAD' });
	const range = resp.headers.get('content-range');
	return range.split('/')[0].split('-')[1];
}

export async function reserves(contract_address) {
	const url =
		PUBLIC_SQL_URL +
		'/reserves?contract_address=eq.' +
		contract_address +
		'&order=block_number.desc&limit=1';
	return (await fetch(url).then((ps) => ps.json()))[0];
}

export async function pool(contract_address) {
	const url2 = PUBLIC_SQL_URL + '/pools?contract_address=eq.' + contract_address;
	return (await fetch(url2).then((ps) => ps.json()))[0];
}

export async function coin(contract_address) {
	const url2 = PUBLIC_SQL_URL + '/coins?contract_address=eq.' + contract_address;
	return (await fetch(url2).then((ps) => ps.json()))[0];
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

export function group_by(pools, coin_address) {
	let new_pools = pools.reduce((groups, pool) => {
		let token;
		if (pool.token0 == coin_address) {
			token = pool.token1;
		} else {
			token = pool.token0;
		}
		if (!groups[token]) {
			groups[token] = [];
		}
		groups[token].push(pool);
		return groups;
	}, {});
	for (let idx = 0; idx < new_pools.length; idx++) {
		new_pools[idx] = pool.toSorted((a, b) => price());
	}
	return new_pools;
}

export function price(reserves_x, decimals_x, reserves_y, decimals_y) {
	return reserves_y / reserves_x / 10 ** (decimals_x - decimals_y);
}

export function compare_prices(pools) {
	for (let pair of Generatorics.combination(pools)) {
	}
}
