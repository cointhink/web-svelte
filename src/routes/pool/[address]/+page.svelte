<script>
	import Menubar from '$lib/Menubar.svelte';
	import { pool_extra, block, latestBlock } from '$lib/pool';
	import * as util from '$lib/util';
	import { onMount } from 'svelte';
	import { PUBLIC_SQL_URL } from '$env/static/public';
	import date from 'date-and-time';

	export let data;

	let logs = [];
	let pool = {};
	let token0 = { decimals: 0 };
	let token1 = { decimals: 0 };
	let volume0 = 0;
	let volume1 = 0;
	let lastBlock = { datestr: '' };
	let startBlock = { datestr: '' };

	onMount(async () => {
		lastBlock = await latestBlock();
		lastBlock.datestr = date.format(lastBlock.date, 'YYYY-MM-DD HH:mm:ss');
		let startBlockNumber = lastBlock.number - 24 * 60 * (60 / 12);
		startBlock = await block(startBlockNumber);
		startBlock.datestr = date.format(startBlock.date, 'YYYY-MM-DD HH:mm:ss');
		logs = await filtered_logs(data.params.address, startBlockNumber, lastBlock.number);
		for (const log of logs) {
			volume1 += log.in1;
			volume0 += log.in0;
		}
		const url2 = PUBLIC_SQL_URL + '/pools?contract_address=eq.' + data.params.address;
		pool = (await fetch(url2).then((ps) => ps.json()))[0];
		await pool_extra(pool);
		token0 = pool.token0;
		token1 = pool.token1;
	});

	async function filtered_logs(address, start_number, stop_number) {
		const topic_swap = 'd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822';
		const url1 =
			PUBLIC_SQL_URL +
			'/logs?address=eq.' +
			address +
			'&topic0=eq.' +
			topic_swap +
			'&block_number=gt.' +
			start_number +
			'&block_number=lt.' +
			stop_number +
			'&order=block_number.desc';
		let logs = await fetch(url1).then((ps) => ps.json());
		for (const log of logs) {
			let dparts = log.data.match(/.{1,64}/g);
			log.in0 = parseInt(dparts[0], 16);
			log.in1 = parseInt(dparts[1], 16);
			log.out0 = parseInt(dparts[2], 16);
			log.out1 = parseInt(dparts[3], 16);
		}
		return logs;
	}
</script>

<div id="page">
	<Menubar page_name="Pool 0x{data.params.address}" />
</div>

<div>
	{token0.name}({token0.symbol})/{token1.name}({token1.symbol})
</div>

<div>
	{logs.length} logs for blocks #{startBlock.number}
	({startBlock.datestr}) - #{lastBlock.number}
	({lastBlock.datestr})
</div>

<div>
	24 hours volume:
	{util.numDec(volume0, token0.decimals)}
	{token0.symbol}
	{util.numDec(volume1, token1.decimals)}
	{token1.symbol}
</div>

<div>
	fees earned:
	{util.numDec(volume0 * 0.003, token0.decimals)}
	{token0.symbol}
	{util.numDec(volume1 * 0.003, token1.decimals)}
	{token1.symbol}
</div>

{#each logs as log}
	<div class="pool_tx">
		#{log.block_number}
		{#if log.in0 == 0}
			{util.numDec(log.out0, token0.decimals)}
			{token0.symbol} &lt;-
			{util.numDec(log.in1, token1.decimals)}
			{token1.symbol}
		{:else}
			{util.numDec(log.in0, token0.decimals)}
			{token0.symbol} -&gt;
			{util.numDec(log.out1, token1.decimals)}
			{token1.symbol}
		{/if}
	</div>
{/each}

<style>
	.pool_tx {
		font-family: monospace;
	}
</style>
