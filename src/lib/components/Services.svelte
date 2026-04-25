<script lang="ts">
    import { services } from '$lib/lang/pl/services';
</script>

<section id="uslugi" class="bg-white px-8 py-20">
    <div class="container max-w-[1200px]">
        <h2 class="mb-12 text-center text-4xl font-bold text-forest-green">{services.title}</h2>
        <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
            {#each services.items as item (item.title)}
                <div class="rounded-[20px] border border-gray-100 bg-[#fdfdfd] p-8 transition-transform duration-300 hover:-translate-y-2.5 hover:shadow-2xl hover:shadow-black/5">
                    <h3 class="mb-4 text-xl font-bold text-text-dark">{item.title}</h3>
                    <p class="text-gray-600">{item.description}</p>
                </div>
            {/each}
        </div>
    </div>
</section>
