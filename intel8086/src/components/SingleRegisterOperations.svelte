<script lang="ts">
  import type { RegistryName } from 'src/types/Registry'
  import { decToHex, hexToDec } from '../utils/number.utils'
  import { register } from '../store/register.writable'
  import { logOperation } from '../store/operationHistory.writable'
  import RegistryEntry from './RegistryEntry.svelte'

  const operations = {
    ADD: {
      fn: (registryA: RegistryName, value: string) => {
        register.update((r) => {
          const a = hexToDec(r[registryA].value) || 0
          const sum = a + (hexToDec(value) || 0)
          r[registryA].value = decToHex(sum)
          return r
        })
        logOperation({ name: 'ADD', a: registryA, b: value })
      },
      withValue: true,
    },
    SUB: {
      fn: (registryA: RegistryName, value: string) => {
        register.update((r) => {
          const a = hexToDec(r[registryA].value) || 0
          const sum = a - hexToDec(value) || 0
          r[registryA].value = decToHex(sum)
          return r
        })
        logOperation({ name: 'SUB', a: registryA, b: value })
      },
      withValue: true,
    },
    NOT: {
      fn: (registryA: RegistryName, value: string | undefined) => {
        register.update((r) => {
          r[registryA].value = decToHex(~hexToDec(r[registryA].value) || 0)
          return r
        })

        logOperation({ name: 'NOT', a: registryA, b: value })
      },
      withValue: false,
    },
    INC: {
      fn: (registryA: RegistryName, value: string | undefined) => {
        register.update((r) => {
          r[registryA].value = decToHex((hexToDec(r[registryA].value) || 0) + 1)
          return r
        })

        logOperation({ name: 'INC', a: registryA, b: '+1' })
      },
      withValue: false,
    },
    DEC: {
      fn: (registryA: RegistryName, value: string | undefined) => {
        register.update((r) => {
          r[registryA].value = decToHex((hexToDec(r[registryA].value) || 0) - 1)
          return r
        })

        logOperation({ name: 'DEC', a: registryA, b: '-1' })
      },
      withValue: false,
    },
  }

  let selectedRegistry: RegistryName = undefined
  let value: string = ''
  let valueValid: boolean = true
  let selectedOperation: keyof typeof operations

  const clearValue = () => (value = '')
  $: withValue = !selectedOperation || !operations[selectedOperation].withValue
</script>

<h3 class="text-gray-400 text-sm mb-4">
  Wykonaj operację na jednym rejestrze:
</h3>
<div class="flex gap-4 items-center">
  <select bind:value={selectedRegistry} class="select select-bordered max-w-xs">
    {#each Object.keys($register) as registryKey}
      <option>{registryKey}</option>
    {/each}
  </select>
  -
  <select
    bind:value={selectedOperation}
    on:change={clearValue}
    class="select placeholder:text-error max-w-xs h-10"
  >
    {#each Object.keys(operations) as operationName}
      <option>{operationName}</option>
    {/each}
  </select>

  <RegistryEntry
    title="Z wartością"
    bind:value
    bind:valid={valueValid}
    bind:disabled={withValue}
  />
</div>

<button
  disabled={!valueValid}
  on:click={() => operations[selectedOperation].fn(selectedRegistry, value)}
  class="btn w-full mt-6">Wykonaj</button
>

{#if !valueValid}
  <p class="text-error w-full text-center mt-2 text-sm">
    Podaj poprawną wartość!
  </p>
{/if}
