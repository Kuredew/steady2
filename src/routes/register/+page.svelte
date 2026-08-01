<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import Button from '../../components/Button.svelte';
	import Container from '../../components/Container.svelte';
	import HeadingLarge from '../../components/HeadingLarge.svelte';
	import Input from '../../components/Input.svelte';
	import Paragraph from '../../components/Paragraph.svelte';
	import ParagraphDimmed from '../../components/ParagraphDimmed.svelte';

	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<Container>
	<div class="flex h-full w-full flex-col items-center justify-center">
		<form
			method="post"
			action="?/signUpEmail"
			use:enhance
			class="flex w-150 max-w-dvw flex-col gap-8 p-6"
		>
			<div class="flex flex-col gap-2">
				<HeadingLarge>Create a New Account</HeadingLarge>
				<ParagraphDimmed>Start your journey with steady</ParagraphDimmed>
			</div>

			<div class="flex flex-col gap-2">
				<Paragraph>E-mail</Paragraph>
				<Input name="email" placeholder="Enter your E-mail" />
			</div>

			<div class="flex flex-col gap-2">
				<Paragraph>Password</Paragraph>
				<Input name="password" placeholder="Enter your Password" />
			</div>

			<div class="flex flex-col items-center gap-2">
				<Paragraph class="text-red-300">{form?.message}</Paragraph>
				<Button class="w-full text-lg!" variant="primary" label="Introduce Myself!" />
				<ParagraphDimmed
					>Already have an account? <a href={resolve('/login')} class="font-bold">Login</a
					></ParagraphDimmed
				>
			</div>
		</form>
	</div>
</Container>
