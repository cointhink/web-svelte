<script lang="ts">
	import { onMount } from 'svelte';
	import * as util from '$lib/util';
	import D3Chart from './D3Chart.svelte';

	export let pool;
	export let usdc_rate;

	let loading = true;
	let x;
	let y;
	let flipped;
	let coin0;
	let coin1;
	let price;
	let price_usd;

	onMount(async () => {
		x = pool.reserve.x / 10 ** pool.coin0.decimals;
		y = pool.reserve.y / 10 ** pool.coin1.decimals;

		flipped = pool.coin0.symbol == 'WETH';
		flipstate();
		console.log('usdc', usdc_rate);
		console.log('pool', pool);

		loading = false;
	});

	function flip() {
		flipped = flipped ? false : true;
		flipstate();
	}

	function flipstate() {
		if (flipped) {
			coin0 = pool.coin1;
			coin1 = pool.coin0;
			price = util.decimal_display(x / y, 0, 4);
			price_usd = util.decimal_display((x / y) * usdc_rate, 0, 2);
		} else {
			coin0 = pool.coin0;
			coin1 = pool.coin1;
			price = util.decimal_display(y / x, 0, 4);
			price_usd = util.decimal_display((y / x) * usdc_rate, 0, 2);
		}
	}
</script>

{#if loading}
	<div>Loading..</div>
{:else}
	<div class="pools">
		<div id="pool_name">
			<div>
				<a href="/pool/{pool.contract_address}">
					{coin0.symbol}/{coin1.symbol}
				</a>
			</div>
		</div>
		<div id="pool_right_half">
			<div>
				24hr $1 LP revenue:
				<span>
					{util.decimal_display(
						pool.sum_eth * 0.003 * usdc_rate * (1 / 2 / pool.reserve.x + 1 / 2 / pool.reserve.y),
						18,
						2
					)} USD
				</span>
			</div>
			<div>
				24hr pool fee revenue:
				<span>
					{util.decimal_display(pool.sum_eth * 0.003 * usdc_rate, 18, 2)} USD
				</span>
				<span>
					({util.bigint_display(pool.sum_eth * 0.003, 18, 4)} ETH)
				</span>
				volume: {util.bigint_display(pool.sum_eth, 18, 4)} ETH.
			</div>
			<div>
				Buys:
				{util.bigint_display(pool.sum0, pool.coin0.decimals, 4)}
				{pool.coin0.symbol}
				({util.bigint_display(pool.sum0_eth, 18, 4)} ETH) Sells:
				{util.bigint_display(pool.sum1, pool.coin1.decimals, 4)}
				{pool.coin1.symbol}
				({util.bigint_display(pool.sum1_eth, 18, 4)} ETH)
			</div>
			<div>
				Pool reserves:
				{util.bigint_display(pool.reserve.x, pool.coin0.decimals, 4)}
				{pool.coin0.symbol}
				{util.bigint_display(pool.reserve.y, pool.coin1.decimals, 4)}
				{pool.coin1.symbol}
			</div>
			<div>
				1 {coin0.symbol} =
				<span>
					{price_usd} USD
				</span>
				<span role="button" on:click={flip} on:keypress={flip} tabindex="0">
					{price}
					{coin1.symbol}
				</span>
				(stddev {util.bigint_display(pool.reserve_summary.stddev, 18, 4)} from {pool.reserve_summary
					.count} trades)
			</div>
		</div>
	</div>
{/if}

<style>
	.pools {
		display: flex;
		padding-bottom: 0.5em;
		/* justify-content: space-between;*/
	}
	#pool_name {
		width: 12em;
	}
</style>
