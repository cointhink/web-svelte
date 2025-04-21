<script>
	import Menubar from '$lib/Menubar.svelte';
	import * as poollib from '$lib/pool';
	import { onMount } from 'svelte';
	import { PUBLIC_SQL_URL } from '$env/static/public';

	export let data;

	let pools = [];
	let markets = [];
	let token = {};

	onMount(async () => {
		token = await poollib.coin(data.params.address);
		pools = await poollib.pools_for(data.params.address);
		for (let idx = 0; idx < pools.length; idx++) {
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
	Markets
	{#each pools as pool}
		<div>
			{pool.contract_address}
			{#if pool.reserves}
				{pool.reserves.x / pool.reserves.y}
			{/if}
		</div>
	{/each}
</div>
