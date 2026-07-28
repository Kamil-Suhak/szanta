<script lang="ts">
	import { about } from '$lib/lang/pl/about';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { Quote, Leaf } from 'lucide-svelte';
	import heroBg from '$lib/assets/images/hero_bg.png';

	let visible = $state(false);

	onMount(() => {
		visible = true;
	});
</script>

<svelte:head>
	<title>{about.title} | Szanta Ogrody</title>
	<meta name="description" content={about.subtitle} />
</svelte:head>

<!-- Hero Section to act as the dark background for the transparent navbar -->
<section
	class="relative flex h-[45vh] min-h-[350px] items-center overflow-hidden bg-linear-to-br from-forest-green-dark to-forest-green text-white"
>
	<!-- Background styling / organic glowing shapes -->
	<div class="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl"></div>
	<div class="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-white/5 blur-3xl"></div>
	<div
		class="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay brightness-50"
		style="background-image: url({heroBg})"
	></div>

	<div class="relative z-10 container mx-auto max-w-[1200px] px-6 pt-24 pb-12 text-center md:px-8">
		{#if visible}
			<h1
				in:fly={{ y: -30, duration: 800 }}
				class="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
			>
				{about.title}
			</h1>
			<div
				in:fade={{ delay: 200, duration: 600 }}
				class="mx-auto mt-4 h-1.5 w-20 rounded bg-white/80"
			></div>
			<p
				in:fly={{ y: 30, delay: 300, duration: 800 }}
				class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed font-medium text-white/95 sm:text-xl"
			>
				{about.subtitle}
			</p>
		{/if}
	</div>
</section>

<!-- Owner & Story Section -->
<section class="relative overflow-hidden bg-white py-20 lg:py-28">
	<!-- Subtle organic background decoration -->
	<div class="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-forest-green/5 blur-3xl"></div>
	<div class="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-forest-green/5 blur-3xl"></div>

	<div class="container mx-auto max-w-[1200px] px-6 md:px-8">
		<div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
			<!-- Left Column: Owner Avatar Photo -->
			<div class="flex justify-center lg:col-span-5">
				{#if visible}
					<div
						in:fly={{ x: -40, delay: 400, duration: 1000 }}
						class="group relative w-full max-w-[400px]"
					>
						<!-- Background glowing shape -->
						<div
							class="absolute -inset-4 rounded-3xl bg-linear-to-tr from-forest-green to-forest-green-dark opacity-10 blur-xl transition-all duration-500 group-hover:scale-105 group-hover:opacity-20"
						></div>

						<!-- Photo wrapper card -->
						<div
							class="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-15px_rgba(45,132,53,0.3)]"
						>
							<div class="aspect-square overflow-hidden rounded-2xl bg-gray-50">
								<enhanced:img
									src="$lib/assets/images/profilowe.jpeg"
									alt={about.owner.photoAlt}
									class="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
								/>
							</div>

							<!-- Badge tag overlayed inside the photo card -->
							<div class="mt-4 text-center">
								<h3 class="text-xl font-bold text-text-dark">{about.owner.name}</h3>
								<p class="mt-0.5 text-sm font-semibold tracking-wider text-forest-green uppercase">
									{about.owner.role}
								</p>
							</div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Right Column: Biography & Elegant Quote -->
			<div class="space-y-8 lg:col-span-7">
				{#if visible}
					<div in:fly={{ x: 40, delay: 500, duration: 1000 }} class="space-y-6">
						<div class="flex items-center gap-3">
							<Leaf class="animate-pulse text-forest-green" size={24} />
							<span class="text-sm font-extrabold tracking-widest text-forest-green uppercase"
								>{about.storyTitle}</span
							>
						</div>

						<div class="space-y-4 text-base leading-relaxed text-text-muted sm:text-lg">
							<p>{about.storyParagraph1}</p>
							<p>{about.storyParagraph2}</p>
						</div>

						<!-- Stylized blockquote for Owner's Quote -->
						<div
							class="relative overflow-hidden rounded-2xl border-l-4 border-forest-green bg-forest-green/5 p-6 shadow-xs md:p-8"
						>
							<!-- Absolute decorative quote icon -->
							<div class="absolute -right-4 -bottom-6 text-forest-green/10 opacity-60">
								<Quote size={120} strokeWidth={1} />
							</div>

							<div class="relative z-10 flex gap-4">
								<div
									class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-green/10 text-forest-green"
								>
									<Quote size={20} />
								</div>
								<div>
									<p class="text-lg leading-relaxed font-medium text-text-dark italic">
										{about.owner.quote}
									</p>
									<p class="mt-4 text-sm font-bold tracking-wide text-forest-green">
										— {about.owner.name}, {about.owner.role}
									</p>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
