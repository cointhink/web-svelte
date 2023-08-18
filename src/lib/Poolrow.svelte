<script lang="ts">
	export let pool;
	const reserves = pool.reserves[0]
</script>

<style>
#div { margin: 10px }
</style>

<div id="div">
<!-- <div>{JSON.stringify(pool)}</div> -->
<div>
	pool
	{pool.token0.symbol}/
	{pool.token1.symbol}
	<a href="https://v2.info.uniswap.org/pair/0x{pool.contract_address}">v2</a>
</div>
<div>
#{reserves.block_number} y {reserves.y} / x {reserves.x} = {reserves.x/reserves.y} {pool.token0.symbol}
</div>
</div>
