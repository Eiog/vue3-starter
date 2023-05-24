<script setup lang=ts>
const modelValue = defineModel<number>({ default: 0 })
defineOptions({
  name: 'DefineInput',
})
</script>

<template>
  <button @click="modelValue++">
    +
  </button>
  {{ modelValue }}
</template>
