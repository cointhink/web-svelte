<script lang="ts">
	export let reserves;
	export let token_x;
	export let token_y;
</script>

<span>
	{reserves.y / reserves.x / 10 ** (token_x.decimals - token_y.decimals)}
	{token_x.symbol}
</span>
