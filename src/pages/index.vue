<script setup lang='ts'>
// import { ipcRenderer } from 'electron'

defineOptions({
  name: 'IndexPage',
})
definePage({
  name: 'index-page',
})

const { data } = useRequest(
  useAlovaInstance.Get('/info', {}),
)

// console.log(ipcRenderer)
</script>

<template>
  <div class="flex-col-center gap-10">
    <HelloWorld />
    <Examples />
    <Dependents />
    {{ data }}
  </div>
</template>

<style scoped lang='less'>

</style>

<route lang="yaml">
meta:
  layout: default
  title: Hello World !
</route>
