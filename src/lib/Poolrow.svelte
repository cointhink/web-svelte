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
</script>

{#if loading}
	<div>Loading..</div>
{:else}
	<div class="pools">
		<div id="pool_name">
			<div>
				<a href="/pool/{pool.contract_address}">
					{pool.coin0.symbol}/
					{pool.coin1.symbol}
				</a>
			</div>
			<a href="https://v2.info.uniswap.org/pair/0x{pool.contract_address}">v2</a>
		</div>
		<div>
			price: {(x / y).toFixed(4)}
			{pool.coin0.symbol}
		</div>
		<div>
			sum0: {pool.sum0}
			{pool.coin0.symbol}
		</div>
		<div>
			sum1: {pool.sum1}
			{pool.coin1.symbol}
		</div>
		<div>
			reserves: {pool.coin0.symbol}
			{x.toFixed(1)}
			{pool.coin1.symbol}
			{y.toFixed(1)}
		</div>
	</div>
{/if}

<style>
	.pools {
		display: flex;
		justify-content: space-between;
	}
	#pool_name {
	}
</style>
