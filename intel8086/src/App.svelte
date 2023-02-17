<script lang="ts">
  import RegistryEntry from './components/RegistryEntry.svelte'
  import { appWindow } from '@tauri-apps/api/window'
  import CpuIcon from './icons/CPUIcon.svelte'
  import CloseIcon from './icons/CloseIcon.svelte'
  import { register } from './store/register.writable'
  import { operationHistory } from './store/operationHistory.writable'
  import { takeRight } from 'lodash'
  import { reverse } from 'lodash'
  import TwoRegistryOperations from './components/TwoRegistryOperations.svelte'
  import SingleRegisterOperations from './components/SingleRegisterOperations.svelte'

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
      <div class="p-4 bg-neutral w-96 border-r border-gray-800">
        <div class="flex items-center gap-2 font-medium mb-4 text-info">
          <CpuIcon />
          <h1 class="font-medium ">Intel 8086 Simulator</h1>
        </div>
        <h3 class="text-gray-500 text-sm mb-2">Rejestry</h3>
        <div class="flex gap-4 text-gray-300 flex-wrap max-w-[300px]">
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
        <div class="divider" />
        <h3 class="text-gray-500 text-sm mb-2">Ostatnie operacje:</h3>
        {#each reverse(takeRight($operationHistory, 5)) as log}
          <li class="text-gray-400 text-sm">
            {log.name} - <b>{log.a}</b>
            <span class="text-gray-500">/</span>
            <b>{log.b}</b>
          </li>
        {/each}
      </div>
      <div class="px-6 py-4 h-full w-full bg-neutral rounded-l-xl">
        <TwoRegistryOperations />
        <div class="divider" />
        <SingleRegisterOperations />
        <div class="mt-14 text-gray-500 font-semibold text-xs">
          Autor: Maciej Wiatr
        </div>
      </div>
    </section>
  </div>
</main>
