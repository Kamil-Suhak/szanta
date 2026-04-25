<script lang="ts">
	import { hero } from '$lib/lang/pl/hero';
	import { onMount } from 'svelte';

	let visible = $state(false);

	onMount(() => {
		setTimeout(() => (visible = true), 100);
	});
</script>

<section class="relative flex min-h-[95vh] items-center overflow-hidden bg-gray-50">
	<!-- Background Image -->
	<div
		class="absolute inset-0 z-10 bg-[url('/images/hero_bg.png')] bg-cover bg-center brightness-[0.65]"
	></div>

	<!-- Overlay -->
	<div class="absolute inset-0 z-20 bg-linear-to-r from-black/70 via-black/40 to-transparent"></div>

	<div class="container relative z-30 max-w-[1200px] px-8">
		<div
			class="max-w-[800px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] {visible
				? 'translate-x-0 opacity-100'
				: '-translate-x-[40px] opacity-0'}"
		>
			<!-- Title -->
			<h1 class="mb-8 text-[clamp(2.5rem,8.5vw,5rem)] font-extrabold leading-[1.05] tracking-tight text-white">
				{#each hero.title.split(', ') as part, i (part)}
					<span
						class="inline-block animate-fade-in-left opacity-0"
						style="animation-delay: {i * 0.3}s"
					>
						{part}{i === 0 ? ',' : ''}
					</span>
					<br />
				{/each}
			</h1>

			<!-- Subtitle -->
			<p
				class="mb-12 max-w-[600px] animate-fade-in-left text-xl leading-relaxed text-white/90 opacity-0"
				style="animation-delay: 0.6s"
			>
				{hero.subtitle}
			</p>

			<!-- Actions -->
			<div
				class="mb-20 flex flex-wrap gap-6 animate-fade-in-left opacity-0"
				style="animation-delay: 0.8s"
			>
				<a
					href="#realizacje"
					class="inline-block rounded-full bg-forest-green px-10 py-5 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-forest-green-dark"
				>
					{hero.ctaPrimary}
				</a>
				<a
					href="#kontakt"
					class="inline-block rounded-full border border-white/30 bg-white/10 px-10 py-5 text-lg font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
				>
					{hero.ctaSecondary}
				</a>
			</div>

			<!-- Stats -->
			<div class="flex flex-wrap gap-x-16 gap-y-10 border-t border-white/10 pt-10">
				{#each hero.stats as stat, i (stat.label)}
					<div
						class="flex flex-col animate-fade-in-left opacity-0"
						style="animation-delay: {1 + i * 0.1}s"
					>
						<span class="text-5xl font-extrabold text-white">{stat.value}</span>
						<span class="text-sm font-semibold uppercase tracking-[0.2em] text-white/60"
							>{stat.label}</span
						>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
