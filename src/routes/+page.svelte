<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import Services from '$lib/components/sections/Services.svelte';
	import Projects from '$lib/components/sections/Projects.svelte';
	import Reviews from '$lib/components/sections/Reviews.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';

	let { form } = $props();
</script>

<Hero />
<Services />
<Projects />
<Reviews />
<Contact {form} />
