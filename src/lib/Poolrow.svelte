<script lang="ts">
	import { moar } from '$lib/pool';
	import { onMount } from 'svelte';
	export let pool;

	import D3Chart from './D3Chart.svelte';
	let loading = true;
	let x;
	let y;
	let reserves;
	let last_reserves;

	onMount(async () => {
		await moar(pool);

		reserves = pool.reserves;
		last_reserves = reserves[0];
		x = last_reserves.x / 10 ** pool.token0.decimals;
		y = last_reserves.y / 10 ** pool.token1.decimals;

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
					{pool.token0.symbol}/
					{pool.token1.symbol}
				</a>
			</div>
			<a href="https://v2.info.uniswap.org/pair/0x{pool.contract_address}">v2</a>
		</div>
		<div>
			price: {(x / y).toFixed(4)}
			{pool.token0.symbol}
		</div>
		<div>
			reserves: {pool.token0.symbol}
			{x.toFixed(1)}
			{pool.token1.symbol}
			{y.toFixed(1)}
		</div>
		<D3Chart {reserves} />
	</div>
{/if}

<style>
	.pools {
		display: flex;
		flex: initial;
	}
	#pool_name {
		width: 6em;
	}
</style>
