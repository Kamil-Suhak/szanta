<script lang="ts">
	import { nav } from '$lib/lang/pl/nav';
	import { Leaf } from 'lucide-svelte';
	import Button from './Button.svelte';

	let isScrolled = $state(false);
</script>

<svelte:window onscroll={() => (isScrolled = window.scrollY > 20)} />

<nav
	class="fixed top-0 left-0 z-1000 w-full transition-[height,background-color,padding,border-color,box-shadow] duration-500 ease-in-out {isScrolled
		? 'h-[70px] border-b border-gray-200/20 bg-white/80 py-2 shadow-lg backdrop-blur-xl'
		: 'h-[90px] bg-transparent py-4'}"
>
	<div class="mx-auto flex h-full max-w-[1200px] items-center justify-between px-4 md:px-8">
		<a
			href="/"
			class="flex items-center gap-2 text-xl font-bold decoration-0 transition-all duration-300 md:text-2xl {isScrolled
				? 'text-text-dark'
				: 'text-white'}"
		>
			<Leaf
				size={28}
				class="transition-colors duration-300 {isScrolled ? 'text-forest-green' : 'text-white'}"
				strokeWidth={2.5}
			/>
			<span class="tracking-tight">{nav.brand}</span>
		</a>

		<div class="hidden gap-8 md:flex">
			{#each nav.links as link (link.href)}
				<a
					href={link.href}
					class="nav-link-premium {isScrolled
						? 'text-text-muted hover:text-forest-green'
						: 'text-white/90 hover:text-white'}"
				>
					<span class="text-wrapper">
						{link.text}
					</span>

					<span class="bg-bubble {isScrolled ? 'bg-forest-green/10' : 'bg-white/20'}"></span>

					<span class="underline-base {isScrolled ? 'bg-forest-green/40' : 'bg-white/40'}"></span>
					<span class="underline-active {isScrolled ? 'bg-forest-green' : 'bg-white'}"></span>
				</a>
			{/each}
		</div>

		<Button
			href="#kontakt"
			variant={isScrolled ? 'primary' : 'secondary'}
			class="px-5 py-2.5 text-xs whitespace-nowrap md:px-8 md:py-3.5 md:text-sm"
		>
			{nav.cta}
		</Button>
	</div>
</nav>
