<script>
	export let last_block;
	export let block_number;
</script>

<span class="blockno">#{block_number}</span>
{(((last_block.number - block_number) * 12) / 60).toFixed(1)} min old

<style>
	.blockno {
		font-size: 90%;
	}
</style>
