<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		href,
		type = 'button',
		variant = 'primary',
		class: className = '',
		disabled = false,
		onclick,
		children,
		...rest
	} = $props<{
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		variant?: 'primary' | 'secondary';
		class?: string;
		disabled?: boolean;
		onclick?: (e: MouseEvent) => void;
		children?: Snippet;
		[key: string]: any;
	}>();
</script>

{#if href}
	<a
		{href}
		class="{variant === 'primary' ? 'btn-primary' : 'btn-secondary'} {className}"
		{onclick}
		{...rest}
	>
		{#if children}
			{@render children()}
		{/if}
	</a>
{:else}
	<button
		{type}
		{disabled}
		class="{variant === 'primary' ? 'btn-primary' : 'btn-secondary'} {className}"
		{onclick}
		{...rest}
	>
		{#if children}
			{@render children()}
		{/if}
	</button>
{/if}
