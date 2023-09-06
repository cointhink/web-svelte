<script lang="ts">
	import Menubar from '$lib/Menubar.svelte';

 	function handleOnSubmit() {
		console.log("I'm the handleOnSubmit() in App.svelte")
	}
</script>

<div id="page">
	<Menubar page_name="login" />
</div>

<form on:submit={handleOnSubmit}>
  <div>email address</div>
  <input type="email" name="email">
  <div>password</div>
  <input type="password" name="password">
  <div>
  <button> Login </button>
  </div>
</form>
