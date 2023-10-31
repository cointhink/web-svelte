<script lang="ts">
	import Menubar from '$lib/Menubar.svelte';
	import { PUBLIC_AUTH_URL } from '$env/static/public';

	async function handleOnSubmit(form) {
		const email_field = form.target[0]; //fragile. how to fix?
		const email = form.target[0].value;
		const url = PUBLIC_AUTH_URL + '/register/' + email;
		console.log('handleOnSubmit', 'POST', url);
		const response = await fetch(url, { method: 'POST' });
		const json = await response.json();
		console.log(json);
		return false;
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
