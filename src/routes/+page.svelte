<script lang="ts">
	import Poolrow from '$lib/Poolrow.svelte';
	import Menubar from '$lib/Menubar.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_SQL_URL, PUBLIC_API_URL } from '$env/static/public';
	import * as pool from '$lib/pool';

	import type { PageData } from './$types';
	import { page } from '$app/stores';

	//export let data;
	let pools = [];
	let pools_count = '...';
	let usdc_rate;
	let usdc_rate_str = '...';
	let lastBlock;
	let loading = true;

	onMount(async () => {
		lastBlock = await pool.latestBlock();
		pools = await pool.pools_load();
		pools_count = await pool.pools_count_load();
		let usdc_reserves = await pool.reserves('b4e16d0168e52d35cacd2c6185b44281ec28c9dc');
		usdc_rate = usdc_reserves.x / 10 ** 6 / (usdc_reserves.y / 10 ** 18);
		usdc_rate_str = usdc_rate.toFixed(2);
		loading = false;
	});
</script>

<div id="page">
	<Menubar page_name="{pools_count} Uniswap v2 pools | 1 eth ${usdc_rate_str}" />

	{#if loading}
		Loading...
	{:else}
		<div id="title">
			Top {pools.length} Uniswap v2 pools by fee revenue (0.3% of volume)
		</div>
		{#each pools as pool}
			<Poolrow {pool} {usdc_rate} />
		{/each}
	{/if}
</div>

<div>
	{#if lastBlock}
		<div>
			synced to eth block #{lastBlock.number}
			{lastBlock.date}
		</div>
	{/if}
</div>

<style>
	#title {
		padding: 0.5em 0;
	}
</style>
