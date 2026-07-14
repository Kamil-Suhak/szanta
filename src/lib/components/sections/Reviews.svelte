<script lang="ts">
	import { reviewsData } from '$lib/lang/pl/reviews';
	import { Quote, RefreshCw } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let activeIndex = $state(0);
	let wheelOffset = $state(0);
	let activeReview = $derived(reviewsData.items[activeIndex]);
	let isHovered = $state(false);

	let progress = $state(0);
	let startTime = $state<number | null>(null);
	let pausedTime = $state<number>(0);
	let rafId: ReturnType<typeof requestAnimationFrame>;

	function tick(now: number) {
		if (startTime === null) startTime = now;

		if (isHovered || document.hidden) {
			if (pausedTime === 0) pausedTime = now;
			rafId = requestAnimationFrame(tick);
			return;
		}

		if (pausedTime > 0) {
			startTime += now - pausedTime;
			pausedTime = 0;
		}

		let elapsed = now - startTime;
		if (elapsed >= 5000) {
			activeIndex = (activeIndex + 1) % reviewsData.items.length;
			startTime = now;
			elapsed = 0;
		}

		progress = elapsed / 5000;
		rafId = requestAnimationFrame(tick);
	}

	function startAutoplay() {
		stopAutoplay();
		startTime = null;
		pausedTime = 0;
		rafId = requestAnimationFrame(tick);
	}

	function stopAutoplay() {
		if (rafId) cancelAnimationFrame(rafId);
	}

	onMount(() => {
		startAutoplay();
		return () => {
			stopAutoplay();
		};
	});

	function setActive(index: number) {
		activeIndex = index;
		startTime = performance.now();
		pausedTime = 0;
		progress = 0;
	}
</script>

