<script lang="ts">
	import { projects, categories, sectionData } from '$lib/lang/pl/projects';
	import { X, ChevronLeft, ChevronRight, Star } from 'lucide-svelte';
	import FormattedText from '$lib/components/FormattedText.svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte';

	let activeCategory = $state('Wszystkie');
	let currentPage = $state(1);
	let selectedProject = $state<(typeof projects)[0] | null>(null);
	let isMobile = $state(false);

	// Touch gesture states for mobile bottom sheet
	let touchStartY = $state(0);
	let touchCurrentY = $state(0);
	let isDragging = $state(false);
	const SWIPE_THRESHOLD = 100;

	onMount(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < 1024; // lg breakpoint
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	});

	// Derived state for filtering and pagination
	let filteredProjects = $derived(
		activeCategory === 'Wszystkie'
			? projects
			: activeCategory === 'Wyróżnione'
				? projects.filter((p: any) => p.isFeatured)
				: projects.filter((p) => p.category === activeCategory)
	);

	let itemsPerPage = $derived(isMobile ? 3 : 6);
	let totalPages = $derived(Math.ceil(filteredProjects.length / itemsPerPage));

	let paginatedProjects = $derived(
		filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	);

	// Body scroll lock when modal open
	$effect(() => {
		if (typeof document !== 'undefined') {
			if (selectedProject) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}
		}
	});

	// Touch handlers for bottom sheet
	function handleTouchStart(e: TouchEvent) {
		touchStartY = e.touches[0].clientY;
		isDragging = true;
	}

	function handleTouchMove(e: TouchEvent) {
		if (!isDragging) return;
		const y = e.touches[0].clientY;
		if (y > touchStartY) {
			touchCurrentY = y - touchStartY;
		}
	}

	function handleTouchEnd() {
		if (!isDragging) return;
		isDragging = false;
		if (touchCurrentY > SWIPE_THRESHOLD) {
			selectedProject = null;
		}
		touchCurrentY = 0;
	}
</script>

