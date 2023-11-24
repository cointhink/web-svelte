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
	let loading = true;

	onMount(async () => {
		pools = await pool.pools_load();
		pools_count = await pool.pools_count_load();
		let usdc_reserves = await pool.reserves('b4e16d0168e52d35cacd2c6185b44281ec28c9dc');
		usdc_rate = usdc_reserves.x / 10 ** 6 / (usdc_reserves.y / 10 ** 18);
		loading = false;
	});
</script>

<div id="page">
	<Menubar page_name="{pools_count} Uniswap v2 pools" />

	{#if loading}
		Loading...
	{:else}
		Top {pools.length} Uniswap v2 pools by 24 hour fee revenue/volume
		{#each pools as pool}
			<Poolrow {pool} {usdc_rate} />
		{/each}
	{/if}
</div>
