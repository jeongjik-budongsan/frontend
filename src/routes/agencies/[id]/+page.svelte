<script lang="ts">
	import { page } from '$app/stores';
	import type { Agency } from '../../../types/types';

	export let data;
</script>

<div>
	{#if $page.error}
		<p style="color: red;">{$page.error.message}</p>
	{:else}
		<h1>{data.상호}</h1>
		{data.대표자}
		<p>평점: {data.review.average}</p>
		{#each data.review.items as review}
			<div>
				{review.username} : {review.text}
			</div>
		{/each}
	{/if}
</div>
