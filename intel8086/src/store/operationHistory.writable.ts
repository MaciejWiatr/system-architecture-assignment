import type { Operation } from 'src/types/Operation'
import { writable } from 'svelte/store'

export const operationHistory = writable<Operation[]>([])

export const logOperation = (operation: Operation) =>
  operationHistory.update((history) => [...history, operation])
