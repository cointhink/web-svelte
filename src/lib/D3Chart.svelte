<script>
	export let reserves;

	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let sparkline;
	let innerWidth;
	let innerHeight;

	onMount(() => {
		d3.select(sparkline)
			.selectAll('div')
			.data(reserves)
			.enter()
			.append('svg')
			.style('background-color', 'red')
			.attr('width', innerWidth / 2)
			.attr('height', innerHeight / 10)
			.append('g')
			.append('div')
			.style('background-color', 'blue')
			.style('width', function (d) {
				return '100px';
			})
			.text(function (d) {
				return JSON.stringify(d);
			});
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div bind:this={sparkline}>sparky</div>
