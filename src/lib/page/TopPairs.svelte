<script lang="ts">
	import { onMount } from 'svelte';
	import Menubar from '$lib/Menubar.svelte';
	import PoolPairName from '$lib/PoolPairName.svelte';
	import PoolPairReserve from '$lib/PoolPairReserve.svelte';
	import PoolPriceWithSymbol from '$lib/PoolPriceWithSymbol.svelte';
	import BlockNumber from '$lib/BlockNumber.svelte';
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
			console.log(
				pool_pairs[idx][3].x,
				pool_pairs[idx][3].y,
				pool_pairs[idx][4].x,
				pool_pairs[idx][4].y
			);
			pool_pairs[idx].optimal_ady = uniswap.optimal_ay_in(
				pool_pairs[idx][3].x,
				pool_pairs[idx][3].y,
				pool_pairs[idx][4].x,
				pool_pairs[idx][4].y
			);

			pool_pairs[idx].s1_adx = uniswap.get_y_out(
				pool_pairs[idx].optimal_ady,
				pool_pairs[idx][3].y,
				pool_pairs[idx][3].x
			);
			pool_pairs[idx].s2_ady = uniswap.get_y_out(
				pool_pairs[idx].s1_adx,
				pool_pairs[idx][4].x,
				pool_pairs[idx][4].y
			);
			pool_pairs[idx].mid_ax = pool_pairs[idx][3].x - pool_pairs[idx].s1_adx;
			pool_pairs[idx].mid_ay = parseInt(pool_pairs[idx][3].y) + pool_pairs[idx].optimal_ady;
			pool_pairs[idx].trade_price = pool_pairs[idx].s1_adx / pool_pairs[idx].optimal_ady;

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
	<ul>
		<div>
			<a href="/pool/{pool_pair[0].contract_address}">
				<PoolPairName {tokens} pool={pool_pair[0]} />
			</a>
			<span>
				<PoolPriceWithSymbol {tokens} pool={pool_pair[0]} reserves={pool_pair[3]} />
			</span>
			inventory:
			<PoolPairReserve {tokens} token={pool_pair[0].token0} reserve={pool_pair[3].x} />
			<PoolPairReserve {tokens} token={pool_pair[0].token1} reserve={pool_pair[3].y} />
			(<BlockNumber last_block={lastBlock} block_number={pool_pair[3].block_number} />)
		</div>
		<div>
			<a href="/pool/{pool_pair[1].contract_address}">
				<PoolPairName {tokens} pool={pool_pair[1]} />
			</a>
			<span>
				<PoolPriceWithSymbol {tokens} pool={pool_pair[1]} reserves={pool_pair[4]} />
			</span>
			inventory:
			<PoolPairReserve {tokens} token={pool_pair[1].token0} reserve={pool_pair[4].x} />
			<PoolPairReserve {tokens} token={pool_pair[1].token1} reserve={pool_pair[4].y} />
			(<BlockNumber last_block={lastBlock} block_number={pool_pair[4].block_number} />)
		</div>

		{#if pool_pair.mid_ax}
			<div>
				Trade 1 in: <PoolPairReserve
					{tokens}
					token={pool_pair[0].token1}
					reserve={pool_pair.optimal_ady}
				/>
				(mid-step price: <PoolPriceWithSymbol
					{tokens}
					pool={pool_pair[0]}
					reserves={{ x: pool_pair.mid_ax, y: pool_pair.mid_ay }}
				/>) Trade 2 out: <PoolPairReserve
					{tokens}
					token={pool_pair[0].token1}
					reserve={pool_pair.s2_ady}
				/>
				Profit:
				<PoolPairReserve
					{tokens}
					token={pool_pair[0].token1}
					reserve={pool_pair.s2_ady - pool_pair.optimal_ady}
				/>
			</div>
		{/if}
	</ul>
{/each}
