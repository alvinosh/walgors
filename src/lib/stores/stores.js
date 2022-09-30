import { writable } from 'svelte/store';
import { Cells } from 'wasm';
export const activeCell = writable(Cells.Start);
export const event = writable();
//# sourceMappingURL=stores.js.map