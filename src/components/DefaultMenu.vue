<script setup lang="ts">
const { darkMode, language } = storeToRefs(useAppStore())

function changeLanguage() {
  language.value = language.value === 'zh_cn' ? 'en_us' : 'zh_cn'
}
function toggleDark(e: MouseEvent) {
  useToggleDark(e, (dark) => {
    darkMode.value = !dark
  })
}
const dark = ref(false)
</script>

<template>
  <div flex-center gap5 mt4>
    <i i-ri-translate class="btn" @click="changeLanguage" />
    <i
      class="btn"
      :class="darkMode ? 'i-ri-moon-fill' : 'i-ri-sun-fill'"
      @click="toggleDark"
    />
    <a
      href="https://github.com/xsrole/template-vue3"
      i-ri-github-fill
      class="btn"
      target="_blank"
      rel="noopener noreferrer"
    />
    <DarkModeToggle v-model:value="dark" />
  </div>
</template>

<style scoped lang="less">
.btn {
  @apply text-xl transition-colors cursor-pointer hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400;
}
</style>
