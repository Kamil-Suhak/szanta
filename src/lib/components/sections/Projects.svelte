<script lang="ts">
	import manifest from '$lib/data/projects-manifest.json';
	import { sectionData } from '$lib/lang/pl/projects';
	import EnhancedImage from '$lib/components/ui/EnhancedImage.svelte';
	import { X, ChevronLeft, ChevronRight, Star } from 'lucide-svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Button from '../ui/Button.svelte';
	import Comparison from './Comparison.svelte';

	let activeCategory = $state(sectionData.all);
	let selectedProject = $state<(typeof manifest.projects)[0] | null>(null);
	let isMobile = $state(false);
	let slideDirection = $state(1);

	let touchStartY = $state(0);
	let touchCurrentY = $state(0);
	let isDraggingDrawer = $state(false);
	const SWIPE_THRESHOLD = 100;

	let currentPage = $state(0);
	let itemsPerPage = $state(4);
	let swipeProjectsStartX = 0;
	const SWIPE_X_THRESHOLD = 50;
	let transitionType = $state<'page' | 'category'>('category');

	function setCategory(category: string) {
		transitionType = 'category';
		const oldIdx = manifest.categories.indexOf(activeCategory);
		const newIdx = manifest.categories.indexOf(category);
		slideDirection = newIdx >= oldIdx ? 1 : -1;
		activeCategory = category;
		currentPage = 0;
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			const mql = window.matchMedia('(max-width: 1023px)');
			isMobile = mql.matches;

			const handleChange = (e: MediaQueryListEvent) => {
				isMobile = e.matches;
			};

			mql.addEventListener('change', handleChange);

			function handleResize() {
				if (window.innerWidth >= 1280) itemsPerPage = 16;
				else if (window.innerWidth >= 1024) itemsPerPage = 12;
				else if (window.innerWidth >= 640) itemsPerPage = 8;
				else itemsPerPage = 4;
			}
			handleResize();
			window.addEventListener('resize', handleResize);

			return () => {
				mql.removeEventListener('change', handleChange);
				window.removeEventListener('resize', handleResize);
			};
		}
	});

	let allProjects = $derived(
		activeCategory === sectionData.all
			? manifest.projects
			: activeCategory === sectionData.featured
				? manifest.projects.filter((p) => p.isFeatured)
				: manifest.projects.filter((p) => p.category === activeCategory)
	);

	let totalPages = $derived(Math.ceil(allProjects.length / itemsPerPage));

	$effect(() => {
		if (currentPage >= totalPages && totalPages > 0) {
			currentPage = totalPages - 1;
		}
	});

	let filteredProjects = $derived(
		allProjects.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
	);

	function setPage(page: number) {
		transitionType = 'page';
		slideDirection = page > currentPage ? 1 : -1;
		currentPage = page;
	}

	function handleProjectsTouchStart(e: TouchEvent) {
		swipeProjectsStartX = e.touches[0].clientX;
	}

	function handleProjectsTouchEnd(e: TouchEvent) {
		const diff = swipeProjectsStartX - e.changedTouches[0].clientX;
		if (Math.abs(diff) > SWIPE_X_THRESHOLD) {
			if (diff > 0 && currentPage < totalPages - 1) {
				setPage(currentPage + 1);
			} else if (diff < 0 && currentPage > 0) {
				setPage(currentPage - 1);
			}
		}
	}

	$effect(() => {
		if (typeof document !== 'undefined') {
			if (selectedProject) {
				document.documentElement.classList.add('no-scroll');
				return () => {
					document.documentElement.classList.remove('no-scroll');
				};
			}
		}
	});

	function handleTouchStartDrawer(e: TouchEvent) {
		touchStartY = e.touches[0].clientY;
		isDraggingDrawer = true;
	}

	function handleTouchMoveDrawer(e: TouchEvent) {
		if (!isDraggingDrawer) return;
		const y = e.touches[0].clientY;
		if (y > touchStartY) {
			touchCurrentY = y - touchStartY;
		}
	}

	function handleTouchEndDrawer() {
		if (!isDraggingDrawer) return;
		isDraggingDrawer = false;
		if (touchCurrentY > SWIPE_THRESHOLD) {
			selectedProject = null;
		}
		touchCurrentY = 0;
	}

	function dynamicIn(node: Element, params: { delay?: number } = {}) {
		if (transitionType === 'page') {
			return fly(node, {
				x: slideDirection * 80,
				duration: 350,
				delay: params.delay || 0,
				opacity: 0
			});
		}
		return scale(node, { start: 0.95, duration: 350, delay: params.delay || 0, opacity: 0 });
	}

	function dynamicOut(node: Element) {
		if (transitionType === 'page') {
			return fly(node, { x: slideDirection * -80, duration: 250, opacity: 0 });
		}
		return scale(node, { start: 1.02, duration: 250, opacity: 0 });
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') selectedProject = null;
	}}
