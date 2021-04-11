import { derived, writable } from 'svelte/store';
import type { Genre } from '../models/genre';

export const genres = writable<Genre[]>(undefined);

export const selectedGenres = derived(genres, $genres => $genres?.filter(genre => genre.selected));