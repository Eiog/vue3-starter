<script setup lang='ts'>
import HelloTsx from '~/components/HelloTsx'
</script>

<template>
  <div flex-col-center>
    <div><Hello /></div>
    <div><HelloTsx /></div>
  </div>
</template>

<style scoped lang='less'>

</style>

<route lang="yaml">
meta:
  layout: default
  title: index
</route>
