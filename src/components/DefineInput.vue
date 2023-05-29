<script setup lang=ts>
const value = defineModel<number>('value', { default: 0 })
defineOptions({
  name: 'DefineInput',
})
</script>

<template>
  <button @click="value++">
    +（{{ value }}）
  </button>
</template>
