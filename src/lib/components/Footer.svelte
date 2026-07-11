<script lang="ts">
	import { common } from '$lib/lang/pl/common';
	import { Leaf, Phone, Mail, MapPin } from 'lucide-svelte';
</script>

<footer class="bg-(--forest-green) py-12 text-white">
	<div class="container mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
			<div class="flex flex-col items-center md:items-start">
				<div class="mb-4 flex items-center gap-2 text-2xl font-bold">
					<Leaf size={28} strokeWidth={2.5} class="text-white" />
					<span class="tracking-tight">{common.company.name}</span>
				</div>
				<p class="max-w-sm text-center text-white/80 md:text-left">
					Stwórzmy razem Twoją wymarzoną przestrzeń zieloną.
				</p>
			</div>

			<div class="flex flex-col items-center text-center md:items-start md:text-left">
				<h3 class="mb-6 text-lg font-bold tracking-wider text-white/90 uppercase">Kontakt</h3>
				<div
					class="grid w-full max-w-2xl grid-cols-2 gap-x-2 gap-y-6 text-[11px] sm:text-sm md:gap-x-12 md:text-base"
				>
					<div class="flex flex-col gap-4 md:gap-5">
						{#each common.company.phoneFormatted.split(', ') as phone}
							<div class="flex items-center justify-start gap-2 text-left md:gap-4">
								<div
									class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white shadow-sm md:h-10 md:w-10"
								>
									<Phone class="h-4 w-4 md:h-[18px] md:w-[18px]" />
								</div>
								<a
									href="tel:{phone.replace(/\s+/g, '')}"
									class="font-medium whitespace-nowrap text-white/80 transition-colors hover:text-white hover:underline"
								>
									{phone}
								</a>
							</div>
						{/each}
					</div>

					<div class="flex flex-col gap-4 md:gap-5">
						<div class="flex items-center justify-start gap-2 text-left md:gap-4">
							<div
								class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white shadow-sm md:h-10 md:w-10"
							>
								<Mail class="h-4 w-4 md:h-[18px] md:w-[18px]" />
							</div>
							<a
								href="mailto:{common.company.email}"
								class="font-medium whitespace-nowrap text-white/80 transition-colors hover:text-white hover:underline"
							>
								{common.company.email}
							</a>
						</div>
						<div class="flex items-center justify-start gap-2 text-left md:gap-4">
							<div
								class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white shadow-sm md:h-10 md:w-10"
							>
								<MapPin class="h-4 w-4 md:h-[18px] md:w-[18px]" />
							</div>
							<span class="font-medium text-white/80">{common.company.address}</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div
			class="mt-12 flex flex-col items-center justify-between border-t border-white/20 pt-8 text-sm text-white/60 md:flex-row"
		>
			<p>&copy; {new Date().getFullYear()} {common.company.name}. Wszelkie prawa zastrzeżone.</p>
			<p class="mt-4 md:mt-0">
				Made by <a
					href="mailto:office@expressweb.dev"
					class="text-white hover:text-white/80 hover:underline">Kamil Suhak</a
				>
			</p>
		</div>
	</div>
</footer>
