<script setup lang='ts'>
const props = withDefaults(defineProps<{ prefix?: string; name: string; color?: string }>(), {
  prefix: 'icon',
  color: '#333',
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg aria-hidden="true" v-bind="$attrs" :style="{ width: '1em', height: '1em' }">
    <use :xlink:href="symbolId" :fill="props.color" />
  </svg>
</template>

<style scoped lang='less'></style>
