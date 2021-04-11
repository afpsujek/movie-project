<script lang="ts">
	import axios from 'axios';
	import Chip from './components/Chip.svelte'
	import Suggestion from './components/Suggestion.svelte';
	import { onMount } from 'svelte';
	import { genres } from './store/genre'
	import { session } from './store/session';
	import type { Genre } from './models/genre';

	onMount(async () => {
		const sessionData = await axios.get(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${globalThis.__TMD_API_KEY__}`);
		const genreData = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${globalThis.__TMD_API_KEY__}&language=en-US`)
		session.update(() => sessionData.data.guest_session_id);
		genres.update(() => genreData.data.genres.map(genre => {
				return {...genre, selected: false};
		}));
	});

	function onSelected(selected: Genre) {
		genres.update(genres => genres.map(genre => {
			return selected.id === genre.id ? {...genre, selected: !genre.selected} : genre
		}))
	}
</script>

<main class="flex_column">
	<div class="flex_column title_container">
		<h1>Don't know what movie to watch?</h1>
		<h2>Let me help with that</h2>
	</div>

	<div class="content_container">
		<div class="flex_column chips_container">
			{#if $genres}
				{#each $genres as genre}
					<Chip on:click={() => onSelected(genre)} genre={genre}></Chip>
				{/each}
			{/if}
		</div>
		<Suggestion></Suggestion>
	</div>
</main>

<style>
	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.title_container {
		align-items: center;
	}

	.chips_container {
		width: fit-content;
	}

	.content_container {
		display: flex;
		padding-top: 1rem;
	}
</style>