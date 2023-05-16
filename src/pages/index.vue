<script setup lang='ts'>
import HelloTsx from '~/components/HelloTsx'

// eslint-disable-next-line no-console
get('/api').then(res => console.log(res))
</script>

<template>
  <div flex-col-center>
    <div><Hello /></div>
    <div><HelloTsx /></div>
    <div><DefineInput /></div>
  </div>
</template>

<style scoped lang='less'>

</style>

<route lang="yaml">
meta:
  layout: default
  title: index
</route>
