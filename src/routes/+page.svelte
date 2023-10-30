<script lang="ts">
	import Poolrow from '$lib/Poolrow.svelte';
	import Menubar from '$lib/Menubar.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_SQL_URL } from '$env/static/public';

	import type { PageData } from './$types';

	//export let data;
	let pools = [];
	let loading = true;

	onMount(async () => {
		pools = await moar(pools);
		loading = false;
	});

	async function moar(pools) {
		const url = PUBLIC_SQL_URL + '/pools?limit=5';
		console.log(url);
		pools = await fetch(url).then((ps) => ps.json());
		return pools;
	}
</script>

<div id="page">
	<Menubar page_name="liquidity pools" />

	{#if loading}
		Loading...
	{:else}
		{pools.length} pools Uniswap V2
		{#each pools as pool}
			<Poolrow {pool} />
		{/each}
	{/if}
</div>
