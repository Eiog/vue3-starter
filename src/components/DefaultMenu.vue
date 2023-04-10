<script setup lang="ts">
const router = useRouter()
const { darkMode, language } = storeToRefs(useAppStore())

function changeLanguage() {
  language.value = language.value === 'zh_cn' ? 'en_us' : 'zh_cn'
}
function toggleDark(e: MouseEvent) {
  useToggleDark(e, (dark) => {
    darkMode.value = !dark
  })
}
</script>

<template>
  <div flex-center gap5 mt4>
    <n-tooltip trigger="hover">
      <template #trigger>
        <i i-ri-home-2-line class="btn" @click="router.push('/')" />
      </template>
      首页
    </n-tooltip>
    <n-tooltip trigger="hover">
      <template #trigger>
        <i i-ri-translate class="btn" @click="changeLanguage" />
      </template>
      中文
    </n-tooltip>
    <n-tooltip trigger="hover">
      <template #trigger>
        <i
          class="btn"
          :class="darkMode ? 'i-ri-moon-fill' : 'i-ri-sun-fill'"
          @click="toggleDark"
        />
      </template>
      暗黑模式
    </n-tooltip>
    <i i-ri-user-heart-line class="btn" @click="router.push('/about')" />
    <a
      href="https://github.com/xsrole/template-vue3"
      i-ri-github-fill
      class="btn"
      target="_blank"
      rel="noopener noreferrer"
    />
  </div>
</template>

<style scoped lang="less">
.btn {
  @apply text-xl transition-colors cursor-pointer hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400;
}
</style>
