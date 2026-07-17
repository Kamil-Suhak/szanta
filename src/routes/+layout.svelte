<script lang="ts">
	import './layout.css';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import ogCover from '$lib/assets/og-cover.jpg';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<title>Szanta | Profesjonalne Usługi Ogrodnicze</title>
	<link rel="icon" href={favicon} />

	<!-- Primary Meta Tags -->
	<meta
		name="description"
		content="Szanta - Profesjonalne usługi ogrodnicze. Projektowanie, realizacja i pielęgnacja terenów zielonych."
	/>
	<meta name="author" content="Szanta Ogrody" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:title" content="Szanta | Profesjonalne Usługi Ogrodnicze" />
	<meta
		property="og:description"
		content="Szanta - Profesjonalne usługi ogrodnicze. Projektowanie, realizacja i pielęgnacja terenów zielonych."
	/>
	<meta property="og:image" content={`${page.url.origin}${ogCover}`} />

	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="pl_PL" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={page.url.href} />
	<meta name="twitter:title" content="Szanta | Profesjonalne Usługi Ogrodnicze" />
	<meta
		name="twitter:description"
		content="Szanta - Profesjonalne usługi ogrodnicze. Projektowanie, realizacja i pielęgnacja terenów zielonych."
	/>
	<meta name="twitter:image" content={`${page.url.origin}${ogCover}`} />
</svelte:head>

<Navbar />
{@render children()}
<Footer />
