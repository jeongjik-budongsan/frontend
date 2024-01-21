<script lang="ts">
	import { getDongCoordinates } from '$lib/constants';
	import { average } from '$lib/util.js';
	import Geolocation from 'svelte-geolocation';
	import { BASE_URL } from '$lib/request.js';
	import { derived, writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import type { Agency } from '../types/types.js';

	export let data;
	export let selectedSido = 'none';
	export let selectedSigungu = 'none';
	export let selectedDong = 'none';
	export let selectedGeoId = writable(0);
	export let map: any;
	export let polygon: any;

	function changeSido(sido?: string) {
		if (sido === 'none' || !sido) {
			selectedSido = 'none';
			selectedSigungu = 'none';
			selectedDong = 'none';
		} else {
			selectedSido = sido;
			changeSigungu(Object.keys(data.addresses[sido])[0]);
		}
	}

	function initMap({ latitude, longitude }: { latitude: number; longitude: number }) {
		if ('kakao' in window) {
			const kakao = (window as any).kakao;
			var container = document.getElementById('map');
			var options = {
				center: new kakao.maps.LatLng(latitude, longitude),
				level: 5
			};

			map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
			if (map) {
				const geocoder = new kakao.maps.services.Geocoder();
				geocoder.coord2RegionCode(longitude, latitude, async (result: any, status: any) => {
					if (status === kakao.maps.services.Status.OK) {
						const name = result[0]['address_name'];
						selectedSido = result[0]['region_1depth_name'];
						selectedSigungu = result[0]['region_2depth_name'];
						selectedDong = result[0]['region_3depth_name'];
					}
				});
			}
		}
	}

	function renderDongPolygon() {
		if (selectedDong === 'none') return;

		if (polygon) {
			polygon.setMap(null);
		}

		const address = `${selectedSido} ${selectedSigungu} ${selectedDong}`;

		const coordinates = getDongCoordinates(selectedDong);
		if (!coordinates) return;

		const kakao = (window as any).kakao;
		const polygonPath: any = coordinates.map((i: any) => new kakao.maps.LatLng(i[1], i[0]));

		const latitudes = average(coordinates.map((i: any) => i[1]));
		const longitudes = average(coordinates.map((i: any) => i[0]));

		const moveLatLon = new kakao.maps.LatLng(latitudes, longitudes);

		map.setCenter(moveLatLon);

		polygon = new kakao.maps.Polygon({
			path: polygonPath, // 그려질 다각형의 좌표 배열입니다
			strokeWeight: 3, // 선의 두께입니다
			strokeColor: '#39DE2A', // 선의 색깔입니다
			strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
			strokeStyle: 'longdash', // 선의 스타일입니다
			fillColor: '#A2FF99', // 채우기 색깔입니다
			fillOpacity: 0.7 // 채우기 불투명도 입니다
		});

		polygon.setMap(map);
	}

	$: selectedDong, renderDongPolygon();

	function changeSigungu(sigungu?: string) {
		if (sigungu === 'none' || !sigungu) {
			selectedSigungu = 'none';
			selectedDong = 'none';
		} else {
			selectedSigungu = sigungu;
			changeSigungudong(data.addresses[selectedSido][sigungu][0].dong);
		}
	}

	function changeSigungudong(dong?: string) {
		if (dong === 'none' || !dong) {
			selectedDong = 'none';
			selectedGeoId.set(0);
		} else {
			selectedDong = dong;
			selectedGeoId.set(
				data.addresses[selectedSido][selectedSigungu].find((i: any) => i.dong === dong)?.id ?? 0
			);
		}
	}

	const agencies = derived(selectedGeoId, async (geoId): Promise<Agency[]> => {
		if (geoId !== 0) {
			const res = await fetch(`${BASE_URL}/agencies?geo_id=${geoId}`);
			return await res.json();
		} else {
			return [];
		}
	});
</script>

<Geolocation
	getPosition
	on:position={(e) => {
		initMap(e.detail.coords);
	}}
/>

<div>
	<script
		type="text/javascript"
		src="//dapi.kakao.com/v2/maps/sdk.js?appkey=3a1dc3e97c24080f22a317630c618d04&autoload=true&libraries=services,clusterer"
	></script>

	<div style="padding: 15px 14px;">
		<h1>정직부동산</h1>

		<select on:change={(e) => changeSido(e.target?.value)} bind:value={selectedSido}>
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
			<select on:change={(e) => changeSigungudong(e.target?.value)} bind:value={selectedDong}>
				{#each data.addresses[selectedSido][selectedSigungu] as dong}
					<option value={dong.dong}>{dong.dong}</option>
				{/each}
			</select>
		{/if}
	</div>

	<div style="display: flex;">
		<div style="width: 20%; border: 1px solid black; overflow-y: scroll;">
			{#await $agencies then agencies}
				{#each agencies as agency}
					<div on:click={() => goto(`/agencies/${agency.id}`)}>
						{agency.상호}
					</div>
				{/each}
			{:catch error}
				<div>{error.message}</div>
			{/await}
		</div>
		<div id="map" style="width:80%;height:80vh;"></div>
	</div>
</div>
