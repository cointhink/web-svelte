<script lang="ts">
	import Poolrow from '$lib/Poolrow.svelte';
	import Menubar from '$lib/Menubar.svelte';

  let pools = [{a:1}, {b:1}]
</script>

<Menubar page_name="pooltime" />

{#each pools as pool}
	<Poolrow pool={pool}/>
{/each}
