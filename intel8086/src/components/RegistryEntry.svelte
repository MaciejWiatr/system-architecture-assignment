<script lang="ts">
  import isHexadecimal from 'validator/lib/isHexadecimal'
  import isEmpty from 'validator/lib/isEmpty'

  export let value: string
  export let title: string
  export let valid: boolean
  export let disabled: boolean = undefined

  const onChange: svelte.JSX.FormEventHandler<HTMLInputElement> = (e) => {
    valid = true
    const inputValue = (e.target as HTMLInputElement).value
    if (!isEmpty(value) && !isHexadecimal(value)) valid = false

    value = inputValue
  }
</script>

<div class="flex gap-2 items-center">
  {title}:
  <input
    on:input|preventDefault={onChange}
    on:blur={onChange}
    {disabled}
    value={value.toUpperCase()}
    class="input input-bordered w-14 h-8 px-2"
    maxlength="3"
    class:border-red-500={!valid}
  />
</div>
