<script setup lang='ts'>
// eslint-disable-next-line no-console
get('/api').then(res => console.log(res))
</script>

<template>
  <div class="flex-col-center gap-3">
    <HelloWorld />
    <Examples />
    <Dependents />
  </div>
</template>

<style scoped lang='less'>

</style>

<route lang="yaml">
meta:
  layout: default
  title: Hello World !
</route>
