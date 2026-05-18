<script lang="ts">
	import { markerStyles, markers, markersContent } from '$lib/util/config-formatter';
	import { markerRegex } from '$lib/util/generate-regex';

	let { text }: { text: string } = $props();

	let parts = $derived(text.split(markerRegex));
</script>

{#each parts as part, i (i)}
	{#if part}
		{#if markersContent[part]}
			{#if typeof markersContent[part].tag === 'string'}
				<svelte:element this={markersContent[part].tag} {...markersContent[part].props} />
			{:else}
				{@const Tag = markersContent[part].tag}
				<Tag {...markersContent[part].props} />
			{/if}
		{:else}
			{@const openingMarker = Object.keys(markerStyles).find((m) => part.startsWith(m))}
			{#if openingMarker && part.endsWith(markers[openingMarker])}
				{@const closingMarker = markers[openingMarker]}
				{@const content = part.slice(openingMarker.length, -closingMarker.length)}
				<span class={markerStyles[openingMarker]}>
					{content}
				</span>
			{:else}
				{part}
			{/if}
		{/if}
	{/if}
{/each}
