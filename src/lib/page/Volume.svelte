<script lang="ts">
	import Menubar from '$lib/Menubar.svelte';
	import { onMount } from 'svelte';
	import Poolrow from '$lib/Poolrow.svelte';
	import * as pool from '$lib/pool';

	export let since;
	let loading = true;

	let pools = [];
	let pools_count = '...';
	let usdc_rate;
	let usdc_rate_str = '...';

	onMount(async () => {
		pools = await pool.pools_load(since);
		pools_count = await pool.pools_count_load();
		let usdc_reserves = await pool.reserves('b4e16d0168e52d35cacd2c6185b44281ec28c9dc');
		usdc_rate = usdc_reserves.x / 10 ** 6 / (usdc_reserves.y / 10 ** 18);
		usdc_rate_str = usdc_rate.toFixed(2);
		loading = false;
	});
</script>

<Menubar page_name="{pools_count} Uniswap v2 pools | 1 eth ${usdc_rate_str}" />

{#if loading}
	<div class="loading">Loading...</div>
{:else}
	<div id="title">
		Top {pools.length} Uniswap v2 pools by fee revenue (0.3% of volume) over the last {since}
		hour{since > 1 ? 's' : ''}
	</div>
	{#each pools as pool}
		<Poolrow {pool} {usdc_rate} />
	{/each}
{/if}

<style>
	#title {
		padding: 0.5em 0;
	}
	.loading {
		padding: 1em 0;
	}
</style>
