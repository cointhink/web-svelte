<script>
	export let tokens;
	export let pool;
</script>

{#if tokens[pool.token0]}
	{tokens[pool.token0].symbol}
{:else}
	{pool.token0.substr(0, 4)}
{/if}/{#if tokens[pool.token1]}
	{tokens[pool.token1].symbol}
{:else}
	{pool.token1.substr(0, 4)}
{/if}
