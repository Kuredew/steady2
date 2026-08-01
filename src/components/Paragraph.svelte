<script lang="ts">
	let { children, class: klass = '' } = $props();
</script>

<p class="max-w-200 text-wrap {klass}">
	{@render children()}
</p>
