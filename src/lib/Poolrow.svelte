<script lang="ts">
	export let pool;
</script>

<div>{JSON.stringify(pool)}</div>
<div>
	{pool.contract_address}
	{pool.reserves[0].x}
	{pool.reserves[0].y}
</div>
