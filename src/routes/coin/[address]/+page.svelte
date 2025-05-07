<script>
	import Menubar from '$lib/Menubar.svelte';
	import PoolPrice from '$lib/PoolPrice.svelte';
	import * as poollib from '$lib/pool';
	import { onMount } from 'svelte';
	import { PUBLIC_SQL_URL } from '$env/static/public';

	export let data;

	let pools = [];
	let markets = [];
	let token = {};
	let tokens = {};
	let loading = true;

	onMount(async () => {
		token = await poollib.coin(data.params.address);
		tokens[data.params.address] = token;
		pools = await poollib.pools_for(data.params.address);
		loading = false;
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

<div class="bigname">
	{token.name}
	({token.symbol})
</div>

<div>
	{#if loading}
		loading markets for this coin...
	{:else}
		{pools.length} Markets
	{/if}
	{#each pools as pool}
		<div class="numbers">
			{#if pool.reserves}
				{tokens[pool.token0].symbol}/{tokens[pool.token1].symbol}
			{/if}
			0x{pool.contract_address}
			{#if pool.reserves}
				<span class="bigger">
					{#if pool.token1 == data.params.address}
						<PoolPrice
							reserves_x={pool.reserves.y}
							reserves_y={pool.reserves.x}
							token_x={tokens[pool.token0]}
							token_y={tokens[pool.token1]}
						/>
					{:else}
						<PoolPrice
							reserves_x={pool.reserves.x}
							reserves_y={pool.reserves.y}
							token_x={tokens[pool.token1]}
							token_y={tokens[pool.token0]}
						/>
					{/if}
					inventory:
					{pool.reserves.x / 10 ** tokens[pool.token0].decimals}
					{tokens[pool.token0].symbol}
					{pool.reserves.y / 10 ** tokens[pool.token1].decimals}
					{tokens[pool.token1].symbol}
				</span>
			{/if}
		</div>
	{/each}
</div>

<style>
	.numbers {
		font-family: monospace;
	}
	.bigger {
		font-size: 110%;
	}
	.bigname {
		margin: 0.5em 0;
	}
</style>
