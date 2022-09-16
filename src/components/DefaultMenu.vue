<script setup lang="ts">
const router = useRouter();
const { darkMode, language } = storeToRefs(useAppStore());

function changeLanguage() {
  language.value = language.value === 'zh_cn' ? 'en_us' : 'zh_cn';
}
</script>
<template>
  <div flex-center gap5 mt4>
    <n-tooltip trigger="hover">
      <template #trigger>
        <i i-ri-home-2-line class="btn" @click="router.push('/')"></i>
      </template>
      首页
    </n-tooltip>
    <n-tooltip trigger="hover">
      <template #trigger>
        <i i-ri-translate class="btn" @click="changeLanguage"></i>
      </template>
      中文
    </n-tooltip>
    <n-tooltip trigger="hover">
      <template #trigger>
        <i
          class="btn"
          :class="darkMode ? 'i-ri-moon-fill' : 'i-ri-sun-fill'"
          @click="darkMode = !darkMode"
        ></i>
      </template>
      暗黑模式
    </n-tooltip>
    <i i-ri-user-heart-line class="btn" @click="router.push('/about')"></i>
    <a
      href="https://github.com/antrioe/template-vue3"
      i-ri-github-fill
      class="btn"
      target="_blank"
      rel="noopener noreferrer"
    ></a>
  </div>
</template>
<style scoped lang="less">
.btn {
  @apply text-xl transition-colors cursor-pointer hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400;
}
</style>
