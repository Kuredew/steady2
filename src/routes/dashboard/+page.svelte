<script lang="ts">
	import { resolve } from '$app/paths';
	import { fade } from 'svelte/transition';
	import Button from '../../components/Button.svelte';
	import Container from '../../components/Container.svelte';
	import HeadingLarge from '../../components/HeadingLarge.svelte';
	import ParagraphDimmed from '../../components/ParagraphDimmed.svelte';
	import CheckoutsAnimation from '../../components/CheckoutsAnimation.svelte';
	import { enhance } from '$app/forms';
	import ParagraphDimmedSmall from '../../components/ParagraphDimmedSmall.svelte';

	interface animationDataType {
		renderer: 'html' | 'svg' | 'canvas';
		aspectRatio: string;
		path: string;
	}

	let animationDataPaths: animationDataType[] = [
		{
			renderer: 'html',
			aspectRatio: '1.13',
			path: '/animation/a/a.json'
		},
		{
			renderer: 'html',
			aspectRatio: '0.22',
			path: '/animation/b/b.json'
		},
		{
			renderer: 'svg',
			aspectRatio: '1.57',
			path: '/animation/c/c.json'
		},
		{
			renderer: 'svg',
			aspectRatio: '1.43',
			path: '/animation/d/d.json'
		},
		{
			renderer: 'html',
			aspectRatio: '0.84',
			path: '/animation/e/e.json'
		},
		{
			renderer: 'html',
			aspectRatio: '0.44',
			path: '/animation/f/f.json'
		},
		{
			renderer: 'html',
			aspectRatio: '1.06',
			path: '/animation/end/end.json'
		}
	];

	let animationDataCurrentIndex = $state<number>(0);
	let playingAnimation = $state(false);
	let checkouting = $state(false);
	let checkouted = $state(false);
	let button = $state<HTMLButtonElement | null>(null);
	let resetClicked = $state(false);

	const triggerAnimation = () => {
		checkouted = true;
		setTimeout(() => {
			(async () => {
				const sound = new Audio('/sound/music.mp3');
				await sound.play();

				sound.addEventListener('timeupdate', () => {
					if (!playingAnimation && sound.currentTime > 0) playingAnimation = true;
				});
			})();
		}, 200);
	};
	const complete = () => {
		if (!button) return;

		if (animationDataPaths[animationDataCurrentIndex + 1]) {
			animationDataCurrentIndex++;
		} else {
			console.log('Completed');
			button.onclick = done;
			button.classList.add('cursor-pointer');
		}
	};
	const done = () => {
		checkouted = false;
		checkouting = false;
		playingAnimation = false;
		animationDataCurrentIndex = 0;
	};

	let { data } = $props();
</script>

