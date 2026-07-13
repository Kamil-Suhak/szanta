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
		width,
		height,
		...rest
	} = $props<{
		src: string;
		alt: string;
		class?: string;
		loading?: 'lazy' | 'eager';
		width?: number | string;
		height?: number | string;
		[key: string]: any;
	}>();

	// Eagerly load a dictionary of all images in the static/images directory so we can look them up dynamically
	const imageModules = import.meta.glob('/static/images/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,JPG,JPEG,PNG,WEBP}', {
		eager: true,
		query: {
			enhanced: true
		}
	});

	let finalSrc = $derived.by(() => {
		// External URLs don't get processed
		if (src.startsWith('http') || src.startsWith('data:')) return src;
		
		// Ensure the path matches the glob keys which start with /static
		const globKey = src.startsWith('/images') ? `/static${src}` : `/static/images/${src.replace(/^\//, '')}`;
		
		const module: any = imageModules[globKey];
		
		if (module && module.default) {
			return module.default;
		}

		// Fallback to the original src if not found in the dictionary
		console.warn(`[EnhancedImage] Could not find optimized image for: ${src}`);
		return src;
	});
</script>

<enhanced:img src={finalSrc} {alt} class={className} {loading} {width} {height} {...rest} />
