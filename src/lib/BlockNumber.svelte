<script>
	export let last_block;
	export let block_number;

	let block_time_number;
	let block_time_unit;

	const block_time_seconds = (last_block.number - block_number) * 12;
	if (block_time_seconds > 60) {
		block_time_number = block_time_seconds / 60;
		block_time_unit = 'mins';
	}
	if (block_time_seconds > 60 * 60) {
		block_time_number = block_time_seconds / 60 / 60;
		block_time_unit = 'hrs';
	}
	if (block_time_seconds > 60 * 60 * 24) {
		block_time_number = block_time_seconds / 60 / 60 / 24;
		block_time_unit = 'days';
	}
</script>

<span class="blockno">#{block_number}</span>
{block_time_number.toFixed(1)}
{block_time_unit} old

<style>
	.blockno {
		font-size: 90%;
	}
</style>
