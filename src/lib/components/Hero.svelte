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
		class="absolute inset-[-2px] z-10 bg-[url('/images/hero_bg.png')] bg-cover bg-center brightness-[0.65]"
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
				<a href="#realizacje" class="btn-primary px-12 py-5 text-center text-lg">
					{hero.ctaPrimary}
				</a>
				<a href="#kontakt" class="btn-secondary px-12 py-5 text-center text-lg">
					{hero.ctaSecondary}
				</a>
			</div>
		</div>
	</div>

	<!-- Bottom Stats / Attestations Bar -->
	<div
		class="absolute bottom-0 left-0 z-30 w-full border-t border-white/5 bg-black/10 backdrop-blur-xs"
	>
		<div class="container mx-auto max-w-[1200px] px-4 py-4 sm:px-8 sm:py-6">
			<div class="grid grid-cols-3 gap-2 sm:gap-8">
				{#each hero.stats as stat, i (stat.label)}
					{@const IconComponent = statIcons[i % statIcons.length]}
					<div
						class="flex animate-fade-in-up flex-col items-center gap-2 opacity-0 sm:flex-row sm:justify-start sm:gap-6"
						style="animation-delay: {1 + i * 0.1}s; animation-fill-mode: forwards;"
					>
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--forest-green)]/20 text-white sm:h-14 sm:w-14"
						>
							<!-- Responsive icon sizes (using standard lucide sizes via classes is tricky, so we use tailwind sizing classes directly on a wrapper or pass standard sizes if possible. Lucide svelte uses size prop) -->
							<div class="hidden sm:block"><IconComponent size={28} /></div>
							<div class="block sm:hidden"><IconComponent size={20} /></div>
						</div>
						<div class="text-center sm:text-left">
							<div class="text-lg font-extrabold text-white sm:text-3xl md:text-4xl">
								{stat.value}
							</div>
							<div
								class="mt-1 text-[9px] font-semibold tracking-wider text-white/70 uppercase sm:text-xs sm:tracking-[0.15em]"
							>
								{stat.label}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
