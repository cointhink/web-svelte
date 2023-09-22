<script lang="ts">
	import Poolrow from '$lib/Poolrow.svelte';
	import Menubar from '$lib/Menubar.svelte';
	import { onMount } from 'svelte';

	import type { PageData } from './$types';

	//export let data;
	let pools = [];
	let loading = true;

	onMount(async () => {
		pools = await moar(pools);
		loading = false;
	});

	async function moar(pools) {
		const url = 'https://cointhink.com/sql/pools?limit=10';
		console.log(url);
		pools = await fetch(url).then((ps) => ps.json());
		return pools;
	}
	async function poolmoar(pool) {
		const url = 'https://cointhink.com/sql/reserves?contract_address=eq.' + pool.contract_address;
		pool.reserves = await fetch(url).then((ps) => ps.json());
		const url2 = 'https://cointhink.com/sql/coins?contract_address=eq.' + pool.token0;
		pool.token0 = (await fetch(url2).then((ps) => ps.json()))[0];
		const url3 = 'https://cointhink.com/sql/coins?contract_address=eq.' + pool.token1;
		pool.token1 = (await fetch(url3).then((ps) => ps.json()))[0];
		console.log('updated pool', pool);
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
