<script lang="ts">
	import { services } from '$lib/lang/pl/services';
	import {
		Menu,
		X,
		ChevronRight,
		Leaf,
		PenTool,
		Sprout,
		Scissors,
		Droplets,
		Hammer
	} from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';
	import ImageModal from './ImageModal.svelte';

	const iconMap: Record<string, any> = {
		PenTool,
		Sprout,
		Scissors,
		Droplets,
		Hammer
	};

	let activeServiceId = $state<string | null>(null);
	let isMobileSidebarOpen = $state(false);
	let lightboxImage = $state<{ url: string; annotation: string } | null>(null);

	let activeService = $derived(services.list.find((s) => s.id === activeServiceId) || null);

	let getCollageClasses = (i: number) => {
		if (i === 0)
			return 'absolute z-10 w-[65%] h-full right-0 top-0 overflow-hidden rounded-2xl shadow-lg transition-transform hover:-translate-y-1';
		if (i === 1)
			return 'absolute z-20 w-[50%] h-[55%] left-0 top-[5%] overflow-hidden rounded-2xl border-4 border-white shadow-xl transition-transform hover:-translate-y-1';
		if (i === 2)
			return 'absolute z-30 w-[45%] h-[45%] left-[5%] bottom-0 overflow-hidden rounded-2xl border-4 border-white shadow-xl transition-transform hover:-translate-y-1';
		return '';
	};
</script>

