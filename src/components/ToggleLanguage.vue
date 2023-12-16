<script setup lang='ts'>
const { changeLanguage } = useAppStore()
</script>

<template>
  <i
    class="i-ri-translate
  text-xl
  transition-colors
  cursor-pointer
  hover:text-gray-500
  dark:text-gray-500
  dark:hover:text-gray-400"
    @click="() => changeLanguage()"
  />
</template>

<style scoped lang='less'>

</style>
