<script>
	import { onMount } from 'svelte';
	export let data;

  for (const log of data.logs) {
		let dparts = log.data.match(/.{1,64}/g)
		log.in0 = parseInt(dparts[0],16)
		log.in1 = parseInt(dparts[1],16)
		log.out0 = parseInt(dparts[2],16)
		log.out1 = parseInt(dparts[3],16)
	}
</script>

<div>
	I am pool/{JSON.stringify(data.params.address)}
</div>

<div>
{data.logs.length} logs
</div>

{#each data.logs as log}
	<pre>
	topic1: {log.topic1}
	topic2: {log.topic2}
	coin0 in: {log.in0}
	coin1 in: {log.in1}
	coin0 out: {log.out0}
	coin1 out: {log.out1}
	</pre>
{/each}
