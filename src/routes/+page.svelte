<script lang="ts">
	import PageVolume from '$lib/page/Volume.svelte';
	import PageTopPairs from '$lib/page/TopPairs.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_SQL_URL, PUBLIC_API_URL } from '$env/static/public';
	import * as pool from '$lib/pool';

	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data;
	let lastBlock;

	onMount(async () => {
		lastBlock = await pool.latestBlock();
	});
</script>

<div id="page">
	<PageTopPairs since={data.since} />
</div>

<div>
	{#if lastBlock}
		<div>
			Synced to ethereum block #{lastBlock.number}
			{lastBlock.date}
		</div>
	{/if}
</div>

<style>
</style>
