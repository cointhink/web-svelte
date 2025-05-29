<script>
	export let tokens;
	export let token;
	export let reserve;

	let locale = navigator.language || navigator.userLanguage;

	function scale(num) {
		const decimals = tokens[token].decimals;
		const maxSigFig = 5;
		const formatter = new Intl.NumberFormat(locale, { maximumSignificantDigits: maxSigFig });
		const reserve_scaled = reserve / 10 ** decimals;
		return formatter.format(reserve_scaled);
	}
</script>

{#if tokens[token]}
	{scale(reserve)}
	{tokens[token].symbol}
{:else}
	{JSON.stringify(reserve)}
{/if}
