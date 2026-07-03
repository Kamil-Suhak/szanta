<script lang="ts">
	import manifest from '$lib/data/projects-manifest.json';
	import { sectionData } from '$lib/lang/pl/projects';
	import CloudflareImage from '../../util/CloudflareImage.svelte';
	import { X, ChevronLeft, ChevronRight, Star } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte';
	import Button from './Button.svelte';

	let activeCategory = $state(sectionData.all);
	let selectedProject = $state<(typeof manifest.projects)[0] | null>(null);
	let isMobile = $state(false);

	let activeBeforeAfterIdx = $state(0);
	let sliderPos = $state(50);
	let isDraggingSlider = $state(false);
	let sliderContainer = $state<HTMLElement | null>(null);

	let touchStartY = $state(0);
	let touchCurrentY = $state(0);
	let isDraggingDrawer = $state(false);
	const SWIPE_THRESHOLD = 100;

	function checkMobile() {
		if (typeof window !== 'undefined') {
			isMobile = window.innerWidth < 1024;
		}
	}

	onMount(() => {
		checkMobile();
	});

	let filteredProjects = $derived(
		activeCategory === sectionData.all
			? manifest.projects
			: activeCategory === sectionData.featured
				? manifest.projects.filter((p) => p.isFeatured)
				: manifest.projects.filter((p) => p.category === activeCategory)
	);

	function getCardClasses(index: number) {
		const patterns = [
			{ span: 'col-span-1 lg:col-span-1', aspect: 'aspect-16/9 lg:aspect-3/4' },
			{ span: 'col-span-1 lg:col-span-2', aspect: 'aspect-16/9 lg:aspect-21/9' },
			{ span: 'col-span-1 lg:col-span-1', aspect: 'aspect-16/9 lg:aspect-square' },
			{ span: 'col-span-1 lg:col-span-1', aspect: 'aspect-16/9 lg:aspect-square' },
			{ span: 'col-span-1 lg:col-span-1', aspect: 'aspect-16/9 lg:aspect-3/4' },
			{ span: 'col-span-1 lg:col-span-2', aspect: 'aspect-16/9 lg:aspect-21/9' }
		];
		return patterns[index % patterns.length];
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

	function updateSlider(clientX: number) {
		if (!sliderContainer) return;
		const rect = sliderContainer.getBoundingClientRect();
		const x = clientX - rect.left;
		sliderPos = Math.max(0, Math.min(100, (x / rect.width) * 100));
	}

	function handleMouseMove(e: MouseEvent) {
		if (isDraggingSlider) updateSlider(e.clientX);
	}

	function handleTouchMoveSlider(e: TouchEvent) {
		if (isDraggingSlider) updateSlider(e.touches[0].clientX);
	}

	function handleKeyDownSlider(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') {
			sliderPos = Math.max(0, sliderPos - 5);
		} else if (e.key === 'ArrowRight') {
			sliderPos = Math.min(100, sliderPos + 5);
		}
	}

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
</script>

<svelte:window 
	onmousemove={handleMouseMove}
	onmouseup={() => isDraggingSlider = false}
	ontouchmove={handleTouchMoveSlider}
	ontouchend={() => isDraggingSlider = false}
	onresize={checkMobile}
	onkeydown={(e) => {
		if (e.key === 'Escape') selectedProject = null;
	}}
/>

