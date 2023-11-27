<script lang="ts">
	import { onMount } from 'svelte';
	import { latestBlock } from '$lib/pool';
	let lastBlock;

	onMount(async () => {
		lastBlock = await latestBlock();
	});
</script>

<div>
	{#if lastBlock}
		<div>
			synced to eth block #{lastBlock.number}
			{lastBlock.date}
		</div>
	{/if}
</div>
