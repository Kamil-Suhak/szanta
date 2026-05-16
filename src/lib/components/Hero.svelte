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
	<!-- <div class="absolute inset-0 z-20 bg-linear-to-r from-black/70 via-black/40 to-transparent"></div> -->

	<div class="relative z-30 container max-w-[1200px] px-8 py-20">
		<div
			class="max-w-[850px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] {visible
				? 'translate-x-0 opacity-100'
				: 'translate-x-[-40px] opacity-0'}"
		>
			<!-- Title -->
			<h1
				class="mt-20 mb-10 text-[clamp(2.25rem,7.5vw,4.5rem)] leading-[1.1] font-extrabold tracking-tight text-white"
			>
				{#each hero.title.split(', ') as part, i (part)}
					<span
						class="inline-block animate-fade-in-left opacity-0"
						style="animation-delay: {(i + 1) * 0.2}s"
					>
						{part}{i === 0 ? ',' : ''}
					</span>
					<br />
				{/each}
			</h1>

			<!-- Subtitle -->
			<div
				class="prose prose-xl mb-16 animate-fade-in-left opacity-0 prose-invert"
				style="animation-delay: 0.6s"
			>
				<p class="max-w-[600px] leading-[1.6] text-white/90">
					{hero.subtitle}
				</p>
			</div>

			<!-- Actions -->
			<div
				class="mb-24 flex animate-fade-in-left flex-wrap gap-6 opacity-0"
				style="animation-delay: 0.8s"
			>
				<a href="#realizacje" class="btn-primary px-12 py-5 text-lg">
					{hero.ctaPrimary}
				</a>
				<a href="#kontakt" class="btn-secondary px-12 py-5 text-lg">
					{hero.ctaSecondary}
				</a>
			</div>

			<!-- Stats -->
			<div class="grid grid-cols-2 gap-x-12 gap-y-10 border-t border-white/10 pt-12 md:grid-cols-3">
				{#each hero.stats as stat, i (stat.label)}
					<div
						class="flex animate-fade-in-left flex-col opacity-0"
						style="animation-delay: {1 + i * 0.1}s"
					>
						<span class="text-4xl font-extrabold text-white md:text-5xl">{stat.value}</span>
						<span class="mt-2 text-xs font-semibold tracking-[0.2em] text-white/50 uppercase"
							>{stat.label}</span
						>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