<section id="uslugi" class="relative bg-gray-50 py-24">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-extrabold tracking-tight text-(--forest-green) sm:text-5xl">
				Nasze Usługi
			</h2>
			<div class="mx-auto h-1 w-24 rounded bg-(--forest-green)"></div>
		</div>

		<!-- Main Layout -->
		<div class="relative grid grid-cols-1 gap-8 lg:grid-cols-4">
			<!-- Sidebar Snippet -->
			{#snippet sidebarContent()}
				<div
					class="relative flex h-full w-72 flex-col overflow-hidden bg-white shadow-2xl lg:h-auto lg:w-full lg:rounded-2xl lg:border lg:border-gray-100 lg:bg-white/50 lg:shadow-none lg:backdrop-blur-md"
				>
					<!-- Mobile Header -->
					<div class="flex items-center justify-between border-b p-6 lg:hidden">
						<span class="text-xl font-bold text-(--forest-green)">Usługi</span>
						<button
							class="rounded-full p-2 text-gray-500 hover:bg-gray-100"
							onclick={() => (isMobileSidebarOpen = false)}
						>
							<X size={24} />
						</button>
					</div>

					<div class="flex-1 overflow-y-auto p-4 lg:p-2">
						<ul class="space-y-2">
							<li>
								<button
									class="group flex w-full items-center justify-between rounded-xl px-4 py-4 text-left transition-all duration-300 {activeServiceId ===
									null
										? 'bg-(--forest-green) text-white shadow-md'
										: 'text-(--text-dark) hover:bg-(--forest-green)/10'}"
									onclick={() => {
										activeServiceId = null;
										setTimeout(() => {
											isMobileSidebarOpen = false;
										}, 50);
									}}
								>
									<span class="font-semibold">Przegląd Usług</span>
									{#if activeServiceId === null}
										<ChevronRight size={18} />
									{/if}
								</button>
							</li>
							{#each services.list as service (service.id)}
								<li>
									<button
										class="group flex w-full items-center justify-between rounded-xl px-4 py-4 text-left transition-all duration-300 {activeServiceId ===
										service.id
											? 'bg-(--forest-green) text-white shadow-md'
											: 'text-(--text-dark) hover:bg-(--forest-green)/10'}"
										onclick={() => {
											activeServiceId = service.id;
											setTimeout(() => {
												isMobileSidebarOpen = false;
											}, 350);
										}}
									>
										<span class="font-semibold">{service.title}</span>
										<ChevronRight
											size={18}
											class="transition-transform group-hover:translate-x-1 {activeServiceId ===
											service.id
												? 'opacity-100'
												: 'opacity-0 group-hover:opacity-50'}"
										/>
									</button>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/snippet}

			<!-- Desktop Sidebar -->
			<div class="hidden lg:relative lg:block">
				{@render sidebarContent()}
			</div>

			<!-- Mobile Sidebar -->
			{#if isMobileSidebarOpen}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="fixed inset-0 z-50 flex lg:hidden">
					<!-- Mobile Overlay -->
					<div
						class="absolute inset-0 bg-black/20"
						transition:fade={{ duration: 200 }}
						onclick={() => (isMobileSidebarOpen = false)}
					></div>

					<!-- Animated Sidebar Content -->
					<div
						class="relative z-10"
						in:fly={{ x: -288, duration: 300 }}
						out:fly={{ x: -288, duration: 300 }}
					>
						{@render sidebarContent()}
					</div>
				</div>
			{/if}

			<!-- Content Area (3/4 on Desktop) -->
			<div class="lg:col-span-3">
				<div
					class="relative rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-10 lg:min-h-[600px]"
				>
					<!-- Mobile Sidebar Toggle Button -->
					<div class="absolute top-6 right-6 lg:hidden">
						<button
							class="flex h-12 w-12 items-center justify-center rounded-full bg-(--forest-green)/10 text-(--forest-green) transition-transform hover:scale-105 hover:bg-(--forest-green)/20 active:scale-95"
							onclick={() => (isMobileSidebarOpen = true)}
							aria-label="Wybierz Usługę"
						>
							<Menu size={24} />
						</button>
					</div>

					{#key activeServiceId}
						<div
							class="flex h-full flex-col {activeService === null ? 'justify-center' : ''}"
							in:fade={{ duration: 400, delay: 100 }}
							out:fade={{ duration: 100 }}
						>
							{#if activeService === null}
								<!-- Overview State -->
								<div
									class="mb-8 inline-flex items-center justify-center self-start rounded-full bg-(--forest-green)/10 p-4"
								>
									<Leaf size={48} class="text-(--forest-green)" />
								</div>
								<h3 class="mb-6 pr-16 text-3xl font-bold text-(--text-dark) lg:pr-0">
									{services.overview.title}
								</h3>
								<p class="max-w-3xl text-lg leading-relaxed text-(--text-muted)">
									{services.overview.description}
								</p>
								<div class="relative mt-12 h-[320px] w-full sm:h-[400px]">
									{#each services.list.slice(0, 3) as s, i (s.id)}
										<div class="{getCollageClasses(i)} group">
											<button
												class="h-full w-full cursor-pointer text-left"
												onclick={() => (lightboxImage = s.images[0])}
												aria-label="Powiększ obraz"
											>
												<img
													src={s.images[0].url}
													alt={s.images[0].annotation}
													class="h-full w-full object-cover transition-all duration-500 group-hover:brightness-75"
													loading="lazy"
												/>
												<div
													class="pointer-events-none absolute inset-0 flex items-end bg-linear-to-t from-black/80 via-black/20 to-transparent p-4"
												>
													<span class="font-semibold text-white">{s.title}</span>
												</div>
											</button>
										</div>
									{/each}
								</div>
							{:else}
								<!-- Active Service State -->
								<div
									class="mb-8 inline-flex items-center justify-center self-start rounded-full bg-(--forest-green)/10 p-4"
								>
									{#if activeService.icon && iconMap[activeService.icon]}
										{@const IconComponent = iconMap[activeService.icon]}
										<IconComponent size={48} class="text-(--forest-green)" />
									{/if}
								</div>
								<h3 class="mb-6 pr-16 text-3xl font-bold text-(--text-dark) lg:pr-0">
									{activeService.title}
								</h3>
								<p class="mb-10 text-lg leading-relaxed text-(--text-muted)">
									{activeService.description}
								</p>

								<div class="relative mt-auto mb-4 h-[320px] w-full sm:h-[400px]">
									{#each activeService.images as image, i (i)}
										<div class="{getCollageClasses(i)} group">
											<button
												class="h-full w-full cursor-pointer text-left"
												onclick={() => (lightboxImage = image)}
												aria-label="Powiększ obraz"
											>
												<img
													src={image.url}
													alt={image.annotation}
													class="h-full w-full object-cover transition-all duration-500 group-hover:brightness-75"
													loading="lazy"
												/>
											</button>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					{/key}
				</div>
			</div>
		</div>
	</div>

	<ImageModal image={lightboxImage} onclose={() => (lightboxImage = null)} />
</section>
