<script setup lang='ts'>
// import { ipcRenderer } from 'electron'

defineOptions({
  name: 'IndexPage',
})
definePage({
  name: 'index-page',
})

const { data } = useRequest(
  useAlova.Get('/info', {}),
)

// console.log(ipcRenderer)
</script>

<template>
  <div class="flex-col-center gap-10">
    <HelloWorld />
    <Examples />
    <Dependents />
    {{ data }}
    <div class="flex-center gap-1">
      <NButton v-use-track:exposure>
        ExposureTrack
      </NButton>
      <NButton v-use-track:click>
        ClickTrack
      </NButton>
      <NButton v-use-track:long-press>
        LongPressTrack
      </NButton>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>

<route lang="yaml">
meta:
  layout: default
  title: Hello World !
</route>
