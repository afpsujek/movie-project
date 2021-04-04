<script lang="ts">
    import type { Genre } from "../models/genre";
    export let genre: Genre;
</script>

<style>
    .chip {
        width: 10rem;
        border: solid 1px black;
        border-radius: 10px;
        text-align: center;
        margin: 5px;
        cursor: pointer;
    }

    .chip:hover {
        background-color: lightgreen;
    }

    .selected {
        background-color: lightgray;
    }
</style>

<div on:click
    class="{genre.selected ? 'selected' : ''} chip">
    {genre.name}
</div>