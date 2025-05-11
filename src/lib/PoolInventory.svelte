<script lang="ts">
	export let token;
	export let reserves;

	let locale = navigator.language || navigator.userLanguage;
	let maxSigFigDig = 4;
	const formatter = new Intl.NumberFormat(locale, { maximumSignificantDigits: maxSigFigDig });

	let inventory = reserves / 10 ** token.decimals;

	let sigfig = formatter.format(inventory);
</script>

<span>
	{sigfig}
	{token.symbol}
</span>
