<script lang="ts">
	import Poolrow from '$lib/Poolrow.svelte';
	import Menubar from '$lib/Menubar.svelte';

	import type { PageData } from './$types';

	export let data;
</script>

<Menubar page_name="liquidity pools" />

Uniswap V2
{#each data.pools as pool}
	<Poolrow {pool} />
{/each}
