<script>
	export let tokens;
	export let token;
	export let reserve;
</script>

{#if tokens[token]}
	{parseInt(reserve / 10 ** tokens[token].decimals).toFixed(4)}
	{tokens[token].symbol}
{:else}
	{parseInt(reserve).toFixed(4)}
{/if}
