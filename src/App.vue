<script setup lang="ts">
import { useAppStore } from './store';
const router = useRouter();
const { darkMode, language } = storeToRefs(useAppStore());

function changeLanguage() {
  language.value = language.value === 'cn' ? 'en' : 'cn';
}
</script>
<template>
  <naive-provider :dark="darkMode">
    <div wfull hfull flex-center bg="white dark:gray-900">
      <div max-w-xl hfull flex-center select-none flex="col">
        <RouterEntry />
        <div flex-center gap5 mt4>
          <n-tooltip trigger="hover">
            <template #trigger>
              <i i-ri-home-2-line class="btn" @click="router.push('/home')"></i>
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
          <i
            i-ri-user-heart-line
            class="btn"
            @click="router.push('/about')"
          ></i>
          <a
            href="http://"
            i-ri-github-fill
            class="btn"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </div>
      </div>
    </div>
  </naive-provider>
</template>

<style lang="less">
.btn {
  @apply text-xl transition-colors cursor-pointer hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400;
}
</style>
