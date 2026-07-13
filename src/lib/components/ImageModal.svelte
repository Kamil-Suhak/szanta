<script lang="ts">
	import { X } from 'lucide-svelte';
	import { fade, scale } from 'svelte/transition';
	import EnhancedImage from '../../util/EnhancedImage.svelte';

	let { image, onclose } = $props<{
		image: { url: string; annotation: string } | null;
		onclose: () => void;
	}>();

	$effect(() => {
		if (typeof document !== 'undefined') {
			if (image) {
				document.documentElement.classList.add('no-scroll');
			} else {
				document.documentElement.classList.remove('no-scroll');
			}
		}

		return () => {
			if (typeof document !== 'undefined') {
				document.documentElement.classList.remove('no-scroll');
			}
		};
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && image) {
			onclose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if image}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-9999 flex items-center justify-center bg-black/90 p-4 sm:p-8"
		in:fade={{ duration: 200 }}
		out:fade={{ duration: 200 }}
		onclick={onclose}
	>
		<button
			class="absolute top-6 right-6 text-white/70 transition-colors hover:text-white"
			onclick={onclose}
			aria-label="Zamknij"
		>
			<X size={36} />
		</button>

		<div
			class="relative flex max-h-full max-w-5xl flex-col items-center"
			onclick={(e) => e.stopPropagation()}
			in:scale={{ start: 0.95, duration: 300, opacity: 0 }}
			out:scale={{ start: 0.95, duration: 200, opacity: 0 }}
		>
			<EnhancedImage
				src={image.url}
				alt={image.annotation}
				class="max-h-[85vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
				loading="lazy"
			/>
			<div class="mt-4 text-center text-lg font-medium text-white/90">
				{image.annotation}
			</div>
		</div>
	</div>
{/if}
