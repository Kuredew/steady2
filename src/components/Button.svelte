<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	interface Prop {
		label?: string;
		variant?: 'primary' | 'secondary';
	}

	type ButtonProp = SvelteHTMLElements['button'];
	interface Props extends Prop, ButtonProp {}

	let { label, class: klass, variant = 'primary', ...otherProps }: Props = $props();
</script>

<button
	class="w-fit cursor-pointer px-8 py-4 text-sm font-medium {variant == 'primary'
		? 'bg-white text-black hover:bg-neutral-300 disabled:bg-neutral-300'
		: 'bg-neutral-800 hover:bg-neutral-900 disabled:bg-neutral-900'} {klass}"
	{...otherProps}
>
	{label}
</button>
