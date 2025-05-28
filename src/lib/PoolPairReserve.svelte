<script>
	export let tokens;
	export let token;
	export let reserve;
</script>

{#if tokens[token]}
	{(reserve / 10 ** tokens[token].decimals).toFixed(8)}
	{tokens[token].symbol}
{:else}
	{JSON.stringify(reserve)}
{/if}
