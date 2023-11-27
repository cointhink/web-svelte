<script lang="ts">
	import Menubar from '$lib/Menubar.svelte';
	import { PUBLIC_AUTH_URL } from '$env/static/public';

	let form_state = 'start';

	async function handleOnSubmit(form) {
		const email_field = form.target[0]; //fragile. how to fix?
		const email = form.target[0].value;
		const url = PUBLIC_AUTH_URL + '/register/' + email;
		console.log('handleOnSubmit', 'POST', url);
		form_state = 'submit';
		const response = await fetch(url, { method: 'POST' });
		const json = await response.json();
		console.log('handleOnSubmit', json);
		return false;
	}
</script>

<div id="page">
	<Menubar page_name="" />

	<div class="box">
		<div class="bold">Sign in to defi.markets</div>
		<div>Enter your email address to receive a magic-link login email.</div>
		<form on:submit={handleOnSubmit}>
			<div>Email</div>
			<input type="email" name="email" />
			{#if form_state == 'start'}
				<div>
					<button> Login </button>
				</div>
			{/if}
			{#if form_state == 'submit'}
				<div>Submitting...</div>
			{/if}
		</form>
	</div>
</div>

<style>
	.box {
		width: 25em;
		margin: auto;
		border: solid;
		border-radius: 1em;
		padding: 1em;
	}

	.bold {
		font-weight: bold;
	}

	.box > div {
		padding: 1em 0;
	}

	form input {
		font-size: 110%;
	}
</style>
