<script lang="ts">
	import { nav } from '$lib/lang/pl/nav';

	let isScrolled = $state(false);

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', () => {
			isScrolled = window.scrollY > 20;
		});
	}
</script>

<nav
	class="sticky top-0 z-1000 w-full bg-white transition-all duration-300 {isScrolled
		? 'h-[60px] border-b border-gray-100 shadow-md'
		: 'h-[70px]'}"
>
	<div class="mx-auto flex h-full max-w-[1200px] items-center justify-between px-8">
		<a
			href="/"
			class="flex items-center gap-2 text-2xl font-bold text-text-dark decoration-0 transition-colors hover:text-forest-green"
		>
			<span class="text-xl">🌿</span>
			{nav.brand}
		</a>

		<div class="hidden gap-10 md:flex">
			{#each nav.links as link (link.href)}
				<a
					href={link.href}
					class="group relative text-base font-medium text-text-muted transition-colors duration-200 hover:text-forest-green"
				>
					{link.text}
					<span
						class="absolute -bottom-1 left-0 h-0.5 w-0 bg-forest-green transition-all duration-300 group-hover:w-full"
					></span>
				</a>
			{/each}
		</div>

		<a
			href="#kontakt"
			class="inline-block rounded-full bg-forest-green px-6 py-3 font-semibold text-white shadow-[0_4px_15px_rgba(45,90,39,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-green-dark hover:shadow-[0_6px_20px_rgba(45,90,39,0.3)]"
		>
			{nav.cta}
		</a>
	</div>
</nav>