<section id="realizacje" class="relative bg-white py-24">
	<div class="container mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-4xl font-extrabold tracking-tight text-(--forest-green) sm:text-5xl">
				{sectionData.title}
			</h2>
			<p class="mb-6 text-lg font-medium text-gray-600 sm:text-xl">
				<FormattedText text={sectionData.subtitle} />
			</p>
			<div class="mx-auto h-1 w-24 rounded bg-(--forest-green)"></div>
		</div>

		<!-- Category Filters -->
		<div class="mb-12 flex flex-wrap justify-center gap-3">
			{#each categories as category (category)}
				<button
					class="flex items-center gap-1.5 rounded-full border px-6 py-2 text-sm font-semibold transition-colors duration-300
						{category === 'Wyróżnione'
						? activeCategory === category
							? 'border-yellow-400 bg-yellow-400 text-white shadow-md'
							: 'border-yellow-400 bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
						: activeCategory === category
							? 'border-(--forest-green) bg-(--forest-green) text-white shadow-md'
							: 'border-(--forest-green) bg-transparent text-(--text-dark) hover:bg-gray-100'}"
					onclick={() => {
						activeCategory = category;
						currentPage = 1;
					}}
				>
					{#if category === 'Wyróżnione'}
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

		<!-- Projects Grid -->
		<div class="grid min-h-[400px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each paginatedProjects as project (project.id)}
				<button
					animate:flip={{ duration: 400 }}
					in:fade={{ duration: 300 }}
					out:fade={{ duration: 300 }}
					class="group w-full cursor-pointer text-left transition-transform duration-300 hover:-translate-y-2"
					onclick={() => (selectedProject = project)}
				>
					<!-- Thumbnail Image (Top rounded only) -->
					<div class="aspect-4/3 w-full overflow-hidden rounded-t-2xl">
						<img
							src={project.images[0].url}
							alt={project.title}
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
							loading="lazy"
						/>
					</div>
					<!-- Title Bar (Bottom rounded only) -->
					<div
						class="rounded-b-2xl border border-t-0 border-gray-100 bg-white p-5 shadow-sm transition-shadow duration-300 group-hover:shadow-md"
					>
						<span
							class="mb-2 block text-xs font-bold tracking-wider text-(--forest-green) uppercase"
						>
							{project.category}
						</span>
						<h3 class="text-xl font-bold text-(--text-dark)">
							{project.title}
						</h3>
					</div>
				</button>
			{/each}

			{#if paginatedProjects.length === 0}
				<div class="col-span-full py-12 text-center text-gray-500" in:fade>
					{sectionData.emptyState}
				</div>
			{/if}
		</div>

		<!-- Pagination -->
		{#if totalPages > 1}
			<div class="mt-12 flex items-center justify-center gap-4">
				<button
					class="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-(--forest-green) disabled:opacity-50"
					disabled={currentPage === 1}
					onclick={() => currentPage--}
				>
					<ChevronLeft size={20} />
				</button>
				<span class="text-sm font-semibold text-gray-600">
					{currentPage} z {totalPages}
				</span>
				<button
					class="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-(--forest-green) disabled:opacity-50"
					disabled={currentPage === totalPages}
					onclick={() => currentPage++}
				>
					<ChevronRight size={20} />
				</button>
			</div>
		{/if}
	</div>
</section>

<!-- Drawer / Bottom Sheet Modal -->
{#if selectedProject}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="fixed inset-0 z-1100 flex lg:justify-end">
		<!-- Backdrop -->
		<div
			class="absolute inset-0 bg-black/60 transition-opacity {isMobile ? '' : 'backdrop-blur-sm'}"
			transition:fade={{ duration: 300 }}
			onclick={() => (selectedProject = null)}
		></div>

		<!-- Content Panel (Right Drawer on Desktop, Bottom Sheet on Mobile) -->
		<div
			class="relative flex w-full flex-col bg-white shadow-2xl lg:my-4 lg:h-[calc(100vh-2rem)] lg:w-[450px] lg:rounded-l-3xl lg:py-4 {isMobile
				? 'mt-auto max-h-[90vh] overflow-hidden rounded-t-3xl'
				: 'overflow-hidden'}"
			in:fly={{ y: isMobile ? 1000 : 0, x: isMobile ? 0 : 500, duration: 400, opacity: 1 }}
			out:fly={{ y: isMobile ? 1000 : 0, x: isMobile ? 0 : 500, duration: 300, opacity: 1 }}
			style={isMobile && isDragging
				? `transform: translateY(${touchCurrentY}px); transition: none;`
				: ''}
		>
			<!-- Mobile Drag Handle -->
			{#if isMobile}
				<div
					class="flex w-full cursor-grab items-center justify-center pt-4 pb-2 active:cursor-grabbing"
					ontouchstart={handleTouchStart}
					ontouchmove={handleTouchMove}
					ontouchend={handleTouchEnd}
				>
					<div class="h-1.5 w-12 rounded-full bg-gray-300"></div>
				</div>
			{/if}

			<!-- Close Button (Desktop) -->
			{#if !isMobile}
				<button
					class="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-md transition-colors hover:bg-gray-100"
					onclick={() => (selectedProject = null)}
				>
					<X size={20} class="text-gray-600" />
				</button>
			{/if}

			<!-- Scrollable Content -->
			<div class="flex-1 overflow-y-auto px-6 pb-8 {isMobile ? 'pt-2' : 'pt-4'}">
				<!-- Images Stack -->
				<div class="mb-8 flex flex-col gap-4">
					{#each selectedProject.images as image (image.url)}
						<img
							src={image.url}
							alt={image.alt}
							class="w-full rounded-2xl object-cover shadow-sm"
							loading="lazy"
						/>
					{/each}
				</div>

				<!-- Text Content -->
				<div class="prose prose-lg max-w-none">
					<span
						class="mb-2 inline-block rounded-full bg-(--forest-green)/10 px-3 py-1 text-xs font-bold tracking-widest text-(--forest-green) uppercase"
					>
						{selectedProject.category}
					</span>
					<h2 class="mb-6 text-3xl leading-tight font-extrabold text-(--text-dark)">
						{selectedProject.title}
					</h2>
					<p class="leading-relaxed text-gray-600">
						{selectedProject.description}
					</p>
				</div>

				<!-- Action -->
				<div class="mt-12">
					<a
						href="#kontakt"
						class="btn-primary block w-full px-8 py-4 text-center text-lg"
						onclick={() => (selectedProject = null)}
					>
						Chcę podobny projekt
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}
