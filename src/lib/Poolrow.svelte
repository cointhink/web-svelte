<script lang="ts">
	export let pool;
	const x = pool.reserves[0].x
	const y = pool.reserves[0].y
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
	({pool.contract_address})
</div>
<div>
y {y} / x {x} = {x/y} {pool.token0.symbol}
</div>
</div>
