<script lang="ts">
	export let data;
	export let selectedSido = 'none';
	export let selectedSigungu = 'none';
	export let selectedGeoId = 0;

	function changeSido(sido?: string) {
		if (sido === 'none' || !sido) {
			selectedSido = 'none';
			selectedSigungu = 'none';
		} else {
			selectedSido = sido;
			changeSigungu(Object.keys(data.addresses[sido])[0]);
		}
	}

	function changeSigungu(sigungu?: string) {
		if (sigungu === 'none' || !sigungu) {
			selectedSigungu = 'none';
			selectedGeoId = 0;
		} else {
			selectedSigungu = sigungu;
			selectedGeoId = data.addresses[selectedSido][sigungu][0].id;
		}
	}
</script>

<div>
	<h1>정직부동산</h1>

	<select on:change={(e) => changeSido(e.target?.value)}>
		{#each Object.keys(data.addresses) as sido}
			<option value={sido}>{sido}</option>
		{/each}
	</select>

	{#if selectedSido != 'none'}
		<select on:change={(e) => changeSigungu(e.target?.value)} bind:value={selectedSigungu}>
			{#each Object.keys(data.addresses[selectedSido]) as sigungu}
				<option value={sigungu}>{sigungu}</option>
			{/each}
		</select>
	{/if}

	{#if selectedSigungu != 'none'}
		<select bind:value={selectedGeoId}>
			{#each data.addresses[selectedSido][selectedSigungu] as dong}
				<option value={dong.id}>{dong.dong}</option>
			{/each}
		</select>
	{/if}
</div>
