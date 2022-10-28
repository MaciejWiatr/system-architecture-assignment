export type RegistryName = 'AH' | 'AL' | 'BH' | 'BL' | 'CH' | 'CL' | 'DH' | 'DL' 
export interface RegistryContent {
  value: string
  valid: boolean
}

export type Register = Record<RegistryName, RegistryContent>