<script lang="ts">
	import { onMount } from 'svelte';
	import Menubar from '$lib/Menubar.svelte';
	import PoolPairName from '$lib/PoolPairName.svelte';
	import PoolPairReserve from '$lib/PoolPairReserve.svelte';
	import * as pool from '$lib/pool';

	export let since;
	let pool_pairs = [];
	let loading = true;
	let tokens = {};

	onMount(async () => {
		pool_pairs = await pool.pools_top_pairs(since);
		for (let idx = 0; idx < pool_pairs.length; idx++) {
			// fetch and cache token details
			tokens[pool_pairs[idx][0].token0] ||= await pool.coin(pool_pairs[idx][0].token0);
			tokens[pool_pairs[idx][0].token1] ||= await pool.coin(pool_pairs[idx][0].token1);
			tokens[pool_pairs[idx][1].token0] ||= await pool.coin(pool_pairs[idx][1].token0);
			tokens[pool_pairs[idx][1].token1] ||= await pool.coin(pool_pairs[idx][1].token1);
		}
		loading = false;
	});
</script>

<Menubar page_name="Top Uniswap Pool Pairs" />

{#if loading}
	loading...
{:else}
	<div>
		Top {pool_pairs.length} Uniswap Pool pairs
	</div>
{/if}

{#each pool_pairs as pool_pair}
	<div>
		<div>
			<a href="/pool/{pool_pair[0].contract_address}">
				<PoolPairName {tokens} pool={pool_pair[0]} />
			</a>
			<PoolPairReserve {tokens} token={pool_pair[0].token0} reserve={pool_pair[3].x} />
			<PoolPairReserve {tokens} token={pool_pair[0].token1} reserve={pool_pair[3].y} />
		</div>
		<div>
			<a href="/pool/{pool_pair[1].contract_address}">
				<PoolPairName {tokens} pool={pool_pair[1]} />
			</a>
			<PoolPairReserve {tokens} token={pool_pair[1].token0} reserve={pool_pair[4].x} />
			<PoolPairReserve {tokens} token={pool_pair[1].token1} reserve={pool_pair[4].y} />
		</div>
	</div>
{/each}
