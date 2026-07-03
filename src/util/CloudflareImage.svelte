<script lang="ts">
	import { env } from '$env/dynamic/public';

	let {
		src,
		alt,
		class: className = '',
		loading = 'lazy',
		width,
		height,
		quality = 85,
		...rest
	} = $props<{
		src: string;
		alt: string;
		class?: string;
		loading?: 'lazy' | 'eager';
		width?: number | string;
		height?: number | string;
		quality?: number;
		[key: string]: any;
	}>();

	const CDN_BASE = env.PUBLIC_R2_URL || '';

	let finalSrc = $derived.by(() => {
		if (src.startsWith('http') || src.startsWith('data:')) return src;
		if (!CDN_BASE) return src;

		const params = [
			width ? `width=${width}` : '',
			height ? `height=${height}` : '',
			`quality=${quality}`,
			'format=auto'
		]
			.filter(Boolean)
			.join(',');

		return `${CDN_BASE}/cdn-cgi/image/${params}/${src}`;
	});
</script>

<img src={finalSrc} {alt} class={className} {loading} {width} {height} {...rest} />
