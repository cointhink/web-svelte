<script lang="ts">
	import Menubar from '$lib/Menubar.svelte';

	export let data;
	console.log(data);
</script>

<div id="page">
	<Menubar page_name="auth" />
</div>

Logging in... {JSON.stringify(data)}
