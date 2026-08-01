<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type divType = SvelteHTMLElements['div'];

	interface Props extends divType {
		children: Snippet;
	}

	let { children, ...restProps }: Props = $props();
</script>

<div class="flex h-dvh w-dvw flex-col items-center justify-center gap-4" {...restProps}>
	<div class="container h-full w-full px-4 py-8">
		{@render children()}
	</div>
</div>
