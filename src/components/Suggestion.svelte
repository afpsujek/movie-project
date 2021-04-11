<script lang="ts">
    import { selectedGenres } from '../store/genre';
    import { session } from '../store/session';
</script>

<style>
    .suggestion {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>

<div class="suggestion">
    {#if $selectedGenres?.length === 0}
        <h3>Select some genres to get started</h3>
    {/if}
    
    <button on:click="">Get a movie selection</button>
</div>