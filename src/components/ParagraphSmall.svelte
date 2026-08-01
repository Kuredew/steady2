<script lang="ts">
	import Paragraph from './Paragraph.svelte';

	let { children } = $props();
</script>

<Paragraph class="text-sm">
	{@render children()}
</Paragraph>
