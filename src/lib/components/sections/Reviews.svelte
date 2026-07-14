<script lang="ts">
	import { reviewsData } from '$lib/lang/pl/reviews';
	import { Quote, ExternalLink } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let activeIndex = $state(0);
	let activeReview = $derived(reviewsData.items[activeIndex]);
	let isHovered = $state(false);
	let isMobile = $state(false);

	let progress = $state(0);
	let startTime = $state<number | null>(null);
	let pausedTime = $state<number>(0);
	let rafId: ReturnType<typeof requestAnimationFrame>;

	const MOBILE_RING_RADIUS = 33.75;
	const MOBILE_RING_CIRCUMFERENCE = 2 * Math.PI * MOBILE_RING_RADIUS;
	const ITEMS_PER_PAGE = 4;
	const TOTAL_PAGES = Math.ceil(reviewsData.items.length / ITEMS_PER_PAGE);

	let mobileStripPage = $derived(Math.floor(activeIndex / ITEMS_PER_PAGE));
	let manualPage = $state<number | null>(null);
	let currentPage = $derived(manualPage ?? mobileStripPage);

	$effect(() => {
		// Reset manual override when autoplay catches up
		if (mobileStripPage === manualPage) {
			manualPage = null;
		}
	});

	let stripTouchStartX = $state(0);
	let stripSwiping = $state(false);

	function handleStripTouchStart(e: TouchEvent) {
		stripTouchStartX = e.touches[0].clientX;
		stripSwiping = true;
	}

	function handleStripTouchEnd(e: TouchEvent) {
		if (!stripSwiping) return;
		stripSwiping = false;
		const dx = e.changedTouches[0].clientX - stripTouchStartX;
		if (Math.abs(dx) > 50) {
			const target =
				dx < 0 ? Math.min(currentPage + 1, TOTAL_PAGES - 1) : Math.max(currentPage - 1, 0);
			manualPage = target;
		}
	}

	function checkMobile() {
		if (typeof window !== 'undefined') {
			isMobile = window.innerWidth < 1024;
		}
	}

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
			manualPage = null;
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
		checkMobile();
		startAutoplay();
		return () => {
			stopAutoplay();
		};
	});

	function setActive(index: number) {
		activeIndex = index;
		manualPage = null;
		startTime = performance.now();
		pausedTime = 0;
		progress = 0;
	}
</script>

