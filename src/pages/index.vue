<script setup lang='ts'>
// import { ipcRenderer } from 'electron'
import { useRequest } from 'vue-hooks-plus'

defineOptions({
  name: 'IndexPage',
})
useHead({
  title: '首页',
})
const { data } = useRequest(() => get('/info'))
get('/hello')
// console.log(ipcRenderer)
onMounted(() => {
  window.$notivue.info({ message: 'Hello World!', duration: 5000 })
})
</script>

<template>
  <div class="flex-col-center gap-10">
    <HelloWorld />
    <Examples />
    <Dependents />
    {{ data }}
    <div class="flex-center gap-1">
      <NButton v-track:exposure>
        ExposureTrack
      </NButton>
      <NButton v-track:click>
        ClickTrack
      </NButton>
      <NButton v-track:long-press>
        LongPressTrack
      </NButton>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>

<route lang="yaml">
name: index-page
meta:
  layout: default
  title: Hello World !
</route>
