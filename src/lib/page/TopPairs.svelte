<script lang="ts">
	import { onMount } from 'svelte';
	import Menubar from '$lib/Menubar.svelte';
	import PoolPairName from '$lib/PoolPairName.svelte';
	import PoolPairReserve from '$lib/PoolPairReserve.svelte';
	import PoolPriceWithSymbol from '$lib/PoolPriceWithSymbol.svelte';
	import * as pool from '$lib/pool';
	import * as uniswap from '$lib/uniswap-v2';

	export let lastBlock;
	export let since;
	let pool_pairs = [];
	let loading = true;
	let tokens = {};

	onMount(async () => {
		pool_pairs = await pool.pools_top_pairs(since);
		for (let idx = 0; idx < pool_pairs.length; idx++) {
			pool_pairs[idx].optimal_dy = uniswap.optimal_y_in(
				pool_pairs[idx][3].x,
				pool_pairs[idx][4].x,
				pool_pairs[idx][3].y,
				pool_pairs[idx][4].y
			);

			pool_pairs[idx].mid_dx_r0 = uniswap.get_y_out(
				pool_pairs[idx].optimal_dy[0],
				pool_pairs[idx][3].y,
				pool_pairs[idx][3].x
			);
			pool_pairs[idx].mid_dx_r1 = uniswap.get_y_out(
				pool_pairs[idx].optimal_dy[1],
				pool_pairs[idx][3].y,
				pool_pairs[idx][3].x
			);

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
			({pool_pair[3].block_number}
			{(((lastBlock.number - pool_pair[3].block_number) * 12) / 60).toFixed(1)} min old) price: <PoolPriceWithSymbol
				{tokens}
				pool={pool_pair[0]}
				reserves={pool_pair[3]}
			/>
		</div>
		<div>
			<a href="/pool/{pool_pair[1].contract_address}">
				<PoolPairName {tokens} pool={pool_pair[1]} />
			</a>
			<PoolPairReserve {tokens} token={pool_pair[1].token0} reserve={pool_pair[4].x} />
			<PoolPairReserve {tokens} token={pool_pair[1].token1} reserve={pool_pair[4].y} />
			({pool_pair[3].block_number}
			{(((lastBlock.number - pool_pair[4].block_number) * 12) / 60).toFixed(1)} min old) price: <PoolPriceWithSymbol
				{tokens}
				pool={pool_pair[1]}
				reserves={pool_pair[4]}
			/>
		</div>

		{#if pool_pair.optimal_dy}
			<div>
				root1: Sell <PoolPairReserve
					{tokens}
					token={pool_pair[1].token1}
					reserve={pool_pair.optimal_dy[0]}
				/>
				mid-step-price <PoolPairReserve
					{tokens}
					token={pool_pair[0].token0}
					reserve={pool_pair.mid_dx_r0}
				/>
			</div>
			<div>
				root2: Sell <PoolPairReserve
					{tokens}
					token={pool_pair[1].token1}
					reserve={pool_pair.optimal_dy[1]}
				/>
				mid-step-price <PoolPairReserve
					{tokens}
					token={pool_pair[0].token1}
					reserve={pool_pair.mid_dx_r1}
				/>
			</div>
		{/if}
	</div>
{/each}
