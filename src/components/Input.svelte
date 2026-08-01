<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	type inputProp = SvelteHTMLElements['input'];

	let { ...inputProps }: inputProp = $props();
</script>

<input {...inputProps} class="bg-neutral-800 px-4 py-4 outline-none hover:bg-neutral-900" />