<section id="opinie" class="relative overflow-hidden bg-white py-16 sm:py-24">
	<!-- Decorative background organic shapes -->
	<div
		class="absolute top-1/4 -right-20 h-96 w-96 rounded-full bg-(--forest-green)/5 blur-3xl"
	></div>
	<div
		class="absolute bottom-1/4 -left-20 h-96 w-96 rounded-full bg-(--forest-green)/5 blur-3xl"
	></div>

	<div class="relative z-10 container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-extrabold tracking-tight text-(--forest-green) sm:text-5xl">
				{reviewsData.title}
			</h2>
			<p class="mx-auto max-w-2xl text-base text-(--text-muted)">
				{reviewsData.subtitle}
			</p>
			<div class="mx-auto mt-4 h-1 w-24 rounded bg-(--forest-green)"></div>
		</div>

		<!-- Layout -->
		<div
			class="relative flex flex-col items-center lg:flex-row lg:justify-center lg:gap-12 xl:gap-20"
			role="region"
			aria-label="Opinie klientów"
		>
			<!-- Avatars Full Wheel -->
			<div
				class="relative z-10 mt-8 h-[180px] w-full shrink-0 overflow-hidden sm:h-[200px] lg:mt-0 lg:h-[400px] lg:w-[400px] lg:overflow-visible"
			>
				<!-- Mobile Rotate Button -->
				<button
					class="absolute top-2 right-2 z-50 flex items-center justify-center rounded-full border border-gray-100 bg-white p-2.5 text-(--forest-green) shadow-md transition-all hover:bg-gray-50 active:scale-95 lg:hidden"
					onclick={() => (wheelOffset += 180)}
					aria-label="Obróć koło"
				>
					<RefreshCw size={20} />
				</button>

				<!-- Origin Point for Avatars -->
				<div
					class="absolute bottom-0 left-1/2 z-40 lg:top-1/2 lg:bottom-auto lg:left-1/2"
					style="--wheel-offset: {wheelOffset}deg;"
				>
					{#each reviewsData.items as review, i (review.id)}
						<div
							class="avatar-position absolute"
							style="--index: {i}; --total: {reviewsData.items.length};"
						>
							<button
								onclick={() => setActive(i)}
								class="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 font-bold transition-all duration-500 focus:ring-4 focus:ring-(--forest-green)/30 focus:outline-none sm:h-14 sm:w-14
									{activeIndex === i
									? 'z-40 scale-125 border-(--forest-green) shadow-[0_10px_20px_-5px_rgba(45,132,53,0.4)]'
									: 'cursor-pointer border-(--forest-green)/20 shadow-sm hover:z-50 hover:scale-110 hover:border-(--forest-green)'}"
								aria-label={`Pokaż opinię od ${review.author_name}`}
								aria-current={activeIndex === i ? 'true' : 'false'}
							>
								<svg
									class="h-full w-full transition-colors duration-500
										{activeIndex === i
										? 'bg-linear-to-br from-(--forest-green)/15 to-(--forest-green)/5 text-(--forest-green)'
										: 'bg-linear-to-br from-gray-100 to-gray-50 text-gray-400 group-hover:from-gray-50 group-hover:to-gray-100/50 group-hover:text-gray-500'}"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
									/>
								</svg>

								<!-- Tooltip on hover -->
								<div
									class="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-1 text-xs font-semibold whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:-top-12 group-hover:opacity-100 sm:block"
								>
									{review.author_name}
									<div
										class="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"
									></div>
								</div>
							</button>
						</div>
					{/each}
				</div>

				<!-- Decorative Dashed Full-Circle behind avatars -->
				<div
					class="pointer-events-none absolute bottom-0 left-1/2 z-10 transition-all duration-700 lg:top-1/2 lg:bottom-auto lg:left-1/2"
					style="transform: rotate({wheelOffset}deg);"
				>
					<div
						class="absolute h-[264px] w-[264px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-(--forest-green)/40 lg:h-[320px] lg:w-[320px]"
					></div>
				</div>

				<!-- Inner Decorative Circle -->
				<div
					class="pointer-events-none absolute bottom-0 left-1/2 z-10 lg:top-1/2 lg:bottom-auto lg:left-1/2"
				>
					<div
						class="absolute flex h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-solid border-(--forest-green)/20 bg-linear-to-b from-(--forest-green)/5 to-transparent shadow-[inset_0_0_20px_rgba(45,132,53,0.05)] lg:h-[160px] lg:w-[160px]"
					>
						<svg
							class="h-[100px] w-[100px] -rotate-90 lg:h-[120px] lg:w-[120px]"
							viewBox="0 0 100 100"
						>
							<circle
								cx="50"
								cy="50"
								r="46"
								fill="none"
								class="stroke-(--forest-green)/10"
								stroke-width="4"
							/>
							<circle
								cx="50"
								cy="50"
								r="46"
								fill="none"
								class="stroke-(--forest-green)"
								stroke-width="4"
								stroke-linecap="round"
								stroke-dasharray="289.03"
								stroke-dashoffset={activeIndex % 2 === 0
									? 289.03 * (1 - progress)
									: -289.03 * progress}
							/>
						</svg>
					</div>
				</div>
			</div>

			<!-- Review Text Container -->
			<div
				class="relative z-30 mx-auto mt-12 w-full max-w-4xl flex-1 lg:mt-0"
				onmouseenter={() => (isHovered = true)}
				onmouseleave={() => (isHovered = false)}
				role="status"
				aria-live="polite"
			>
				<div
					class="relative rounded-3xl border border-gray-100 bg-linear-to-br from-gray-50 to-white p-6 shadow-xl backdrop-blur-sm transition-transform duration-500 sm:p-14 lg:hover:-translate-y-1"
				>
					<!-- Large Quote Icon -->
					<div
						class="pointer-events-none absolute -top-3 -left-1 text-(--forest-green)/10 transition-transform duration-500 group-hover:scale-110 sm:-top-6 sm:-left-6"
					>
						<Quote class="h-14 w-14 sm:h-24 sm:w-24" strokeWidth={1} fill="currentColor" />
					</div>

					<!-- Use CSS Grid for overlap to prevent snapping during transition -->
					<div class="relative grid min-h-[260px] w-full sm:min-h-[340px]">
						{#key activeIndex}
							<div
								class="col-start-1 row-start-1 flex h-full flex-col"
								in:fade={{ duration: 300, delay: 150 }}
								out:fade={{ duration: 150 }}
							>
								<!-- Review Text -->
								<!-- Added line-clamp to truncate responsively at full words with an ellipsis -->
								<blockquote
									class="mt-8 mb-4 line-clamp-4 text-xl leading-relaxed font-semibold text-(--text-dark) italic sm:line-clamp-5 sm:text-3xl"
								>
									{activeReview.text}
								</blockquote>

								<!-- Author Info (Pushed to bottom via mt-auto) -->
								<div class="mt-auto flex items-center gap-4 border-t border-gray-200/60 pt-4">
									<div
										class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-(--forest-green)/20 shadow-md lg:hidden"
									>
										<svg
											class="h-full w-full bg-linear-to-br from-(--forest-green)/15 to-(--forest-green)/5 text-(--forest-green)"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
											/>
										</svg>
									</div>
									<div>
										<div class="text-base font-bold text-(--text-dark)">
											{activeReview.author_name}
										</div>
										<div class="text-xs font-medium text-(--text-muted)">
											{activeReview.relative_time_description}
										</div>
									</div>
								</div>
							</div>
						{/key}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.avatar-position {
		/* Default to Mobile Full Circle */
		--angle: calc(-67.5deg + (360deg * (var(--index) / var(--total))) + var(--wheel-offset, 0deg));
		--radius: 132px;
		/* Translate -50% centers the avatar exactly on the origin before rotation */
		transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--radius))
			rotate(calc(-1 * var(--angle)));
		transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
	}

	@media (min-width: 1024px) {
		.avatar-position {
			/* Desktop Full Circle (undo 22.5deg shift) */
			--angle: calc(-90deg + (360deg * (var(--index) / var(--total))) + var(--wheel-offset, 0deg));
			--radius: 160px;
		}
	}
</style>
