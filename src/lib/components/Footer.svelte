<script lang="ts">
	import { common } from '$lib/lang/pl/common';
	import { Leaf } from 'lucide-svelte';
</script>

<footer class="bg-(--forest-green) py-12 text-white">
	<div class="container mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
			<div class="flex flex-col items-center md:items-start">
				<div class="mb-4 flex items-center gap-2 text-2xl font-bold">
					<Leaf size={28} strokeWidth={2.5} class="text-white" />
					<span class="tracking-tight">{common.company.name}</span>
				</div>
				<p class="text-center text-white/80 md:text-left max-w-sm">
					Stwórzmy razem Twoją wymarzoną przestrzeń zieloną.
				</p>
			</div>

			<div class="flex flex-col items-center text-center md:items-start md:text-left">
				<h3 class="mb-4 text-lg font-bold">Kontakt</h3>
				<p class="mb-2 text-white/80">{common.company.phoneFormatted}</p>
				<p class="mb-2 text-white/80">{common.company.email}</p>
				<p class="text-white/80">{common.company.address}</p>
			</div>
		</div>

		<div class="mt-12 flex flex-col items-center justify-between border-t border-white/20 pt-8 text-sm text-white/60 md:flex-row">
			<p>&copy; {new Date().getFullYear()} {common.company.name}. Wszelkie prawa zastrzeżone.</p>
			<p class="mt-4 md:mt-0">
				Made by <a href="mailto:office@expressweb.dev" class="text-white hover:underline hover:text-white/80">Kamil Suhak</a>
			</p>
		</div>
	</div>
</footer>
