import type { Register } from 'src/types/Registry'
import { writable } from 'svelte/store'

export const register = writable<Register>({
  AH: {
    valid: true,
    value: '',
  },
  AL: {
    valid: true,
    value: '',
  },
  BH: {
    valid: true,
    value: '',
  },
  BL: {
    valid: true,
    value: '',
  },
  CH: {
    valid: true,
    value: '',
  },
  CL: {
    valid: true,
    value: '',
  },
  DH: {
    valid: true,
    value: '',
  },
  DL: {
    valid: true,
    value: '',
  },
})
