<script lang="ts">
import { token } from "$lib/token_store"
import { browser } from '$app/environment';

	export let page_name;
	let token_value;
	if(browser) {
			console.log('menubar token', token)
			token.subscribe((value) => {
				token_value = value
			})
	}
</script>

<div id="menubar">
	<div>
		<span class="logotext"> cointhink </span>
	</div>

	<div>{page_name}</div>

	{#if token}
	<div>token {token}</div>
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
