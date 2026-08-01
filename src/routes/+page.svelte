<script>
	import { resolve } from '$app/paths';
	import Button from '../components/Button.svelte';
	import Container from '../components/Container.svelte';
	import HeadingLarge from '../components/HeadingLarge.svelte';
	import ParagraphDimmed from '../components/ParagraphDimmed.svelte';
</script>

<Container>
	<div class="flex h-full flex-col justify-center gap-10">
		<div class="flex flex-col gap-4">
			<HeadingLarge>Keep up your routine by reminding yourself of it every day</HeadingLarge>
			<ParagraphDimmed>
				Do you always forget your routine, your habits, or your goals? You can try to remember them
				every day by forming a new habit. Try it now
			</ParagraphDimmed>
		</div>

		<div class="flex gap-4">
			<a href={resolve('/login')}><Button label="Get Started →" variant="primary" /></a>
			<a href={resolve('/register')}><Button label="Sign-up For Free" variant="secondary" /></a>
		</div>
	</div>
</Container>
