<script>
	import { moar } from '$lib/pool';
	import { onMount } from 'svelte';
	export let data;
	let logs = [];
	let pool = {};

	onMount(async () => {
		const topic_swap = 'd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822';
		const url1 =
			'https://cointhink.com/sql/logs?address=eq.' +
			data.params.address +
			'&topic0=eq.' +
			topic_swap;
		logs = await fetch(url1).then((ps) => ps.json());
		for (const log of logs) {
			let dparts = log.data.match(/.{1,64}/g);
			log.in0 = parseInt(dparts[0], 16);
			log.in1 = parseInt(dparts[1], 16);
			log.out0 = parseInt(dparts[2], 16);
			log.out1 = parseInt(dparts[3], 16);
		}
		const url2 = 'https://cointhink.com/sql/pools?contract_address=eq.' + data.params.address;
		let pools = await fetch(url2).then((ps) => ps.json());
		pool = pools[0]
		await moar(pool);
	});
</script>

<div>
	I am pool/{JSON.stringify(data.params.address)}
</div>

<div>
	{logs.length} logs
</div>

{#each logs as log}
	<pre>
	coin0 in: {log.in0} {pool.token0}
	coin1 in: {log.in1}
	coin0 out: {log.out0}
	coin1 out: {log.out1}
	</pre>
{/each}