<section id="realizacje" class="relative bg-white py-24">
	<div class="container mx-auto max-w-[1200px] px-6 sm:px-12 lg:px-16">
		
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-extrabold tracking-tight text-text-dark sm:text-5xl">
				{sectionData.title}
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600 font-medium sm:text-xl">
				{sectionData.subtitle}
			</p>
			<div class="mx-auto mt-6 h-1.5 w-20 rounded bg-forest-green"></div>
		</div>

		{#if manifest.beforeAfter && manifest.beforeAfter.length > 0}
			<div class="mb-24 bg-gray-50/50 rounded-3xl p-6 md:p-8 lg:p-12 border border-gray-100">
				<div 
					bind:this={sliderContainer}
					class="relative w-full max-w-[950px] mx-auto aspect-16/9 overflow-hidden rounded-2xl shadow-md select-none cursor-ew-resize border border-gray-200 bg-gray-100"
					onmousedown={() => isDraggingSlider = true}
					ontouchstart={() => isDraggingSlider = true}
					onkeydown={handleKeyDownSlider}
					role="slider"
					aria-valuenow={sliderPos}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-label={sectionData.ariaLabel}
					tabindex="0"
				>
					<div class="absolute inset-0 bg-gray-200">
						<CloudflareImage 
							src={manifest.beforeAfter[activeBeforeAfterIdx].afterImage} 
							alt={sectionData.after} 
							class="absolute inset-0 w-full h-full object-cover pointer-events-none" 
						/>
						<div class="absolute bottom-4 right-4 bg-forest-green/95 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg pointer-events-none">
							{sectionData.after}
						</div>
					</div>

					<div 
						class="absolute inset-0 pointer-events-none z-10" 
						style="clip-path: inset(0 {100 - sliderPos}% 0 0);"
						transition:fade={{ duration: 450 }}
					>
						<CloudflareImage 
							src={manifest.beforeAfter[activeBeforeAfterIdx].beforeImage} 
							alt={sectionData.before} 
							class="absolute inset-0 w-full h-full object-cover" 
						/>
						<div class="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg pointer-events-none">
							{sectionData.before}
						</div>
					</div>

					<div 
						class="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
						style="left: {sliderPos}%"
					>
						<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 hover:scale-105 active:scale-95 transition-transform z-30 pointer-events-none">
							<ChevronLeft size={14} class="text-gray-500 mr-0.5" />
							<ChevronRight size={14} class="text-gray-500 ml-0.5" />
						</div>
					</div>
				</div>

				<div class="mt-8 max-w-[950px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-gray-200/60 pt-8">
					<div class="flex-1 grid grid-cols-1 grid-rows-1">
						{#key activeBeforeAfterIdx}
							<div class="col-start-1 row-start-1" transition:fade={{ duration: 350 }}>
								<h3 class="text-2xl font-extrabold tracking-tight text-text-dark mb-2">
									{manifest.beforeAfter[activeBeforeAfterIdx].title}
								</h3>
								<p class="text-sm text-gray-500 max-w-xl leading-relaxed">
									{manifest.beforeAfter[activeBeforeAfterIdx].description}
								</p>
							</div>
						{/key}
					</div>

					<div class="flex flex-wrap items-center gap-4">
						<div class="flex gap-1 bg-gray-200/60 p-1 rounded-full">
							{#each manifest.beforeAfter as item, idx (item.id)}
								<button 
									class="px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300
										{idx === activeBeforeAfterIdx 
											? 'bg-white text-forest-green shadow-sm' 
											: 'text-gray-500 hover:text-text-dark'}"
									onclick={() => {
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
							class="no-underline inline-block px-6 py-3.5 text-center text-sm font-bold tracking-wider"
						>
							{sectionData.ctaBeforeAfter}
						</Button>
					</div>
				</div>
			</div>
		{/if}

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
					onclick={() => activeCategory = category}
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

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mt-16">
			{#each filteredProjects as project, idx (project.projectId)}
				<button 
					animate:flip={{ duration: 400 }}
					in:fade={{ duration: 300 }}
					out:fade={{ duration: 300 }}
					class="group w-full text-left cursor-pointer focus:outline-none self-start {getCardClasses(idx).span}"
					onclick={() => selectedProject = project}
				>
					<div class="w-full overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-white transition-transform duration-300 group-hover:-translate-y-1.5">
						<div class="w-full overflow-hidden {getCardClasses(idx).aspect}">
							<CloudflareImage 
								src={project.images[0]} 
								alt={project.projectName} 
								class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" 
							/>
						</div>
						
						<div class="p-6 bg-white">
							<div>
								<div class="mb-2 flex items-center justify-between gap-2">
									<span class="block text-[10px] font-extrabold tracking-widest text-forest-green uppercase">
										{project.category}
									</span>
									{#if project.isFeatured}
										<div class="flex items-center text-[10px] font-bold tracking-wider uppercase">
											<span class="mr-0 rounded-lg rounded-r-none bg-yellow-100 py-1 pl-2 text-yellow-800">
												{sectionData.featured}
											</span>
											<Star class="mx-0 inline-block h-5.5 w-5.5 rounded-lg rounded-l-none bg-yellow-100 fill-yellow-500 px-1 py-0.5 text-yellow-500" />
										</div>
									{/if}
								</div>
								<h3 class="text-lg font-extrabold text-text-dark leading-snug group-hover:text-forest-green transition-colors duration-300">
									{project.projectName}
								</h3>
							</div>
							<div class="mt-4 flex items-center text-sm font-bold text-forest-green gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<span>{sectionData.details}</span>
								<ChevronRight size={16} class="transition-transform group-hover:translate-x-1" />
							</div>
						</div>
					</div>
				</button>
			{/each}

			{#if filteredProjects.length === 0}
				<div class="col-span-full py-16 text-center text-gray-500" transition:fade>
					{sectionData.emptyState}
				</div>
			{/if}
		</div>

	</div>
</section>

{#if selectedProject}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="fixed inset-0 z-1100 flex lg:justify-end">
		<div
			class="absolute inset-0 bg-black/60 transition-opacity {isMobile ? '' : 'backdrop-blur-sm'}"
			transition:fade={{ duration: 300 }}
			onclick={() => selectedProject = null}
		></div>

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
					onclick={() => selectedProject = null}
				>
					<X size={20} class="text-gray-600" />
				</button>
			{/if}

			<div class="flex-1 overflow-y-auto px-6 pb-8 {isMobile ? 'pt-2' : 'pt-4'}">
				<div class="mb-8 flex flex-col gap-4">
					{#each selectedProject.images as image (image)}
						<CloudflareImage
							src={image}
							alt={selectedProject.projectName}
							class="w-full max-h-[300px] lg:max-h-[400px] rounded-2xl object-cover shadow-sm"
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
								<span class="mr-0 rounded-lg rounded-r-none bg-yellow-100 py-1 pl-2 text-yellow-800">
									{sectionData.featured}
								</span>
								<Star class="mx-0 inline-block h-6.5 w-6.5 rounded-lg rounded-l-none bg-yellow-100 fill-yellow-500 px-1.5 py-0.5 text-yellow-500" />
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
						onclick={() => selectedProject = null}
					>
						{sectionData.ctaDetails}
					</Button>
				</div>
			</div>
		</div>
	</div>
{/if}
