<script>
	export let reserves;

	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let sparkline_div;
	let innerWidth;
	let innerHeight;

	onMount(() => {
		let width = innerWidth / 2;
		let height = innerHeight / 10;
		let sparkline = d3.select(sparkline_div);
		let svg = sparkline
			.append('svg')
			.style('background-color', 'grey')
			.attr('width', width)
			.attr('height', height);

		const domain = d3.extent(reserves, function (d) {
			return d.block_number;
		});
		const x = d3.scaleLinear().domain(domain).range([0, width]);

		const y1 = d3
			.scaleLinear()
			.domain([
				d3.min(reserves, function (d) {
					return parseFloat(d.x);
				}),
				d3.max(reserves, function (d) {
					return parseFloat(d.x);
				})
			])
			.range([height - 22, 5]);

		const y2 = d3
			.scaleLinear()
			.domain([
				d3.min(reserves, function (d) {
					return parseFloat(d.y);
				}),
				d3.max(reserves, function (d) {
					return parseFloat(d.y);
				})
			])
			.range([height - 22, 5]);

		svg
			.append('g')
			.attr('transform', `translate(0, ${height - 22})`)
			.call(d3.axisBottom(x));

		// debug
		//sparkline.append('div').style('background-color', 'blue').text(JSON.stringify(reserves));

		svg
			.append('path')
			.datum(reserves)
			.attr('fill', 'none')
			.attr('stroke', '#fff')
			.attr('stroke-width', 1.5)
			.attr(
				'd',
				d3
					.line()
					.x(function (d) {
						return x(d.block_number);
					})
					.y(function (d) {
						return y1(parseFloat(d.x));
					})
			);
		svg
			.append('path')
			.datum(reserves)
			.attr('fill', 'none')
			.attr('stroke', '#bbb')
			.attr('stroke-width', 1.5)
			.attr(
				'd',
				d3
					.line()
					.x(function (d) {
						return x(d.block_number);
					})
					.y(function (d) {
						return y2(parseFloat(d.y));
					})
			);
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div bind:this={sparkline_div} />
