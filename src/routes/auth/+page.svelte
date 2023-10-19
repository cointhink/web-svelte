<script lang="ts">
	import Menubar from '$lib/Menubar.svelte';
	import { token } from '$lib/token_store';

	export let data;

	//https://dev.to/danawoodman/svelte-quick-tip-connect-a-store-to-local-storage-4idi
	if (data.token && data.id.status == 200) {
		token.set({ token: data.token, email: data.id.response });
	}
</script>

<div id="page">
	<Menubar page_name="Pool" />
</div>

Logging in... {JSON.stringify(data)}
