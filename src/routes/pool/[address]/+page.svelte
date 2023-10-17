<script>
	import { onMount } from 'svelte';
	export let data;
</script>

<div>
	I am pool/{JSON.stringify(data.params.address)}
</div>

{#each data.logs as log}
	{JSON.stringify(log)}
{/each}
