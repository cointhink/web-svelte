<script lang="ts">
	import Menubar from '$lib/Menubar.svelte';

	export let data;
	console.log(data);

	//https://dev.to/danawoodman/svelte-quick-tip-connect-a-store-to-local-storage-4idi
	import { token } from "$lib/token_store"
</script>

<div id="page">
	<Menubar page_name="auth" />
</div>

Logging in... {JSON.stringify(data)}
