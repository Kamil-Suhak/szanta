<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Services from '$lib/components/Services.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Reviews from '$lib/components/Reviews.svelte';
	import Contact from '$lib/components/Contact.svelte';

	let { form } = $props();
</script>

<Hero />
<Services />
<Projects />
<Reviews />
<Contact {form} />
