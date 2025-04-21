<script>
	import Menubar from '$lib/Menubar.svelte';
	import * as poollib from '$lib/pool';
	import { onMount } from 'svelte';
	import { PUBLIC_SQL_URL } from '$env/static/public';

	export let data;

	let pools = [];
	let markets = [];
	let token = {};
	let tokens = {};

	onMount(async () => {
		token = await poollib.coin(data.params.address);
		tokens[data.params.address] = token;
		pools = await poollib.pools_for(data.params.address);
		for (let idx = 0; idx < pools.length; idx++) {
			tokens[pools[idx].token0] ||= await poollib.coin(pools[idx].token0);
			tokens[pools[idx].token1] ||= await poollib.coin(pools[idx].token1);
			pools[idx].reserves = await poollib.reserves(pools[idx].contract_address);
		}
	});
</script>

<div id="page">
	<Menubar page_name="Coin 0x{data.params.address}" />
</div>

<div>
	{token.name}
	({token.symbol})
</div>

<div>
	{pools.length} Markets
	{#each pools as pool}
		<div class="numbers">
			0x{pool.contract_address}
			{#if pool.reserves}
				{#if pool.token1 == data.params.address}
					{pool.reserves.x /
						pool.reserves.y /
						10 ** (tokens[pool.token1].decimals - tokens[pool.token0].decimals)}
					{tokens[pool.token0].symbol}
				{:else}
					{pool.reserves.y /
						pool.reserves.x /
						10 ** (tokens[pool.token1].decimals - tokens[pool.token0].decimals)}
					{tokens[pool.token1].symbol}
				{/if}
			{/if}
		</div>
	{/each}
</div>

<style>
	.numbers {
		font-family: monospace;
		font-size: 110%;
	}
</style>
