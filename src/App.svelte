<script lang="ts">
	import axios from 'axios';
	import Chip from './components/Chip.svelte'
	import { onMount } from 'svelte';
	import { genres } from './store/genre'
	import { session } from './store/session';

	onMount(async () => {
		const sessionData = await axios.get(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${globalThis.__TMD_API_KEY__}`);
		const genreData = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${globalThis.__TMD_API_KEY__}&language=en-US`)
		session.update(() => sessionData.data.guest_session_id);
		genres.update(() => genreData.data.genres);
	});
</script>

<main>
	<h1>Don't know what movie to watch?</h1>
	<h2>Let me help with that</h2>
	
	{#if $genres}
		{#each $genres as genre}
		<Chip></Chip>
		{/each}
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
	}
</style>