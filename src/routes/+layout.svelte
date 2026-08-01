<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { SvelteKitTopLoader } from 'sveltekit-top-loader';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<SvelteKitTopLoader color="white" />
{@render children()}
