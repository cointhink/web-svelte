<script>
	export let tokens;
	export let pool;
	export let reserves;
</script>

{#if tokens[pool.token0] && tokens[pool.token1]}
	{reserves.x /
		10 ** tokens[pool.token0].decimals /
		(reserves.y / 10 ** tokens[pool.token1].decimals)}
	{tokens[pool.token0].symbol}/{tokens[pool.token1].symbol}
{:else}
	computing...
{/if}
