<script lang="ts">
	import { about } from '$lib/lang/pl/about';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { Quote, Leaf, Sprout, ShieldCheck, Sparkles } from 'lucide-svelte';

	let visible = $state(false);

	onMount(() => {
		visible = true;
	});

	const valueIcons = [ShieldCheck, Sprout, Sparkles];
</script>

<svelte:head>
	<title>{about.title} | Szanta Ogrody</title>
	<meta name="description" content={about.subtitle} />
</svelte:head>

<!-- Hero Section to act as the dark background for the transparent navbar -->
<section class="relative flex h-[45vh] min-h-[350px] items-center overflow-hidden bg-gradient-to-br from-forest-green-dark to-forest-green text-white">
	<!-- Background styling / organic glowing shapes -->
	<div class="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl"></div>
	<div class="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/5 blur-3xl"></div>
	<div class="absolute inset-0 bg-[url('/images/hero_bg.png')] bg-cover bg-center mix-blend-overlay opacity-25 brightness-50"></div>

	<div class="relative z-10 container mx-auto max-w-[1200px] px-6 pt-24 pb-12 text-center md:px-8">
		{#if visible}
			<h1 
				in:fly={{ y: -30, duration: 800 }} 
				class="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
			>
				{about.title}
			</h1>
			<div in:fade={{ delay: 200, duration: 600 }} class="mx-auto mt-4 h-1.5 w-20 rounded bg-white/80"></div>
			<p 
				in:fly={{ y: 30, delay: 300, duration: 800 }} 
				class="mx-auto mt-6 max-w-2xl text-lg text-white/95 leading-relaxed sm:text-xl font-medium"
			>
				{about.subtitle}
			</p>
		{/if}
	</div>
</section>

<!-- Owner & Story Section -->
<section class="relative bg-white py-20 lg:py-28 overflow-hidden">
	<!-- Subtle organic background decoration -->
	<div class="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-forest-green/5 blur-3xl"></div>
	<div class="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-forest-green/5 blur-3xl"></div>

	<div class="container mx-auto max-w-[1200px] px-6 md:px-8">
		<div class="grid grid-cols-1 gap-16 lg:grid-cols-12 items-center">
			
			<!-- Left Column: Owner Avatar Photo -->
			<div class="lg:col-span-5 flex justify-center">
				{#if visible}
					<div 
						in:fly={{ x: -40, delay: 400, duration: 1000 }}
						class="group relative max-w-[400px] w-full"
					>
						<!-- Background glowing shape -->
						<div class="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-forest-green to-forest-green-dark opacity-10 blur-xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-105"></div>
						
						<!-- Photo wrapper card -->
						<div class="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-15px_rgba(45,132,53,0.3)]">
							<div class="aspect-square overflow-hidden rounded-2xl bg-gray-50">
								<img 
									src="/images/owner.png" 
									alt={about.owner.photoAlt} 
									class="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
								/>
							</div>
							
							<!-- Badge tag overlayed inside the photo card -->
							<div class="mt-4 text-center">
								<h3 class="text-xl font-bold text-text-dark">{about.owner.name}</h3>
								<p class="text-sm font-semibold tracking-wider text-forest-green uppercase mt-0.5">{about.owner.role}</p>
							</div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Right Column: Biography & Elegant Quote -->
			<div class="lg:col-span-7 space-y-8">
				{#if visible}
					<div in:fly={{ x: 40, delay: 500, duration: 1000 }} class="space-y-6">
						<div class="flex items-center gap-3">
							<Leaf class="text-forest-green animate-pulse" size={24} />
							<span class="text-sm font-extrabold tracking-widest text-forest-green uppercase">{about.storyTitle}</span>
						</div>
						
						<div class="space-y-4 text-base text-text-muted leading-relaxed sm:text-lg">
							<p>{about.storyParagraph1}</p>
							<p>{about.storyParagraph2}</p>
						</div>

						<!-- Stylized blockquote for Owner's Quote -->
						<div class="relative overflow-hidden rounded-2xl border-l-4 border-forest-green bg-forest-green/5 p-6 md:p-8 shadow-xs">
							<!-- Absolute decorative quote icon -->
							<div class="absolute -right-4 -bottom-6 text-forest-green/10 opacity-60">
								<Quote size={120} strokeWidth={1} />
							</div>
							
							<div class="relative z-10 flex gap-4">
								<div class="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-forest-green/10 text-forest-green">
									<Quote size={20} />
								</div>
								<div>
									<p class="italic text-lg text-text-dark leading-relaxed font-medium">
										{about.owner.quote}
									</p>
									<p class="mt-4 text-sm font-bold text-forest-green tracking-wide">
										— {about.owner.name}, {about.owner.role}
									</p>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>

		</div>

		<!-- Section for Values (valuesTitle & values list) from about.ts -->
		{#if about.values && about.values.length > 0}
			<div class="mt-24 lg:mt-32">
				{#if visible}
					<div in:fade={{ delay: 800, duration: 800 }} class="mb-16 text-center">
						<h2 class="text-3xl font-extrabold tracking-tight text-text-dark sm:text-4xl">
							{about.valuesTitle}
						</h2>
						<div class="mx-auto mt-4 h-1 w-16 rounded bg-forest-green"></div>
					</div>

					<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
						{#each about.values as val, i (val.title)}
							{@const Icon = valueIcons[i % valueIcons.length]}
							<div 
								in:fly={{ y: 40, delay: 900 + (i * 150), duration: 800 }}
								class="group flex flex-col items-center text-center p-8 rounded-3xl border border-gray-100 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
							>
								<div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-green/10 text-forest-green transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
									<Icon size={26} />
								</div>
								<h3 class="mt-6 text-xl font-bold text-text-dark">{val.title}</h3>
								<p class="mt-3 text-sm text-text-muted leading-relaxed font-medium">{val.desc}</p>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/if}

	</div>
</section>
