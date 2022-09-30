import { writable } from 'svelte/store';
import { Cells } from 'wasm';
import type { ToolbarActionsEnum } from '../types/toolbar-actions.enum';

export const activeCell = writable<Cells>(Cells.Start);
export const event = writable<ToolbarActionsEnum>();
