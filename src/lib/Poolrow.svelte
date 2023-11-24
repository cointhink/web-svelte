<script lang="ts">
	import { onMount } from 'svelte';
	import * as util from '$lib/util';
	import D3Chart from './D3Chart.svelte';

	export let pool;

	let loading = true;
	let x;
	let y;
	let flipped;
	let coin0;
	let coin1;
	let price;

	onMount(async () => {
		x = pool.reserve.x / 10 ** pool.coin0.decimals;
		y = pool.reserve.y / 10 ** pool.coin1.decimals;

		flipped = pool.coin0.symbol == 'WETH';
		flipstate();

		loading = false;
	});

	function flip() {
		flipped = flipped ? false : true;
		flipstate();
	}

	function flipstate() {
		console.log('flipped', flipped);
		if (flipped) {
			coin0 = pool.coin1;
			coin1 = pool.coin0;
			price = util.decimal_display(x / y, 0, 4);
		} else {
			coin0 = pool.coin0;
			coin1 = pool.coin1;
			price = util.decimal_display(y / x, 0, 4);
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
				price: <span role="button" on:click={flip} on:keypress={flip} tabindex="0">
					{price}
					{coin1.symbol}</span
				>
			</div>
			<div>
				Fee revenue: {util.bigint_display(pool.sum_eth * 0.003, 18, 4)} ETH 24hr volume: {util.bigint_display(
					pool.sum_eth,
					18,
					4
				)} ETH.
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
				#{pool.reserve.block_number}
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
