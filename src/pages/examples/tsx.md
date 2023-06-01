---
title: Tsx Demo
---

<script setup>
import {HelloTsx} from '~/components/HelloTsx'
definePage({
  name: 'tsx-demo',
})
</script>

# Tsx Demo

<HelloTsx :value="10"/>

```tsx
export const HelloTsx = defineComponent({
  name: 'HelloTsx',
  props: {
    value: {
      type: Number,
      default: undefined,
    },
  },
  emits: {
    'update:value': (value: number) => true,
  },
  setup(props, { emit }) {
    const inputValue = ref<number>(props.value ?? 0)
    watch(() => inputValue.value, value => emit('update:value', value))
    const add = () => inputValue.value++
    const sub = () => inputValue.value--
    return {
      inputValue,
      add,
      sub,
    }
  },
  render() {
    return (
      <>
        <button class="bg-black/10 p-x-8 p-y-2 rounded-md text-3xl active:bg-black/20" onClick={this.sub} >-</button>
        <span class="text-3xl p-x-8 p-y-2">{this.inputValue}</span>
        <button class="bg-black/10 p-x-8 p-y-2 rounded-md text-3xl active:bg-black/20" onClick={this.add} >+</button>
      </>
    )
  },
})
```
