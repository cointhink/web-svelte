<script lang="ts">
	import { onMount } from 'svelte';
	export let pool;

	const reserves = pool.reserves;
	const last_reserves = reserves[0];
	const x = last_reserves.x / 10 ** pool.token0.decimals;
	const y = last_reserves.y / 10 ** pool.token1.decimals;

	import D3Chart from './D3Chart.svelte';
</script>

<div id="div">
	<div>
		pool
		{pool.token0.symbol}/
		{pool.token1.symbol}
		<a href="https://v2.info.uniswap.org/pair/0x{pool.contract_address}">v2</a>
	</div>
	<div>
		price: {(x / y).toFixed(4)}
		{pool.token0.symbol}
	</div>
	<div>
		reserves: {pool.token0.symbol}
		{x.toFixed(0)}
		{pool.token1.symbol}
		{y.toFixed(0)}
	</div>
	<D3Chart {reserves} />
</div>

<style>
	#div {
		margin: 10px;
	}
</style>