{#if checkouted}
	<button
		class="absolute top-0 left-0 z-100 min-h-dvh min-w-dvw bg-black"
		in:fade={{ duration: 100 }}
		out:fade={{ duration: 100 }}
		bind:this={button}
	>
		{#if playingAnimation}
			<CheckoutsAnimation
				renderer={animationDataPaths[animationDataCurrentIndex].renderer ?? 'html'}
				aspectRatio={animationDataPaths[animationDataCurrentIndex].aspectRatio}
				dataJsonPath={animationDataPaths[animationDataCurrentIndex].path}
				checkoutCount={data.goal.checkoutsCount}
				onComplete={complete}
			/>
		{/if}
	</button>
{/if}

{#if !checkouted}
	<div out:fade={{ duration: 100 }}>
		<Container>
			<div class="flex h-full w-full flex-col gap-8 lg:px-58">
				{#if data.goal.checkoutsCount >= data.goal.maxCheckoutsCount}
					<div class="flex h-full flex-col justify-center gap-4">
						<HeadingLarge>Thanks for using Steady!</HeadingLarge>
						<ParagraphDimmed
							>You’ve reached your {data.goal.maxCheckoutsCount}th checkout! This means our mission
							is complete, and we’re temporarily pausing checkout activity. If you’d like to
							continue, you can click the “Continue Checkout” button below. Please note that
							clicking “Continue Checkout” will resume checkouts for the next 30 days. To stop
							checkouts now and delete your account at the same time, select “Finish.”</ParagraphDimmed
						>
						<div class="flex gap-4">
							<form method="POST" action="?/finish" use:enhance>
								<Button type="submit" label="Finish" />
							</form>
							<form method="POST" action="?/continue" use:enhance>
								<Button type="submit" label="Continue Checkout" variant="secondary" />
							</form>
						</div>
					</div>
				{:else if resetClicked}
					<div class="flex h-full flex-col justify-center gap-4">
						<HeadingLarge>Are you sure you want to reset the checkouts?</HeadingLarge>
						<ParagraphDimmed
							>Resetting the checkouts will restart them from 0. This means you'll lose your
							progress. Do you want to continue?</ParagraphDimmed
						>
						<div class="flex gap-4">
							<form
								method="POST"
								action="?/reset"
								use:enhance={() => {
									checkouting = true;
									return async (event) => {
										await event.update();

										if (event.result.type === 'success') {
											resetClicked = false;
											triggerAnimation();
										}
									};
								}}
							>
								<Button type="submit" label={!checkouting ? 'Yes, Please' : 'Loading...'} />
							</form>
							<Button
								type="submit"
								label="Cancel"
								variant="secondary"
								onclick={() => {
									resetClicked = false;
								}}
							/>
						</div>
					</div>
				{:else}
					<div class="flex flex-1 flex-col gap-8">
						<div class="flex flex-col">
							<ParagraphDimmed>Quote of the day</ParagraphDimmed>
							<HeadingLarge>"{data.quote}"</HeadingLarge>
						</div>

						<div class="flex flex-col gap-2">
							<ParagraphDimmed>
								This is where the magic happens—visit this website every morning, afternoon, or
								evening—whenever you like—to claim one increment each day.
							</ParagraphDimmed>
							<ParagraphDimmed>
								Every 10 attempts, an interesting animation will appear when you click “Claim,” and
								sometimes an engaging video will play in the background for 24 hours.
							</ParagraphDimmed>
							<ParagraphDimmed>
								The “Checkouts” button is only available from midnight to 11 p.m. the following day,
								so don’t miss out. And don't forget, Ramielle will be waiting for you here every
								day!
							</ParagraphDimmed>
							<ParagraphDimmed>
								Oh, by the way, since I went ahead and created a logout button, you can log out by
								<a href={resolve('/logout')}
									><span class="font-medium underline"> clicking here </span></a
								>
							</ParagraphDimmed>
							<ParagraphDimmed>
								Oh, right, I almost forgot—you can trigger the animation over and over again; just
								<button class="cursor-pointer" onclick={triggerAnimation}
									><span class="font-medium underline"> click here </span></button
								>
							</ParagraphDimmed>
							<ParagraphDimmed>
								Oh, and one more thing—if you want to reset your progress, <button
									class="cursor-pointer font-medium underline"
									onclick={() => {
										resetClicked = true;
									}}>click here</button
								> to reset the checkout
							</ParagraphDimmed>
						</div>

						<div class="relative flex flex-1 flex-col bg-white">
							<img src="/images/image.webp" alt="" class="absolute h-full w-full object-cover" />
							<div class="flex-1"></div>
							<div class="z-10 px-8 py-4">
								<p>You're in</p>
								<div class="flex items-end gap-2">
									<h1 class="text-9xl font-medium">
										{data.goal.checkoutsCount}<span class="text-xl">checkout(s)</span>
									</h1>
								</div>
							</div>
						</div>
					</div>
					<div class="flex items-center justify-between gap-4">
						<ParagraphDimmedSmall
							>Latest Checkout at {data.goal.latestCheckoutsDate ??
								'No Checkout'}</ParagraphDimmedSmall
						>
						<form
							method="POST"
							use:enhance={() => {
								checkouting = true;
								return async (event) => {
									await event.update();

									if (event.result.type === 'success') triggerAnimation();
								};
							}}
							action="?/checkouts"
						>
							<input name="can_checkout" type="hidden" value={data.canCheckout ? 'yes' : 'no'} />
							<Button
								type="submit"
								variant="primary"
								label={!checkouting
									? data.canCheckout
										? 'Checkouts!'
										: 'Wait Tomorrow'
									: 'Processing'}
								disabled={checkouting || !data.canCheckout}
							/>
						</form>
					</div>
				{/if}
			</div>
		</Container>
	</div>
{/if}
