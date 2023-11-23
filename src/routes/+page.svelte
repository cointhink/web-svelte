<script lang="ts">
	import Poolrow from '$lib/Poolrow.svelte';
	import Menubar from '$lib/Menubar.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_SQL_URL, PUBLIC_API_URL } from '$env/static/public';

	import type { PageData } from './$types';

	//export let data;
	let pools = [];
	let pools_count = '...';
	let loading = true;

	onMount(async () => {
		pools = await pools_load();
		pools_count = await pools_count_load();
		loading = false;
	});

	async function pools_load() {
		const url = PUBLIC_API_URL + '/pools/top';
		const pools = await fetch(url).then((ps) => ps.json());
		return pools;
	}

	async function pools_count_load() {
		const url = PUBLIC_SQL_URL + '/pools';
		const resp = await fetch(url, { method: 'HEAD' });
		const range = resp.headers.get('content-range');
		return range.split('/')[0].split('-')[1];
	}
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
