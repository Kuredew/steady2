<script lang="ts">
	import type { AnimationItem } from 'lottie-web';
	import Lottie from 'lottie-web';

	interface Props {
		renderer?: 'svg' | 'html' | 'canvas';
		checkoutCount: number;
		dataJsonPath: string;
		aspectRatio: string;
		onComplete?: () => void;
	}
	let { renderer = 'html', checkoutCount, aspectRatio, dataJsonPath, onComplete }: Props = $props();

	let container = $state<HTMLDivElement | null>(null);
	let animInstance: AnimationItem | null = null;
	let isLoaded = $state(false);

	$effect(() => {
		if (!container) return;

		animInstance = Lottie.loadAnimation({
			container,
			loop: false,
			autoplay: true,
			renderer: renderer,
			path: dataJsonPath
		});
		animInstance.frameRate = 24;

		animInstance.addEventListener('DOMLoaded', () => {
			isLoaded = true;
			updateText();
		});

		if (onComplete) {
			animInstance.addEventListener('complete', onComplete);
		}

		return () => {
			animInstance?.destroy();
		};
	});

	const updateText = () => {
		if (!animInstance || !isLoaded) return;

		const textElement = animInstance.renderer?.elements?.[0];

		if (textElement && typeof textElement.updateDocumentData === 'function') {
			textElement.updateDocumentData({ t: String(checkoutCount) }, 0);
		}
	};
</script>

<div class="relative h-dvh max-h-dvh w-dvw max-w-dvw overflow-hidden">
	<div
		class="absolute top-1/2 left-1/2 w-dvw -translate-1/2"
		style="height: calc(100dvw/{aspectRatio});"
		bind:this={container}
	></div>
</div>