<svelte:window onresize={checkMobile} />

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
			<!-- Mobile Avatar Strip (below lg) -->
			<div class="w-full lg:hidden">
				<div
					class="overflow-hidden"
					role="region"
					aria-roledescription="Karuzela opinii"
					ontouchstart={handleStripTouchStart}
					ontouchend={handleStripTouchEnd}
				>
					<div
						class="flex transition-transform duration-500 ease-out"
						style="transform: translateX(-{currentPage * 100}%);"
					>
						{#each { length: TOTAL_PAGES } as _, pageIdx}
							<div class="flex w-full shrink-0 justify-center gap-3 sm:gap-4">
								{#each reviewsData.items.slice(pageIdx * ITEMS_PER_PAGE, (pageIdx + 1) * ITEMS_PER_PAGE) as review, localIdx}
									{@const i = pageIdx * ITEMS_PER_PAGE + localIdx}
									<button
										onclick={() => setActive(i)}
										class="group relative flex shrink-0 items-center justify-center p-1.5 focus:outline-none"
										aria-label={`Pokaż opinię od ${review.author_name}`}
										aria-current={activeIndex === i ? 'true' : 'false'}
									>
										<svg
											class="absolute inset-0 h-full w-full -rotate-90 transition-opacity duration-300
												{activeIndex === i ? 'opacity-100' : 'opacity-0'}"
											viewBox="0 0 70 70"
										>
											<circle
												cx="35"
												cy="35"
												r={MOBILE_RING_RADIUS}
												fill="none"
												class="stroke-(--bg-white)"
												stroke-width="2.5"
											/>
											<circle
												cx="35"
												cy="35"
												r={MOBILE_RING_RADIUS}
												fill="none"
												class="stroke-(--forest-green)"
												stroke-width="2.5"
												stroke-linecap="round"
												stroke-dasharray={MOBILE_RING_CIRCUMFERENCE}
												stroke-dashoffset={MOBILE_RING_CIRCUMFERENCE * (1 - progress)}
											/>
										</svg>

										<div
											class="relative flex h-[58px] w-[58px] items-center justify-center overflow-hidden rounded-full font-bold transition-all duration-500 sm:h-[68px] sm:w-[68px]
												{activeIndex === i
												? 'scale-110 border-(--forest-green) shadow-[0_4px_12px_-2px_rgba(45,132,53,0.35)]'
												: 'border-gray-200 shadow-sm hover:scale-105 hover:border-(--forest-green)/50'}"
										>
											<svg
												class="h-full w-full transition-colors duration-500
													{activeIndex === i
													? 'bg-linear-to-br from-(--forest-green)/15 to-(--forest-green)/5 text-(--forest-green)'
													: 'bg-linear-to-br from-gray-100 to-gray-50 text-gray-400 group-hover:text-gray-500'}"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
												/>
											</svg>
										</div>
									</button>
								{/each}
							</div>
						{/each}
					</div>
				</div>

				<!-- Page dots -->
				{#if TOTAL_PAGES > 1}
					<div class="mt-3 flex justify-center gap-1.5">
						{#each { length: TOTAL_PAGES } as _, pageIdx}
							<button
								class="h-1.5 rounded-full transition-all duration-300
									{currentPage === pageIdx ? 'w-6 bg-(--forest-green)' : 'w-1.5 bg-gray-300 hover:bg-gray-400'}"
								onclick={() => (manualPage = pageIdx)}
								aria-label={`Strona ${pageIdx + 1}`}
							></button>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Desktop Avatars Full Wheel (lg and up) -->
			<div class="relative z-10 hidden shrink-0 lg:block lg:h-[400px] lg:w-[400px]">
				<!-- Origin Point for Avatars -->
				<div class="absolute lg:top-1/2 lg:left-1/2">
					{#each reviewsData.items as review, i (review.id)}
						<div
							class="avatar-position absolute"
							style="--index: {i}; --total: {reviewsData.items.length};"
						>
							<button
								onclick={() => setActive(i)}
								class="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 font-bold transition-all duration-500 focus:ring-4 focus:ring-(--forest-green)/30 focus:outline-none
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
									class="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-1 text-xs font-semibold whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:-top-12 group-hover:opacity-100"
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
				<div class="pointer-events-none absolute z-10 lg:top-1/2 lg:left-1/2">
					<div
						class="absolute h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-(--forest-green)/40"
					></div>
				</div>

				<!-- Inner Decorative Circle with Progress Ring -->
				<div class="pointer-events-none absolute z-10 lg:top-1/2 lg:left-1/2">
					<div
						class="absolute flex h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-solid border-(--forest-green)/20 bg-linear-to-b from-(--forest-green)/5 to-transparent shadow-[inset_0_0_20px_rgba(45,132,53,0.05)]"
					>
						<svg class="h-[120px] w-[120px] -rotate-90" viewBox="0 0 100 100">
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
				class="relative z-30 mx-auto mt-8 w-full max-w-4xl flex-1 lg:mt-0"
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
											{activeReview.date_written}
										</div>
									</div>

									{#if activeReview.pdf_url}
										<div class="ml-auto flex items-center">
											<a
												href={activeReview.pdf_url}
												target="_blank"
												rel="noopener noreferrer"
												class="inline-flex items-center justify-center rounded-full bg-gray-200 p-3 text-gray-500 shadow-sm transition-all duration-300 hover:scale-110 hover:bg-gray-200 hover:text-(--forest-green) focus:ring-2 focus:ring-(--forest-green) focus:outline-none"
												aria-label={`Pobierz lub otwórz referencję w formacie PDF od ${activeReview.author_name}`}
												title="Otwórz referencję PDF"
											>
												<ExternalLink size={24} />
											</a>
										</div>
									{/if}
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
		--angle: calc(-90deg + (360deg * (var(--index) / var(--total))));
		--radius: 160px;
		transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--radius))
			rotate(calc(-1 * var(--angle)));
		transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
	}
</style>
