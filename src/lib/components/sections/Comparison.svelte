<script lang="ts">
	import manifest from '$lib/data/projects-manifest.json';
	import { sectionData } from '$lib/lang/pl/projects';
	import EnhancedImage from '$lib/components/ui/EnhancedImage.svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';
	import Button from '../ui/Button.svelte';

	let activeBeforeAfterIdx = $state(0);
	let beforeAfterSlideDirection = $state(1);
	let sliderPos = $state(50);
	let isDraggingSlider = $state(false);

	function sliderAction(node: HTMLElement) {
		function updateSlider(clientX: number) {
			const rect = node.getBoundingClientRect();
			const x = clientX - rect.left;
			sliderPos = Math.max(0, Math.min(100, (x / rect.width) * 100));
		}

		function onMouseMove(e: MouseEvent) {
			updateSlider(e.clientX);
		}
		function onTouchMove(e: TouchEvent) {
			updateSlider(e.touches[0].clientX);
		}

		function onEnd() {
			isDraggingSlider = false;
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('touchmove', onTouchMove);
			window.removeEventListener('mouseup', onEnd);
			window.removeEventListener('touchend', onEnd);
		}

		function onStart(clientX: number) {
			isDraggingSlider = true;
			updateSlider(clientX);
			window.addEventListener('mousemove', onMouseMove);
			window.addEventListener('touchmove', onTouchMove, { passive: true });
			window.addEventListener('mouseup', onEnd);
			window.addEventListener('touchend', onEnd);
		}

		function onMouseDown(e: MouseEvent) {
			onStart(e.clientX);
		}
		function onTouchStart(e: TouchEvent) {
			onStart(e.touches[0].clientX);
		}

		node.addEventListener('mousedown', onMouseDown);
		node.addEventListener('touchstart', onTouchStart, { passive: true });

		return {
			destroy() {
				node.removeEventListener('mousedown', onMouseDown);
				node.removeEventListener('touchstart', onTouchStart);
				onEnd();
			}
		};
	}

	function handleKeyDownSlider(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') {
			sliderPos = Math.max(0, sliderPos - 5);
		} else if (e.key === 'ArrowRight') {
			sliderPos = Math.min(100, sliderPos + 5);
		}
	}
</script>

{#if manifest.beforeAfter && manifest.beforeAfter.length > 0}
	<div class="mb-24 rounded-3xl border border-gray-100 bg-gray-50/50 p-6 md:p-8 lg:p-12">
		<div
			use:sliderAction
			class="relative mx-auto aspect-video w-full max-w-[950px] cursor-ew-resize overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-md select-none"
			onkeydown={handleKeyDownSlider}
			role="slider"
			aria-valuenow={sliderPos}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-label={sectionData.ariaLabel}
			tabindex="0"
		>
			{#key activeBeforeAfterIdx}
				<div class="absolute inset-0" in:fade={{ duration: 350 }} out:fade={{ duration: 250 }}>
					<div class="absolute inset-0 bg-gray-200">
						<EnhancedImage
							src={manifest.beforeAfter[activeBeforeAfterIdx].afterImage}
							alt={sectionData.after}
							class="pointer-events-none absolute inset-0 h-full w-full object-cover"
						/>
						<div
							class="pointer-events-none absolute right-4 bottom-4 rounded-lg bg-forest-green/95 px-3 py-1.5 text-xs font-bold tracking-widest text-white uppercase backdrop-blur-md"
						>
							{sectionData.after}
						</div>
					</div>

					<div
						class="pointer-events-none absolute inset-0 z-10"
						style="clip-path: inset(0 {100 - sliderPos}% 0 0);"
					>
						<EnhancedImage
							src={manifest.beforeAfter[activeBeforeAfterIdx].beforeImage}
							alt={sectionData.before}
							class="absolute inset-0 h-full w-full object-cover"
						/>
						<div
							class="pointer-events-none absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-bold tracking-widest text-white uppercase backdrop-blur-md"
						>
							{sectionData.before}
						</div>
					</div>
				</div>
			{/key}

			<div
				class="absolute top-0 bottom-0 z-20 w-1 cursor-ew-resize bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]"
				style="left: {sliderPos}%"
			>
				<div
					class="pointer-events-none absolute top-1/2 left-1/2 z-30 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg transition-transform hover:scale-105 active:scale-95"
				>
					<ChevronLeft size={14} class="mr-0.5 text-gray-500" />
					<ChevronRight size={14} class="ml-0.5 text-gray-500" />
				</div>
			</div>
		</div>

		<div
			class="mx-auto mt-8 flex max-w-[950px] flex-col justify-between gap-6 border-t border-gray-200/60 pt-8 md:flex-row md:items-center"
		>
			<div class="grid min-h-[96px] flex-1 grid-cols-1 grid-rows-1 overflow-hidden sm:min-h-[72px]">
				{#key activeBeforeAfterIdx}
					<div
						class="col-start-1 row-start-1"
						in:fly={{ x: beforeAfterSlideDirection * 80, duration: 350, opacity: 0 }}
						out:fly={{ x: beforeAfterSlideDirection * -80, duration: 250, opacity: 0 }}
					>
						<h3 class="mb-2 text-2xl font-extrabold tracking-tight text-text-dark">
							{manifest.beforeAfter[activeBeforeAfterIdx].title}
						</h3>
						<p class="max-w-xl text-sm leading-relaxed text-gray-500">
							{manifest.beforeAfter[activeBeforeAfterIdx].description}
						</p>
					</div>
				{/key}
			</div>

			<div class="flex flex-nowrap items-center gap-2 sm:gap-4">
				<div class="flex gap-1 rounded-full bg-gray-200/60 p-1">
					{#each manifest.beforeAfter as item, idx (item.id)}
						<button
							class="rounded-full px-3 py-1.5 text-[10px] font-bold whitespace-nowrap transition-all duration-300 sm:px-4 sm:text-xs
										{idx === activeBeforeAfterIdx
								? 'bg-white text-forest-green shadow-sm'
								: 'text-gray-500 hover:text-text-dark'}"
							onclick={() => {
								beforeAfterSlideDirection = idx > activeBeforeAfterIdx ? 1 : -1;
								activeBeforeAfterIdx = idx;
								sliderPos = 50;
							}}
						>
							Projekt {idx + 1}
						</button>
					{/each}
				</div>

				<Button
					href="#kontakt"
					class="inline-block px-4 py-2.5 text-center text-xs font-bold tracking-wider whitespace-nowrap no-underline sm:px-6 sm:py-3.5 sm:text-sm"
				>
					{sectionData.ctaBeforeAfter}
				</Button>
			</div>
		</div>
	</div>
{/if}
