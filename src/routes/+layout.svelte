<script>
	import '../app.css';
</script>

<svelte:head>
	<title>Lars Graubner – Web Developer</title>
	<meta
		name="description"
		content="I help companies build performant and scalable solutions for customer facing web apps"
	/>
</svelte:head>

<main>
	<div class="w-full pb-16 pt-[20vh]">
		<div class="mx-auto w-full max-w-md px-4 text-center">
			<slot />
		</div>
	</div>
</main>
