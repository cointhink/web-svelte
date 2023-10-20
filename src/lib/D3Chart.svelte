<script>
	export let reserves;

	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let sparkline_div;

	onMount(() => {
		let width = sparkline_div.offsetWidth;
		let height = sparkline_div.offsetHeight;
		console.log('svg height', height, 'width', width);
		let sparkline = d3.select(sparkline_div);
		let svg = sparkline
			.append('svg')
			.style('background-color', 'grey')
			.attr('width', width)
			.attr('height', height);

		const domain = d3.extent(reserves, function (d) {
			return d.block_number;
		});
		const x = d3
			.scaleLinear()
			.domain(domain)
			.range([3, width - 3]);

		const y1 = d3
			.scaleLinear()
			.domain(
				d3.extent(reserves, function (d) {
					return parseFloat(d.x);
				})
			)
			.range([height - 3, 3]);

		const y2 = d3
			.scaleLinear()
			.domain(
				d3.extent(reserves, function (d) {
					return parseFloat(d.y);
				})
			)
			.range([height - 3, 3]);

		svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));

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
					.x((d) => x(d.block_number))
					.y((d) => y1(parseFloat(d.x)))
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

		svg
			.selectAll('circle')
			.data(reserves)
			.enter()
			.append('circle')
			.style('stroke', 'gray')
			.style('fill', 'black')
			.attr('r', 5)
			.attr('cx', (d, i) => {
				console.log('circle at bn', d.block_number, 'x', x(d.block_number));
				return x(d.block_number);
			})
			.attr('cy', 20);
	});
</script>

<div bind:this={sparkline_div} />

<style>
	div {
		width: 100%;
	}
</style>
