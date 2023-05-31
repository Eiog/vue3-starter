<script setup lang='ts'>
const { language } = storeToRefs(useAppStore())

function changeLanguage() {
  language.value = language.value === 'zh_cn' ? 'en_us' : 'zh_cn'
}
</script>

<template>
  <i i-ri-translate class="text-xl transition-colors cursor-pointer hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" @click="changeLanguage" />
</template>

<style scoped lang='less'>

</style>
