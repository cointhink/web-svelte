<script lang="ts">
	import Footer from '$lib/Footer.svelte';
</script>

<slot />
<Footer />

<style>
	:global(body) {
		background-color: #435866;
		color: #ced3b6;
	}
	:global(a) {
		color: inherit;
	}
</style>
