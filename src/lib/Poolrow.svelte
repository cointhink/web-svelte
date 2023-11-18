<script lang="ts">
	import { onMount } from 'svelte';
	export let pool;

	import D3Chart from './D3Chart.svelte';
	let loading = true;
	let x;
	let y;
	let reserves;
	let last_reserves;

	onMount(async () => {
		x = pool.reserve.x / 10 ** pool.coin0.decimals;
		y = pool.reserve.y / 10 ** pool.coin1.decimals;

		loading = false;
	});

	function decimal_display(value, decimals, display) {
		return (value / 10 ** decimals).toFixed(display);
	}
</script>

{#if loading}
	<div>Loading..</div>
{:else}
	<div class="pools">
		<div id="pool_name">
			<div>
				<a href="/pool/{pool.contract_address}">
					{pool.coin0.symbol}/{pool.coin1.symbol}
				</a>
			</div>
		</div>
		<div id="pool_right_half">
			<div>
				price: {(x / y).toFixed(4)}
				{pool.coin0.symbol}
			</div>
			<div>
				sum0:
				{decimal_display(pool.sum0, pool.coin0.decimals, 4)}
				{pool.coin0.symbol}
				({decimal_display(pool.sum0_eth, 18, 4)} ETH)
			</div>
			<div>
				sum1:
				{decimal_display(pool.sum1, pool.coin1.decimals, 4)}
				{pool.coin1.symbol}
				({decimal_display(pool.sum1_eth, 18, 4)} ETH)
			</div>
			<div>
				sum: {decimal_display(pool.sum_eth, 18, 4)} ETH
			</div>
			<div>
				reserves:
				{decimal_display(pool.reserve.x, pool.coin0.decimals, 1)}
				{pool.coin0.symbol}
				{decimal_display(pool.reserve.y, pool.coin0.decimals, 1)}
				{pool.coin1.symbol}
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
