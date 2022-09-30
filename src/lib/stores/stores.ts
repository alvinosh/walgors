import { writable } from 'svelte/store';
import { Cells } from 'wasm';

export const activeCell = writable<Cells>(Cells.Start);
