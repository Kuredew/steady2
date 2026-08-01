<script lang="ts">
	import Paragraph from './Paragraph.svelte';

	let { children } = $props();
</script>

<Paragraph class="text-neutral-400">
	{@render children()}
</Paragraph>
