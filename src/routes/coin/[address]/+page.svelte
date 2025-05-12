<script>
	import Menubar from '$lib/Menubar.svelte';
	import PoolPrice from '$lib/PoolPrice.svelte';
	import PoolInventory from '$lib/PoolInventory.svelte';
	import * as poollib from '$lib/pool';
	import { onMount } from 'svelte';
	import { PUBLIC_SQL_URL } from '$env/static/public';

	export let data;

	let pools = [];
	let token = {};
	let tokens = {};
	let groups = {};
	let loading = true;

	onMount(async () => {
		token = await poollib.coin(data.params.address);
		tokens[data.params.address] = token;
		pools = await poollib.pools_for(data.params.address);
		loading = false;

		groups = poollib.group_by(pools, data.params.address);
		for (let idx = 0; idx < pools.length; idx++) {
			// fetch and cache token details
			tokens[pools[idx].token0] ||= await poollib.coin(pools[idx].token0);
			tokens[pools[idx].token1] ||= await poollib.coin(pools[idx].token1);
			// fetch reserves
			pools[idx].reserves = await poollib.reserves(pools[idx].contract_address);
		}
		// reactivity hack for the last row to render
		groups = { ...groups };
	});
</script>

<Menubar page_name="Coin 0x{data.params.address}" />

<div id="page">
	<div class="bigname">
		{#if loading}
			loading 0x{data.params.address}
		{:else if token}
			{token.name}
			({token.symbol})
		{:else}
			unknown coin 0x{data.params.address}
		{/if}
	</div>

	<div>
		{#if loading}
			loading markets for this coin...
		{:else}
			{pools.length} Markets
		{/if}
		{#each Object.entries(groups) as [target_address, pools]}
			{#each pools as pool}
				<div class="numbers">
					<a href="/pool/{pool.contract_address}">0x{pool.contract_address}</a>
					{#if pool.reserves}
						<span id="pool_pair">
							<a href="/coin/{pool.token0}">{tokens[pool.token0].symbol}</a>/<a
								href="/coin/{pool.token1}">{tokens[pool.token1].symbol}</a
							>
						</span>
					{/if}
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
							<PoolInventory reserves={pool.reserves.x} token={tokens[pool.token0]} />
							<PoolInventory reserves={pool.reserves.y} token={tokens[pool.token1]} />
						</span>
					{/if}
				</div>
			{/each}
		{/each}
	</div>
</div>

<style>
	#page a {
		text-decoration: none;
	}
	#pool_pair {
		width: 7em;
		display: inline-block;
	}
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
