<script>
	export let tokens;
	export let token;
	export let reserve;

	let locale = navigator.language || navigator.userLanguage;

	function scale(num) {
		const decimals = 4; //tokens[token].decimals;
		const formatter = new Intl.NumberFormat(locale, { maximumSignificantDigits: decimals });
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
