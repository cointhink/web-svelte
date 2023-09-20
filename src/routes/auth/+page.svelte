<script lang="ts">
	import Menubar from '$lib/Menubar.svelte';
	import { token } from '$lib/token_store';

	export let data;

	//https://dev.to/danawoodman/svelte-quick-tip-connect-a-store-to-local-storage-4idi
	if (data.token) {
		token.set(data.token);
	}
</script>

<div id="page">
	<Menubar page_name="auth" />
</div>

Logging in... {JSON.stringify(data)}
