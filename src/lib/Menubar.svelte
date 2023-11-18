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
		token.set(null);
	}
</script>

<div id="menubar">
	<div>
		<a href="/"><span class="logotext"> defihub.markets</span></a>
	</div>

	<div>{page_name}</div>

	{#if token_value}
		<div class="username">
			{token_value.email}
			<div class="usermenu">
				<div>
					email: {token_value.email}
				</div>
				<button on:click={logout}>logout</button>
			</div>
		</div>
	{:else}
		<div><a href="/login"> login </a></div>
	{/if}
</div>

<slot />

<style>
	#menubar {
		display: flex;
		justify-content: space-between;
		padding-bottom: 0.5em;
	}
	.logotext {
		font-family: 'Montserrat', sans-serif;
		margin: 0.2em 0;
	}

	.usermenu {
		display: none;
		position: absolute;
		padding: 0;
		padding: 0em 1em;
		right: 0;
	}

	.username:hover > .usermenu {
		display: block;
		background: hsl(none none 40%);
	}

	button {
		border: none;
	}
</style>
