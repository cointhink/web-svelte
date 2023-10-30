<script>
	import Menubar from '$lib/Menubar.svelte';
	import { moar } from '$lib/pool';
	import { numDec } from '$lib/util';
	import { onMount } from 'svelte';
	import { PUBLIC_SQL_URL } from '$env/static/public';

	export let data;

	let logs = [];
	let pool = {};
	let token0 = { decimals: 0 };
	let token1 = { decimals: 0 };

	onMount(async () => {
		const topic_swap = 'd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822';
		const url1 =
			PUBLIC_SQL_URL + '/logs?address=eq.' + data.params.address + '&topic0=eq.' + topic_swap;
		logs = await fetch(url1).then((ps) => ps.json());
		for (const log of logs) {
			let dparts = log.data.match(/.{1,64}/g);
			log.in0 = parseInt(dparts[0], 16);
			log.in1 = parseInt(dparts[1], 16);
			log.out0 = parseInt(dparts[2], 16);
			log.out1 = parseInt(dparts[3], 16);
		}
		const url2 = PUBLIC_SQL_URL + '/pools?contract_address=eq.' + data.params.address;
		let pools = await fetch(url2).then((ps) => ps.json());
		pool = pools[0];
		await moar(pool);
		token0 = pool.token0;
		token1 = pool.token1;
	});
</script>

<div id="page">
	<Menubar page_name="pool" />
</div>

<div>
	{token0.name}/{token1.name}
	{data.params.address}
</div>

<div>
	{logs.length} logs
</div>

{#each logs as log}
	<div class="pool_tx">
		{#if log.in0 == 0}
			{numDec(log.out0, token0.decimals)}
			{token0.name} &lt;-
			{numDec(log.in1, token1.decimals)}
			{token1.name}
		{:else}
			{numDec(log.in0, token0.decimals)}
			{token0.name} -&gt;
			{numDec(log.out1, token1.decimals)}
			{token1.name}
		{/if}
	</div>
{/each}

<style>
	.pool_tx {
		font-family: monospace;
	}
</style>
