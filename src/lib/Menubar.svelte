<script lang="ts">
	export let page_name;
</script>

<div id="menubar">
	<div>
		<span class="logotext"> cointhink </span>
	</div>

	<div>{page_name}</div>

	<div><a href="/login"> login </a></div>
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
