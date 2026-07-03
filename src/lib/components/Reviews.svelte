<script lang="ts">
	import { reviewsData } from '$lib/lang/pl/reviews';
	import { Quote, Star } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let activeIndex = $state(0);
	let activeReview = $derived(reviewsData.items[activeIndex]);
	let isHovered = $state(false);

	let autoplayInterval: ReturnType<typeof setInterval>;

	function startAutoplay() {
		stopAutoplay(); // Ensure no duplicates
		autoplayInterval = setInterval(() => {
			if (!isHovered && !document.hidden) {
				activeIndex = (activeIndex + 1) % reviewsData.items.length;
			}
		}, 5000);
	}

	function stopAutoplay() {
		if (autoplayInterval) clearInterval(autoplayInterval);
	}

	function handleVisibilityChange() {
		if (document.hidden) {
			stopAutoplay();
		} else {
			startAutoplay();
		}
	}

	onMount(() => {
		startAutoplay();
		document.addEventListener('visibilitychange', handleVisibilityChange);
		return () => {
			stopAutoplay();
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	});

	function setActive(index: number) {
		activeIndex = index;
		// Reset autoplay timer when user clicks so it doesn't immediately switch
		startAutoplay();
	}
</script>

<section id="opinie" class="relative overflow-hidden bg-white py-16 sm:py-24">
	<!-- Decorative background organic shapes -->
	<div class="absolute top-1/4 -right-20 h-96 w-96 rounded-full bg-(--forest-green)/5 blur-3xl"></div>
	<div class="absolute bottom-1/4 -left-20 h-96 w-96 rounded-full bg-(--forest-green)/5 blur-3xl"></div>

	<div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
		<!-- Section Header -->
		<div class="mb-12 text-center">
			<h2 class="mb-3 text-3xl font-extrabold tracking-tight text-(--forest-green) sm:text-4xl">
				{reviewsData.title}
			</h2>
			<p class="mx-auto max-w-2xl text-base text-(--text-muted)">
				{reviewsData.subtitle}
			</p>
			<div class="mx-auto mt-4 h-1 w-20 rounded bg-(--forest-green)"></div>
		</div>

		<!-- Semi-Circular Layout -->
		<div
			class="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center"
			onmouseenter={() => (isHovered = true)}
			onmouseleave={() => (isHovered = false)}
			role="region"
			aria-label="Opinie klientów"
		>
			<!-- Avatars Half-Moon (Top Arc on Mobile, Right Arc on Desktop) -->
			<div class="lg:col-span-5 relative h-[180px] sm:h-[200px] lg:h-[440px] w-full mt-8 lg:mt-0">
				
				<!-- Origin Point for Avatars -->
				<div class="absolute bottom-0 left-1/2 lg:top-1/2 lg:bottom-auto lg:left-0 z-40">
					{#each reviewsData.items as review, i (review.id)}
						<div class="absolute avatar-position" style="--index: {i}; --total: {reviewsData.items.length};">
							<button
								onclick={() => setActive(i)}
								class="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full overflow-hidden font-bold border-2 transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-(--forest-green)/30
									{activeIndex === i 
										? 'border-(--forest-green) shadow-[0_10px_20px_-5px_rgba(45,132,53,0.4)] scale-125 z-40' 
										: 'border-(--forest-green)/20 shadow-sm hover:border-(--forest-green) hover:scale-110 hover:z-50 cursor-pointer'}"
								aria-label={`Pokaż opinię od ${review.author_name}`}
								aria-current={activeIndex === i ? 'true' : 'false'}
							>
								<svg 
									class="h-full w-full transition-colors duration-500
										{activeIndex === i 
											? 'text-(--forest-green) bg-linear-to-br from-(--forest-green)/15 to-(--forest-green)/5' 
											: 'text-gray-400 bg-linear-to-br from-gray-100 to-gray-50 group-hover:text-gray-500 group-hover:from-gray-50 group-hover:to-gray-100/50'}" 
									fill="currentColor" 
									viewBox="0 0 24 24"
								>
									<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
								</svg>
								
								<!-- Tooltip on hover -->
								<div class="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:-top-12 group-hover:opacity-100 hidden sm:block">
									{review.author_name}
									<div class="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
								</div>
							</button>
						</div>
					{/each}
				</div>

				<!-- Decorative Dashed Half-Circle behind avatars -->
				<div class="absolute bottom-0 left-1/2 w-[220px] h-[220px] -translate-x-1/2 translate-y-1/2 rounded-full border border-dashed border-(--forest-green)/30 lg:top-1/2 lg:bottom-auto lg:left-0 lg:-translate-y-1/2 lg:w-[320px] lg:h-[320px] z-10 transition-all duration-700"></div>
				
				<!-- Inner Decorative Circle -->
				<div class="absolute bottom-0 left-1/2 w-[120px] h-[120px] -translate-x-1/2 translate-y-1/2 rounded-full border border-solid border-(--forest-green)/10 lg:top-1/2 lg:bottom-auto lg:left-0 lg:-translate-y-1/2 lg:w-[180px] lg:h-[180px] z-10"></div>
			</div>

			<!-- Review Text Container -->
			<div class="lg:col-span-7 relative z-30">
				<div class="relative rounded-3xl bg-linear-to-br from-gray-50 to-white p-6 shadow-xl border border-gray-100 sm:p-10 transition-transform duration-500 lg:hover:-translate-y-1 lg:-ml-10 backdrop-blur-sm">
					<!-- Large Quote Icon -->
					<div class="absolute -top-3 -left-1 sm:-top-6 sm:-left-6 text-(--forest-green)/10 transition-transform duration-500 group-hover:scale-110 pointer-events-none">
						<Quote class="h-14 w-14 sm:h-20 sm:w-20" strokeWidth={1} fill="currentColor" />
					</div>

					<!-- Use CSS Grid for overlap to prevent snapping during transition -->
					<!-- Changed from min-h to a static h-[260px] to prevent resizing -->
					<div class="grid relative h-[260px] w-full">
						{#key activeIndex}
							<div 
								class="col-start-1 row-start-1 flex flex-col h-full"
								in:fade={{ duration: 300, delay: 150 }}
								out:fade={{ duration: 150 }}
							>
								<!-- Star Rating -->
								<div class="mb-4 flex gap-1 text-amber-400 pl-6 sm:pl-0 pt-2 sm:pt-0">
									{#each Array(activeReview.rating) as _, i (i)}
										<Star size={20} fill="currentColor" strokeWidth={0} />
									{/each}
								</div>

								<!-- Review Text -->
								<!-- Added line-clamp to truncate responsively at full words with an ellipsis -->
								<blockquote class="mb-6 text-lg sm:text-xl font-medium leading-relaxed text-(--text-dark) italic line-clamp-4 sm:line-clamp-5">
									{activeReview.text}
								</blockquote>

								<!-- Author Info (Pushed to bottom via mt-auto) -->
								<div class="mt-auto flex items-center gap-4 border-t border-gray-200/60 pt-4">
									<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-(--forest-green)/20 shadow-md lg:hidden overflow-hidden">
										<svg 
											class="h-full w-full text-(--forest-green) bg-linear-to-br from-(--forest-green)/15 to-(--forest-green)/5" 
											fill="currentColor" 
											viewBox="0 0 24 24"
										>
											<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
										</svg>
									</div>
									<div>
										<div class="font-bold text-base text-(--text-dark)">{activeReview.author_name}</div>
										<div class="text-xs font-medium text-(--text-muted)">{activeReview.relative_time_description}</div>
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
		/* Default to Mobile Top Arc */
		--angle: calc(-170deg + 160deg * (var(--index) / max(1, var(--total) - 1)));
		--radius: 110px;
		/* Translate -50% centers the avatar exactly on the origin before rotation */
		transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--radius)) rotate(calc(-1 * var(--angle)));
		transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
	}

	@media (min-width: 1024px) {
		.avatar-position {
			/* Desktop Right Arc */
			--angle: calc(-75deg + 150deg * (var(--index) / max(1, var(--total) - 1)));
			--radius: 160px;
		}
	}
</style>
