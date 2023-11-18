<script lang="ts">
	import { onMount } from 'svelte';
	import { latestBlock } from '$lib/pool';
	let lastBlock = { number: null };
	let lastBlockDate = null;

	onMount(async () => {
		lastBlock = await latestBlock();
		lastBlockDate = new Date(lastBlock.timestamp * 1000);
	});
</script>

<div>
	<div>
		synced to eth block #{lastBlock.number}
		{lastBlockDate}
	</div>
</div>
