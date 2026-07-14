<script lang="ts">
	import './layout.css';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Szanta Ogrody | Profesjonalne Usługi Ogrodnicze</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
{@render children()}
<Footer />
