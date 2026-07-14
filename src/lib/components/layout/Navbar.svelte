<script lang="ts">
	import { page } from '$app/stores';
	import { nav } from '$lib/lang/pl/nav';
	import { Leaf, ChevronDown } from 'lucide-svelte';
	import Button from '../ui/Button.svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);
	let isForcedStyle = $derived($page.url.pathname.startsWith('/sklep'));
	let isActiveStyle = $derived(isScrolled || isForcedStyle || isMobileMenuOpen);

	onMount(() => {
		isScrolled = window.scrollY > 20;
	});
</script>

<svelte:window onscroll={() => (isScrolled = window.scrollY > 20)} />

<nav
	class="fixed top-0 left-0 z-1000 w-full transition-[height,background-color,padding,border-color,box-shadow] duration-500 ease-in-out {isActiveStyle
		? 'h-[70px] border-b border-gray-200/20 bg-white/80 py-2 shadow-lg backdrop-blur-xl'
		: 'h-[90px] bg-transparent py-4'}"
>
	<div class="mx-auto flex h-full max-w-[100vw] items-center px-4 md:px-8">
		<div class="flex flex-1 justify-start">
			<a
				href="/"
				class="flex items-center gap-2 text-xl font-bold decoration-0 transition-all duration-300 md:text-2xl {isActiveStyle
					? 'text-text-dark'
					: 'text-white'}"
			>
				<Leaf
					size={28}
					class="transition-colors duration-300 {isActiveStyle
						? 'text-forest-green'
						: 'text-white'}"
					strokeWidth={2.5}
				/>
				<span class="tracking-tight">{nav.brand}</span>
			</a>
		</div>

		<div class="hidden flex-none items-center justify-center gap-4 lg:flex">
			{#each nav.links as link (link.href)}
				<a
					href={link.href}
					class="nav-link-premium {isActiveStyle
						? 'text-text-muted hover:text-forest-green'
						: 'text-white/90 hover:text-white'}"
				>
					<span class="text-wrapper">
						{link.text}
					</span>
					<span class="bg-bubble {isActiveStyle ? 'bg-forest-green/10' : 'bg-white/20'}"></span>
					<span class="underline-base {isActiveStyle ? 'bg-forest-green/40' : 'bg-white/40'}"
					></span>
					<span class="underline-active {isActiveStyle ? 'bg-forest-green' : 'bg-white'}"></span>
				</a>
			{/each}

			<div class="h-6 w-px {isActiveStyle ? 'bg-gray-300' : 'bg-white/30'}"></div>

			<a
				href="/sklep"
				class="nav-link-premium {isActiveStyle
					? 'text-text-muted hover:text-forest-green'
					: 'text-white/90 hover:text-white'}"
			>
				<span class="text-wrapper">Sklep</span>
				<span class="bg-bubble {isActiveStyle ? 'bg-forest-green/10' : 'bg-white/20'}"></span>
				<span class="underline-base {isActiveStyle ? 'bg-forest-green/40' : 'bg-white/40'}"></span>
				<span class="underline-active {isActiveStyle ? 'bg-forest-green' : 'bg-white'}"></span>
			</a>
		</div>

		<div class="flex flex-1 justify-end">
			<Button
				href="#kontakt"
				variant={isActiveStyle ? 'primary' : 'secondary'}
				class="px-5 py-2.5 text-xs whitespace-nowrap md:px-8 md:py-3.5 md:text-sm"
			>
				{nav.cta}
			</Button>
		</div>

		<!-- Mobile Dropdown Toggle -->
		<button
			class="absolute bottom-1 left-1/2 flex -translate-x-1/2 items-center justify-center p-1 transition-colors lg:hidden {isActiveStyle
				? 'text-forest-green'
				: 'text-white'}"
			onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
			aria-label="Menu"
		>
			<ChevronDown
				size={20}
				class="transition-transform duration-300 {isMobileMenuOpen ? 'rotate-180' : ''}"
			/>
		</button>
	</div>

	<!-- Expanded Mobile Menu -->
	{#if isMobileMenuOpen}
		<div
			class="absolute top-full left-0 w-full border-b border-gray-200/20 bg-white/95 py-4 shadow-lg backdrop-blur-xl lg:hidden"
			transition:slide={{ duration: 300 }}
		>
			<div class="flex flex-col items-center gap-6">
				{#each nav.links as link (link.href)}
					<a
						href={link.href}
						class="text-lg font-medium text-text-dark hover:text-forest-green"
						onclick={() => (isMobileMenuOpen = false)}
					>
						{link.text}
					</a>
				{/each}
				<div class="h-px w-16 bg-gray-200"></div>
				<a
					href="/sklep"
					class="text-lg font-medium text-text-dark hover:text-forest-green"
					onclick={() => (isMobileMenuOpen = false)}
				>
					Sklep
				</a>
			</div>
		</div>
	{/if}
</nav>
