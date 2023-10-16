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
	<div class="w-full pt-[20vh] pb-16">
		<div class="w-full px-4 max-w-md mx-auto text-center">
			<slot />
		</div>
	</div>
</main>
