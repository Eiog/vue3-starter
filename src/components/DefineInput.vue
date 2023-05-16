<script setup lang=ts>
import { defineModel } from 'vue'

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
