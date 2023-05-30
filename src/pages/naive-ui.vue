<script setup lang='ts'>
const { useDarkMode, language } = storeToRefs(useAppStore())
</script>

<template>
  <div>
    <naive-provider :dark="useDarkMode" :locale="language">
      <n-button>Button</n-button>
    </naive-provider>
  </div>
</template>

<style scoped lang='less'>

</style>
