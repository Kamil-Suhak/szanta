<script lang="ts">
	/*
	 * Why do we have both <EnhancedImage> and <enhanced:img> in this codebase?
	 *
	 * 1. For STATIC images (e.g. <img src="/images/hero.jpg">), we just use <enhanced:img> directly.
	 *    Vite natively understands string literals and processes them with zero overhead.
	 *
	 * 2. For DYNAMIC images (e.g. <img src={project.image}>), we MUST use this <EnhancedImage> wrapper.
	 *    Because `project.image` is a variable, the Vite compiler cannot know which image to optimize at build time.
	 *    By using `import.meta.glob` here, we create a tiny dictionary of all images in `static/images/`.
	 *    At runtime, this component looks up the dynamic variable against the dictionary to serve the optimized WebP/AVIF file.
	 */

	let {
		src,
		alt,
		class: className = '',
		loading = 'lazy',
		...rest
	} = $props<{
		src: string;
		alt: string;
		class?: string;
		loading?: 'lazy' | 'eager';
		[key: string]: any;
	}>();

	// Eagerly load a dictionary of all images in the src/lib/assets/images directory so we can look them up dynamically
	const imageModules = import.meta.glob('/src/lib/assets/images/**/*.{jpeg,jpg,png,JPG,JPEG,PNG}', {
		eager: true,
		query: {
			enhanced: true,
			format: 'avif;jpg'
		}
	});

	let finalSrc = $derived.by(() => {
		// External URLs don't get processed
		if (src.startsWith('http') || src.startsWith('data:')) return src;

		// The JSON manifest has paths like '/images/projects/1.jpg'.
		// We map this to the glob key format: '/src/lib/assets/images/projects/1.jpg'
		const globKey = src.startsWith('/images')
			? `/src/lib/assets${src}`
			: `/src/lib/assets/images/${src.replace(/^\//, '')}`;

		// Make lookup case-insensitive to avoid issues with mismatched casing between JSON and file system
		const matchingKey = Object.keys(imageModules).find(
			(k) => k.toLowerCase() === globKey.toLowerCase()
		);

		const module: any = matchingKey ? imageModules[matchingKey] : undefined;

		if (module && module.default) {
			return module.default;
		}

		// Fallback to the original src if not found in the dictionary
		console.warn(`[EnhancedImage] Could not find optimized image for: ${src}`);
		return src;
	});
</script>

<enhanced:img src={finalSrc} {alt} class={className} {loading} {...rest} />
