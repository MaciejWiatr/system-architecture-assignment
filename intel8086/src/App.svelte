<script lang="ts">
  import RegistryEntry from './lib/RegistryEntry.svelte'
  import { writable } from 'svelte/store'
  import { appWindow } from '@tauri-apps/api/window'
  import type { Register, RegistryName } from './types/Registry'
  import CpuIcon from './lib/icons/CPUIcon.svelte'
  import CloseIcon from './lib/icons/CloseIcon.svelte'

  const register = writable<Register>({
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

  let selectedOperation = ''
  let a
  let b

  console.log($register)

  const operations = {
    MOV: (registryA: RegistryName, registryB: RegistryName) => {
      register.update((r) => {
        r[registryB].value = r[registryA].value
        return r
      })
    },
    XCHG: (registryA: RegistryName, registryB: RegistryName) => {
      register.update((r) => {
        ;[r[registryA].value, r[registryB].value] = [
          r[registryB].value,
          r[registryA].value,
        ]
        return r
      })
    },
  }

  $: hasErrors = Object.entries($register).some(([_, reg]) => !reg.valid)
</script>

<main class="flex flex-col h-full">
  <div
    data-tauri-drag-region
    class="h-8 flex w-full bg-info fixed top-0 items-center justify-end select-none"
  >
    <button
      on:click={() => appWindow.close()}
      class="titlebar-button bg-transparent shadow-none hover:border-none hover:text-white text-base-100"
      id="titlebar-close"
    >
      <CloseIcon />
    </button>
  </div>
  <div class="w-full h-full overflow-y-hidden text-gray-100 bg-neutral mt-8">
    <section class="flex h-full z-20">
      <div class="p-4 bg-neutral w-80 border-r border-gray-800">
        <div class="flex items-center gap-2 font-medium mb-4 text-info">
          <!-- svelte-ignore a11y-missing-attribute -->
          <CpuIcon />
          <h1 class="font-medium ">Intel 8086 Simulator</h1>
        </div>
        <h3 class="text-gray-500 text-sm mb-2">Rejestry</h3>
        <div class="flex gap-4 text-gray-300 flex-wrap max-w-[200px]">
          {#each Object.keys($register) as registryKey}
            <RegistryEntry
              title={registryKey}
              bind:value={$register[registryKey].value}
              bind:valid={$register[registryKey].valid}
            />
          {/each}
        </div>
        {#if hasErrors}
          <div class="text-red-500 text-sm mt-2">
            Podane wartości rejestrów są nieprawidłowe
          </div>
        {/if}
      </div>
      <div class="px-6 py-4 h-full w-full bg-neutral rounded-l-xl">
        <h3 class="text-gray-400 text-sm mb-4">Wykonaj operację:</h3>
        <div class="flex items-center gap-4 text-gray-300">
          <select bind:value={a} class="select select-bordered max-w-xs">
            {#each Object.keys($register) as registryKey}
              <option>{registryKey}</option>
            {/each}
          </select>
          -
          <select
            bind:value={selectedOperation}
            class="select select-bordered max-w-xs h-10"
          >
            {#each Object.keys(operations) as operationName}
              <option>{operationName}</option>
            {/each}
          </select>
          -
          <select bind:value={b} class="select select-bordered max-w-xs">
            {#each Object.keys($register) as registryKey}
              <option>{registryKey}</option>
            {/each}
          </select>
        </div>
        <button
          on:click={operations[selectedOperation](a, b)}
          class="btn w-full mt-6">Wykonaj</button
        >
      </div>
    </section>
  </div>
</main>
