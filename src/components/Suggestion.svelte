<script lang="ts">
    import { selectedGenres } from '../store/genre';
    import axios from 'axios';
    import { session } from '../store/session';
    import type { Genre } from '../models/genre';

    let movie: any = null;
    let src: string;

    async function getMovies(selectedGenres: Genre[]) {
        const genreIds = selectedGenres.map(genre => genre.id).toString();
        const numPagesQueryResp = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${globalThis.__TMD_API_KEY__}&language=en-US&include_adult=false&include_video=false&with_genres=${genreIds}`);
        const numPages = numPagesQueryResp.data.total_pages;
        const movies = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${globalThis.__TMD_API_KEY__}&language=en-US&include_adult=false&include_video=false&page=${random(numPages)}&with_genres=${genreIds}`);
        movie = movies.data.results[random(movies.data.results.length)];
        src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
        console.log(movie)
    }

    function random(max: number): number {
        return Math.floor(Math.random() * max) + 1 
    }

    function handlePosterError() {
        this.style.visibility = 'hidden'
        console.log(this.style.visibility)
    }
</script>

<style>
    .suggestion {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .movie_poster {
        width: 20rem;
        height: auto;
    }
</style>

<div class="suggestion">
    {#if $selectedGenres?.length === 0}
        <h3>Select some genres to get started</h3>
    {/if}

    {#if movie}
        <img class="movie_poster" {src} alt="movie poster" on:error="{() => src='generic_movie_poster.jpg'}"/>
        <h3 class="movie_title">{movie.title}</h3>
    {/if}

    {#if movie === undefined}
        <h3>Could not find a movie with that genre combo</h3>
    {/if}
    
    <button on:click="{() => getMovies($selectedGenres)}">Get a movie selection</button>
</div>