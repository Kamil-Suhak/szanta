<script lang="ts">
	import { sklepData } from '$lib/lang/pl/sklep';
	import EnhancedImage from '../../util/EnhancedImage.svelte';
	import { ChevronLeft, ChevronRight, Menu, X, ChevronDown } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';

	let activeCategoryId = $state(sklepData.categories[0].id);
	let isMobileSidebarOpen = $state(false);

	let filteredProducts = $derived(
		sklepData.products.filter((p) => p.categoryId === activeCategoryId)
	);

	let imageIndices = $state<Record<string, number>>({});

	function nextImage(productId: string, totalImages: number) {
		const current = imageIndices[productId] || 0;
		imageIndices[productId] = (current + 1) % totalImages;
	}

	function prevImage(productId: string, totalImages: number) {
		const current = imageIndices[productId] || 0;
		imageIndices[productId] = (current - 1 + totalImages) % totalImages;
	}

</script>

<section class="relative min-h-screen bg-gray-50 pt-32 pb-24">
	<div class="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h1 class="text-4xl font-extrabold tracking-tight text-(--forest-green) sm:text-5xl">
				{sklepData.title}
			</h1>
			<div class="mx-auto mt-4 h-1 w-24 rounded bg-(--forest-green)"></div>
		</div>

		<div class="relative flex flex-col gap-6 lg:flex-row lg:gap-8">
			<!-- Mobile Dropdown Wrapper -->
			<div class="relative z-40 w-full lg:hidden">
				<button
					class="relative z-50 flex w-full items-center justify-between rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm focus:outline-none"
					onclick={() => (isMobileSidebarOpen = !isMobileSidebarOpen)}
				>
					<span class="font-bold">Kategorie</span>
					<ChevronDown size={20} class="transition-transform duration-300 {isMobileSidebarOpen ? 'rotate-180' : ''}" />
				</button>
				
				{#if isMobileSidebarOpen}
					<div 
						class="absolute left-0 top-full z-40 mt-2 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl"
						transition:slide={{ duration: 300 }}
					>
						<ul class="max-h-[60vh] space-y-1 overflow-y-auto">
							{#each sklepData.categories as category}
								<li>
									<button
										class="w-full rounded-xl px-4 py-3 text-left font-medium transition-all duration-300 {activeCategoryId ===
										category.id
											? 'bg-(--forest-green) text-white shadow-md'
											: 'text-(--text-muted) hover:bg-(--forest-green)/10'}"
										onclick={() => {
											activeCategoryId = category.id;
											isMobileSidebarOpen = false;
										}}
									>
										{category.name}
									</button>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>

			<!-- Desktop Sidebar -->
			<div class="hidden w-72 shrink-0 lg:block">
				<div class="sticky top-28 flex h-[calc(100vh-9rem)] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
					<h2 class="mb-4 shrink-0 px-4 text-lg font-bold text-(--text-dark)">Kategorie</h2>
					<ul class="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
						{#each sklepData.categories as category}
							<li>
								<button
									class="w-full rounded-xl px-4 py-3 text-left font-medium transition-all duration-300 {activeCategoryId ===
									category.id
										? 'bg-(--forest-green) text-white shadow-md'
										: 'text-(--text-muted) hover:bg-(--forest-green)/10'}"
									onclick={() => {
										activeCategoryId = category.id;
									}}
								>
									{category.name}
								</button>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<div class="flex-1">
				<div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
					{#each filteredProducts as product (product.id)}
						{@const currentIdx = imageIndices[product.id] || 0}
						<div
							class="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-transform hover:-translate-y-1"
							in:fade
						>
							<div class="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
								<EnhancedImage
									src={product.images[currentIdx]}
									alt={product.name}
									class="h-full w-full object-cover"
								/>

								{#if product.images.length > 1}
									<button
										class="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-gray-800 shadow-md transition-colors hover:bg-white"
										onclick={() => prevImage(product.id, product.images.length)}
										aria-label={sklepData.buttons.prevImage}
									>
										<ChevronLeft size={18} />
									</button>
									<button
										class="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-gray-800 shadow-md transition-colors hover:bg-white"
										onclick={() => nextImage(product.id, product.images.length)}
										aria-label={sklepData.buttons.nextImage}
									>
										<ChevronRight size={18} />
									</button>
									<div class="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
										{#each product.images as _, i}
											<div
												class="h-1.5 w-1.5 rounded-full {i === currentIdx
													? 'bg-white'
													: 'bg-white/50'}"
											></div>
										{/each}
									</div>
								{/if}
							</div>

							<div class="flex flex-1 flex-col p-6">
								<h3
									class="mb-3 text-xl font-bold text-(--text-dark) transition-colors group-hover:text-(--forest-green)"
								>
									{product.name}
								</h3>
								<div class="mb-4 text-(--text-muted)">
									<p>
										{product.description}
									</p>
								</div>
							</div>
						</div>
					{/each}

					{#if filteredProducts.length === 0}
						<div class="col-span-full py-16 text-center text-gray-500 bg-white rounded-2xl border border-gray-100">
							Brak produktów w tej kategorii.
						</div>
					{/if}
				</div>

				<!-- Global Shop CTA -->
				<div class="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<span class="text-center text-lg font-medium text-(--text-dark)">
						Znalazłeś to, czego szukałeś? Skontaktuj się z nami aby sprawdzić dostępność!
					</span>
					<a
						href="/#kontakt"
						class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--forest-green) text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-(--forest-green)/90 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-(--forest-green)/30"
						aria-label="Skontaktuj się z nami"
					>
						<ChevronRight size={20} />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
