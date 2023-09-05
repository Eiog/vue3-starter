<script setup lang='ts'>
const { darkMode } = storeToRefs(useAppStore())
</script>

<template>
  <i
    class="text-xl transition-colors cursor-pointer hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
    :class="darkMode ? 'i-ri-moon-fill' : 'i-ri-sun-fill'"
    @click="toggleDark"
  />
</template>

<style scoped lang='less'>

</style>
