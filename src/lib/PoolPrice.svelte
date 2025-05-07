<script lang="ts">
	export let reserves_x;
	export let reserves_y;
	export let token_x;
	export let token_y;

	let locale = navigator.language || navigator.userLanguage;
	let maxSigFigDig = 8;
	const formatter = new Intl.NumberFormat(locale, { maximumSignificantDigits: maxSigFigDig });

	let price = reserves_y / reserves_x / 10 ** (token_x.decimals - token_y.decimals);
	let price_sigfig = formatter.format(price);
	let zero_length;
	let price_zero_pre;
	let price_zero_post;
	if (price < 0.1) {
		price_zero_pre = price_sigfig.substring(0, 3);
		let zero_stop = price_sigfig.length - maxSigFigDig;
		zero_length = zero_stop - 2;
		price_zero_post = price_sigfig.substring(zero_stop, price_sigfig.length);
	}
</script>

<span>
	{#if zero_length}
		{price_zero_pre}<sub>{zero_length}</sub>{price_zero_post}
	{:else}
		{price_sigfig}
	{/if}
	{token_x.symbol}
</span>
