<script lang="ts">
	export let reserves_x;
	export let reserves_y;
	export let token_x;
	export let token_y;
</script>

<span>
	{reserves_y / reserves_x / 10 ** (token_x.decimals - token_y.decimals)}
	{token_x.symbol}
</span>