/>

<section id="realizacje" class="relative bg-white py-24">
	<div class="container mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-16">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-extrabold tracking-tight text-(--forest-green) sm:text-5xl">
				{sectionData.title}
			</h2>
			<p class="mx-auto max-w-2xl text-base text-(--text-muted)">
				{sectionData.subtitle}
			</p>
			<div class="mx-auto mt-4 h-1 w-24 rounded bg-(--forest-green)"></div>
		</div>

		<Comparison />

		<div class="mb-8 text-center">
			<h3 class="text-2xl font-extrabold tracking-tight text-text-dark sm:text-3xl">
				{sectionData.otherProjectsTitle}
			</h3>
			<p class="mx-auto mt-2 max-w-xl text-sm text-gray-500">
				{sectionData.otherProjectsSubtitle}
			</p>
		</div>

		<div class="mb-12 flex flex-wrap justify-center gap-3">
			{#each manifest.categories as category (category)}
				<button
					class="flex items-center gap-1.5 rounded-full border px-6 py-2 text-sm font-semibold transition-colors duration-300
						{category === sectionData.featured
						? activeCategory === category
							? 'border-yellow-400 bg-yellow-400 text-white shadow-md'
							: 'border-yellow-400 bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
						: activeCategory === category
							? 'border-forest-green bg-forest-green text-white shadow-md'
							: 'border-forest-green bg-transparent text-text-dark hover:bg-gray-100'}"
					onclick={() => setCategory(category)}
				>
					{#if category === sectionData.featured}
						<Star
							class="h-4 w-4 {activeCategory === category
								? 'fill-white text-white'
								: 'fill-yellow-500 text-yellow-500'}"
						/>
					{/if}
					{category}
				</button>
			{/each}
		</div>

		<div
			class="relative mt-16 overflow-hidden"
			ontouchstart={handleProjectsTouchStart}
			ontouchend={handleProjectsTouchEnd}
			role="group"
			aria-roledescription="carousel"
			aria-label={sectionData.title}
		>
			<div class="grid grid-cols-1 grid-rows-1">
				{#key `${activeCategory}-${currentPage}`}
					<div
						class="col-start-1 row-start-1 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12 xl:grid-cols-4"
						in:dynamicIn={{ delay: 200 }}
						out:dynamicOut
					>
						{#each filteredProjects as project (project.projectId)}
							<button
								class="group col-span-1 w-full cursor-pointer self-start text-left focus:outline-none"
								onclick={() => (selectedProject = project)}
							>
								<div
									class="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-transform duration-300 group-hover:-translate-y-1.5"
								>
									<div class="aspect-4/3 w-full overflow-hidden">
										<EnhancedImage
											src={project.images[0]}
											alt={project.projectName}
											class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103"
										/>
									</div>

									<div class="bg-white p-6">
										<div>
											<div class="mb-2 flex items-center justify-between gap-2">
												<span
													class="block text-[10px] font-extrabold tracking-widest text-forest-green uppercase"
												>
													{project.category}
												</span>
												{#if project.isFeatured}
													<div
														class="flex items-center text-[10px] font-bold tracking-wider uppercase"
													>
														<span
															class="mr-0 rounded-lg rounded-r-none bg-yellow-100 py-1 pl-2 text-yellow-800"
														>
															{sectionData.featured}
														</span>
														<Star
															class="mx-0 inline-block h-5.5 w-5.5 rounded-lg rounded-l-none bg-yellow-100 fill-yellow-500 px-1 py-0.5 text-yellow-500"
														/>
													</div>
												{/if}
											</div>
											<h3
												class="text-lg leading-snug font-extrabold text-text-dark transition-colors duration-300 group-hover:text-forest-green"
											>
												{project.projectName}
											</h3>
										</div>
										<div
											class="mt-4 flex items-center gap-1 text-sm font-bold text-forest-green opacity-0 transition-opacity duration-300 group-hover:opacity-100"
										>
											<span>{sectionData.details}</span>
											<ChevronRight
												size={16}
												class="transition-transform group-hover:translate-x-1"
											/>
										</div>
									</div>
								</div>
							</button>
						{/each}

						{#if filteredProjects.length === 0}
							<div class="col-span-full py-16 text-center text-gray-500">
								{sectionData.emptyState}
							</div>
						{/if}
					</div>
				{/key}
			</div>
		</div>

		{#if totalPages > 1}
			<div class="mt-12 flex items-center justify-center gap-2">
				<button
					class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-gray-100 disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent"
					disabled={currentPage === 0}
					onclick={() => setPage(currentPage - 1)}
					aria-label="Poprzednia strona"
				>
					<ChevronLeft size={20} class="text-gray-600" />
				</button>

				<div class="flex gap-1.5">
					{#each Array(totalPages) as _, i (i)}
						<button
							class="h-2.5 rounded-full transition-all duration-300 {currentPage === i
								? 'w-6 bg-forest-green'
								: 'w-2.5 bg-gray-300 hover:bg-gray-400'}"
							onclick={() => setPage(i)}
							aria-label={`Strona ${i + 1}`}
						></button>
					{/each}
				</div>

				<button
					class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-gray-100 disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent"
					disabled={currentPage === totalPages - 1}
					onclick={() => setPage(currentPage + 1)}
					aria-label="Następna strona"
				>
					<ChevronRight size={20} class="text-gray-600" />
				</button>
			</div>
		{/if}
	</div>
</section>

{#if selectedProject}
	<div class="fixed inset-0 z-1100 flex lg:justify-end">
		<button
			type="button"
			aria-label="Zamknij"
			class="absolute inset-0 w-full cursor-default border-none bg-black/60 transition-opacity {isMobile
				? ''
				: 'backdrop-blur-sm'}"
			transition:fade={{ duration: 300 }}
			onclick={() => (selectedProject = null)}
		></button>

		<div
			class="relative flex w-full flex-col bg-white shadow-2xl lg:my-4 lg:h-[calc(100vh-2rem)] lg:w-[450px] lg:rounded-l-3xl lg:py-4 {isMobile
				? 'mt-auto max-h-[90vh] overflow-hidden rounded-t-3xl'
				: 'overflow-hidden'}"
			in:fly={{ y: isMobile ? 1000 : 0, x: isMobile ? 0 : 500, duration: 400, opacity: 1 }}
			out:fly={{ y: isMobile ? 1000 : 0, x: isMobile ? 0 : 500, duration: 300, opacity: 1 }}
			style={isMobile && isDraggingDrawer
				? `transform: translateY(${touchCurrentY}px); transition: none;`
				: ''}
		>
			{#if isMobile}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="flex w-full cursor-grab items-center justify-center pt-4 pb-2 active:cursor-grabbing"
					ontouchstart={handleTouchStartDrawer}
					ontouchmove={handleTouchMoveDrawer}
					ontouchend={handleTouchEndDrawer}
				>
					<div class="h-1.5 w-12 rounded-full bg-gray-300"></div>
				</div>
			{/if}

			{#if !isMobile}
				<button
					class="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-md transition-colors hover:bg-gray-100"
					onclick={() => (selectedProject = null)}
				>
					<X size={20} class="text-gray-600" />
				</button>
			{/if}

			<div class="flex-1 overflow-y-auto px-6 pb-8 {isMobile ? 'pt-2' : 'pt-4'}">
				<div class="mb-8 flex flex-col gap-4">
					{#each selectedProject.images as image (image)}
						<EnhancedImage
							src={image}
							alt={selectedProject.projectName}
							class="max-h-[300px] w-full rounded-2xl object-cover shadow-sm lg:max-h-[400px]"
						/>
					{/each}
				</div>

				<div class="prose prose-lg max-w-none">
					<div class="mb-2 flex items-center justify-between gap-2">
						<span
							class="inline-block rounded-full bg-forest-green/10 px-3 py-1 text-xs font-bold tracking-widest text-forest-green uppercase"
						>
							{selectedProject.category}
						</span>
						{#if selectedProject.isFeatured}
							<div class="flex items-center text-xs font-bold tracking-widest uppercase">
								<span
									class="mr-0 rounded-lg rounded-r-none bg-yellow-100 py-1 pl-2 text-yellow-800"
								>
									{sectionData.featured}
								</span>
								<Star
									class="mx-0 inline-block h-6.5 w-6.5 rounded-lg rounded-l-none bg-yellow-100 fill-yellow-500 px-1.5 py-0.5 text-yellow-500"
								/>
							</div>
						{/if}
					</div>
					<h2 class="mb-6 text-3xl leading-tight font-extrabold text-text-dark">
						{selectedProject.projectName}
					</h2>
					<p class="leading-relaxed text-gray-600">
						{selectedProject.description}
					</p>
				</div>

				<div class="mt-12">
					<Button
						href="#kontakt"
						class="block w-full px-8 py-4 text-center text-lg no-underline"
						onclick={() => (selectedProject = null)}
					>
						{sectionData.ctaDetails}
					</Button>
				</div>
			</div>
		</div>
	</div>
{/if}
