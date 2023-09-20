<script lang="ts">
	import Menubar from '$lib/Menubar.svelte';

	async function handleOnSubmit() {
		const url = '/api/login';
		console.log(url)
		const response = await fetch(url, { method: 'POST' });
		const json = await response.json();
		console.log(json);
	}
</script>

<div id="page">
	<Menubar page_name="login" />
</div>

<form on:submit={handleOnSubmit}>
	<div>email address</div>
	<input type="email" name="email" />
	<div>
		<button> Login </button>
	</div>
</form>
