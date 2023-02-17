<script lang="ts">
  import { logOperation } from '../store/operationHistory.writable'
  import { register } from '../store/register.writable'
  import type { RegistryName } from '../types/Registry'

  let selectedOperation = ''
  let selectedRegistryA
  let selectedRegistryB

  const operations = {
    MOV: (registryA: RegistryName, registryB: RegistryName) => {
      register.update((r) => {
        r[registryB].value = r[registryA].value
        return r
      })

      logOperation({ name: 'MOV', a: registryA, b: registryB })
    },
    XCHG: (registryA: RegistryName, registryB: RegistryName) => {
      register.update((r) => {
        ;[r[registryA].value, r[registryB].value] = [
          r[registryB].value,
          r[registryA].value,
        ]
        return r
      })

      logOperation({ name: 'XCHG', a: registryA, b: registryB })
    },
  }
</script>

<h3 class="text-gray-400 text-sm mb-4">
  Wykonaj operację na dwóch rejestrach:
</h3>
<div class="flex items-center gap-4 text-gray-300">
  <select
    bind:value={selectedRegistryA}
    class="select select-bordered max-w-xs"
  >
    {#each Object.keys($register) as registryKey}
      <option>{registryKey}</option>
    {/each}
  </select>
  -
  <select
    bind:value={selectedOperation}
    class="select placeholder:text-error max-w-xs h-10"
  >
    {#each Object.keys(operations) as operationName}
      <option>{operationName}</option>
    {/each}
  </select>
  -
  <select
    bind:value={selectedRegistryB}
    class="select select-bordered max-w-xs"
  >
    {#each Object.keys($register) as registryKey}
      <option>{registryKey}</option>
    {/each}
  </select>
</div>
<button
  on:click={operations[selectedOperation](selectedRegistryA, selectedRegistryB)}
  class="btn w-full mt-6">Wykonaj</button
>
