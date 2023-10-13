<script>
	import { onMount } from 'svelte';
	export let data;
</script>

<div>
	I am pool/{JSON.stringify(data)}
</div>
