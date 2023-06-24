<script setup lang='ts'>
defineOptions({
  name: 'IndexPage',
})
definePage({
  name: 'index-page',
})

const { data } = useRequest(
  useAlovaInstance.Get('/info', {}),
)
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
