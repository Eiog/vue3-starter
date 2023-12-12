<script setup lang='ts'>
import { Notifications, Notivue } from 'notivue'
</script>

<template>
  <Notivue v-slot="item">
    <Notifications :item="item" />
  </Notivue>
</template>

<style scoped lang='less'>

</style>
