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
		await moar(pool);

		reserves = pool.reserves;
		last_reserves = reserves[0];
		x = last_reserves.x / 10 ** pool.token0.decimals;
		y = last_reserves.y / 10 ** pool.token1.decimals;

		loading = false;
	});

	async function moar(pool) {
		const url = 'https://cointhink.com/sql/reserves?contract_address=eq.' + pool.contract_address;
		pool.reserves = await fetch(url).then((ps) => ps.json());
		const url2 = 'https://cointhink.com/sql/coins?contract_address=eq.' + pool.token0;
		pool.token0 = (await fetch(url2).then((ps) => ps.json()))[0];
		const url3 = 'https://cointhink.com/sql/coins?contract_address=eq.' + pool.token1;
		pool.token1 = (await fetch(url3).then((ps) => ps.json()))[0];
	}
</script>

{#if loading}
	<div>Loading..</div>
{:else}
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
			{x.toFixed(1)}
			{pool.token1.symbol}
			{y.toFixed(1)}
		</div>
		<D3Chart {reserves} />
	</div>

	<style>
		#div {
			margin: 10px;
		}
	</style>
{/if}
