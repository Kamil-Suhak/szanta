<script lang="ts">
	import { hero } from '$lib/lang/pl/hero';
	import { onMount } from 'svelte';
	import { CalendarDays, FolderCheck, BadgeCheck } from 'lucide-svelte';

	let visible = $state(false);

	const statIcons = [CalendarDays, FolderCheck, BadgeCheck];

	onMount(() => {
		setTimeout(() => (visible = true), 100);
	});
</script>

<section class="relative flex h-screen min-h-[600px] items-center overflow-hidden bg-gray-50">
	<!-- Background Image -->
	<div
		class="absolute inset-0 z-10 bg-[url('/images/hero_bg.png')] bg-cover bg-center brightness-[0.65]"
	></div>

	<!-- Overlay -->
	<!-- <div class="absolute inset-0 z-20 bg-linear-to-r from-black/70 via-black/40 to-transparent"></div> -->

	<div class="relative z-30 container max-w-[1200px] px-8 pt-20 pb-32">
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
		</div>
	</div>

	<!-- Bottom Stats / Attestations Bar -->
	<div
		class="absolute bottom-0 left-0 z-30 w-full border-t border-white/5 bg-black/10 backdrop-blur-xs"
	>
		<div class="container mx-auto max-w-[1200px] px-8 py-6">
			<div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
				{#each hero.stats as stat, i (stat.label)}
					{@const IconComponent = statIcons[i % statIcons.length]}
					<div
						class="flex animate-fade-in-up flex-col items-center gap-3 opacity-0 sm:flex-row sm:justify-start sm:gap-6"
						style="animation-delay: {1 + i * 0.1}s; animation-fill-mode: forwards;"
					>
						<div
							class="flex h-14 w-14 items-center justify-center rounded-full bg-(--forest-green)/20 text-white"
						>
							<IconComponent size={28} />
						</div>
						<div class="text-center sm:text-left">
							<div class="text-3xl font-extrabold text-white md:text-4xl">{stat.value}</div>
							<div class="mt-1 text-xs font-semibold tracking-[0.15em] text-white/70 uppercase">
								{stat.label}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
