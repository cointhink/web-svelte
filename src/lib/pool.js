import { PUBLIC_SQL_URL, PUBLIC_API_URL } from '$env/static/public';

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
