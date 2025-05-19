<script lang="ts">
	import { onMount } from 'svelte';
	import Menubar from '$lib/Menubar.svelte';
	import * as pool from '$lib/pool';

	export let since;
	let pools = [];
	let loading = true;

	onMount(async () => {
		pools = await pool.pools_top_pairs(since);
		loading = false;
	});
</script>

<Menubar page_name="Pool Value Pairs" />

{#if loading}
	loading...
{:else}
	{pools.length} Pool pairs
{/if}

{#each pools as pool}
	<div>
		<a href="/pool/{pool[0].contract_address}">
			{pool[0].token0.substr(0, 4)}/{pool[0].token1.substr(0, 4)}
		</a>
		<a href="/pool/{pool[1].contract_address}">
			{pool[1].token0.substr(0, 4)}/{pool[1].token1.substr(0, 4)}
		</a>
		rank: {pool[2].toFixed(4)}
	</div>
{/each}
