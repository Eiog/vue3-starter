<script setup lang='ts'>
import { Notifications, Notivue, push } from 'notivue'

onMounted(() => {
  window.$notivue = push
})
</script>

<template>
  <Notivue v-slot="item">
    <Notifications :item="item" />
  </Notivue>
</template>

<style scoped lang='less'>

</style>
