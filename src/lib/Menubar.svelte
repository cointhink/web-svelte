<script lang="ts">
	import { token } from '$lib/token_store';
	import { browser } from '$app/environment';

	export let page_name;
	let token_value;
	if (browser) {
		token.subscribe((value) => {
			token_value = value;
		});
	}

	function logout() {
		token.set(null)
	}
</script>

<div id="menubar">
	<div>
		<a href="/"><span class="logotext"> cointhink </span></a>
	</div>

	<div>{page_name}</div>

	{#if token_value}
		<div>{JSON.stringify(token_value.email)}</div>
		<div><button on:click={logout}> logout </button> </div>
	{:else}
		<div><a href="/login"> login </a></div>
	{/if}
</div>

<slot />

<style>
	#menubar {
		display: flex;
		justify-content: space-between;
	}
	.logotext {
		font-family: 'Montserrat', sans-serif;
		margin: 0.2em 0;
	}
</style>
