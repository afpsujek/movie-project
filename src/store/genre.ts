import { writable } from 'svelte/store';
import type { Genre } from '../models/genre';

export const genres = writable<Genre[]>(undefined);