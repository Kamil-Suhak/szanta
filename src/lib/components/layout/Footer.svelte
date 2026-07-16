<script lang="ts">
	import { common } from '$lib/lang/pl/common';
	import { nav } from '$lib/lang/pl/nav';
	import { footer } from '$lib/lang/pl/footer';
	import { Leaf, Phone, Mail, MapPin } from 'lucide-svelte';
</script>

<footer class="relative overflow-hidden bg-(--forest-green) py-16 text-white">
	<div class="relative z-10 container mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-16 md:grid-cols-12 lg:gap-8">
			<!-- Brand Section -->
			<div
				class="flex flex-col items-center text-center md:col-span-12 lg:col-span-4 lg:items-start lg:text-left"
			>
				<div class="mb-6 flex items-center gap-4">
					<div
						class="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-sm"
					>
						<Leaf size={32} strokeWidth={2.5} class="text-white" />
					</div>
					<span class="text-4xl font-extrabold tracking-tight">{common.company.name}</span>
				</div>
				<p class="max-w-sm leading-relaxed text-white/70">
					{footer.subtitle}
				</p>
			</div>

			<!-- Sitemap Section -->
			<div
				class="flex flex-col items-center md:col-span-6 md:items-start lg:col-span-3 lg:col-start-6"
			>
				<h3 class="mb-8 text-sm font-bold tracking-[0.2em] text-white/40 uppercase">
					{footer.sitemapTitle}
				</h3>
				<nav class="flex flex-col gap-4 text-center md:text-left">
					<a
						href="/"
						class="group flex items-center gap-3 text-lg font-medium text-white/80 transition-colors hover:text-white"
					>
						<span
							class="h-1.5 w-1.5 rounded-full bg-white/20 transition-all duration-300 group-hover:scale-150 group-hover:bg-white"
						></span>
						Strona główna
					</a>
					{#each nav.links as link (link.href)}
						<a
							href={link.href}
							class="group flex items-center gap-3 text-lg font-medium text-white/80 transition-colors hover:text-white"
						>
							<span
								class="h-1.5 w-1.5 rounded-full bg-white/20 transition-all duration-300 group-hover:scale-150 group-hover:bg-white"
							></span>
							{link.text}
						</a>
					{/each}
					<a
						href="/sklep"
						class="group flex items-center gap-3 text-lg font-medium text-white/80 transition-colors hover:text-white"
					>
						<span
							class="h-1.5 w-1.5 rounded-full bg-white/20 transition-all duration-300 group-hover:scale-150 group-hover:bg-white"
						></span>
						{nav.shop}
					</a>
				</nav>
			</div>

			<!-- Contact Section -->
			<div class="flex flex-col items-center md:col-span-6 md:items-start lg:col-span-4">
				<h3 class="mb-8 text-sm font-bold tracking-[0.2em] text-white/40 uppercase">
					{footer.contactTitle}
				</h3>
				<div class="flex w-full max-w-[280px] flex-col gap-2 md:max-w-sm">
					{#each common.company.phoneFormatted.split(', ') as phone}
						<a
							href="tel:{phone.replace(/\s+/g, '')}"
							class="group flex items-center gap-4 rounded-2xl p-2 transition-colors md:-ml-3"
						>
							<div
								class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20"
							>
								<Phone size={20} />
							</div>
							<span
								class="text-left text-lg font-semibold tracking-wide text-white/90 group-hover:text-white"
								>{phone}</span
							>
						</a>
					{/each}

					<a
						href="mailto:{common.company.email}"
						class="group flex items-center gap-4 rounded-2xl p-2 transition-colors md:-ml-3"
					>
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20"
						>
							<Mail size={20} />
						</div>
						<span
							class="text-left text-lg font-semibold tracking-wide text-white/90 group-hover:text-white"
							>{common.company.email}</span
						>
					</a>

					<div class="flex items-center gap-4 rounded-2xl p-2 md:-ml-3">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white shadow-sm"
						>
							<MapPin size={20} />
						</div>
						<span class="text-left text-lg leading-snug font-medium text-white/80"
							>{common.company.address}</span
						>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div
			class="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm text-white/40 md:flex-row"
		>
			<p>&copy; {new Date().getFullYear()} {common.company.name}. {footer.rights}</p>
			<p class="flex items-center gap-1.5">
				{footer.madeBy}
				<a
					href="mailto:office@expressweb.dev"
					class="font-semibold text-white/60 transition-colors hover:text-white"
				>
					Kamil Suhak
				</a>
			</p>
		</div>
	</div>
</footer>
