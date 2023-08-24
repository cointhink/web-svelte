<script>
	export let reserves;

	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let sparkline;

	onMount(() => {
		d3.select(sparkline)
			.selectAll('div')
			.data(reserves)
			.enter()
			.append('div')
			.style('width', function (d) {
				return '100px';
			})
			.text(function (d) {
				return JSON.stringify(d);
			});
	});
</script>

<div bind:this={sparkline} />
