<script lang="ts">
	import Poolrow from '$lib/Poolrow.svelte';
	import Menubar from '$lib/Menubar.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_SQL_URL, PUBLIC_API_URL } from '$env/static/public';
	import * as pool from '$lib/pool';

	import type { PageData } from './$types';

	//export let data;
	let pools = [];
	let pools_count = '...';
	let usdc_reserves;
	let loading = true;

	onMount(async () => {
		pools = await pool.pools_load();
		pools_count = await pool.pools_count_load();
		usdc_reserves = pool.reserves('');
		loading = false;
	});
</script>

<div id="page">
	<Menubar page_name="{pools_count} Uniswap v2 pools" />

	{#if loading}
		Loading...
	{:else}
		Top {pools.length} Uniswap v2 pools by 24 hour volume
		{#each pools as pool}
			<Poolrow {pool} />
		{/each}
	{/if}
</div>
