<script setup lang="ts">
import { useAppStore } from "./store";
import { subscribeStore } from "./store";
import RiHomeHeartLine from "~icons/ri/home-heart-line";
import MaterialSymbolsSunny from "~icons/material-symbols/sunny";
import CilLanguage from "~icons/cil/language";
import PhMoonStars from "~icons/ph/moon-stars";
import SimpleIconsAboutdotme from "~icons/simple-icons/aboutdotme";
import MdiGithub from "~icons/mdi/github";
import { NTooltip } from "naive-ui";
import { useRouter } from "vue-router";
import { NaiveProvider } from "@/components";
const router = useRouter();
subscribeStore();
const appStore = useAppStore();

function changeLanguage() {
  appStore.language = appStore.language === "cn" ? "en" : "cn";
}
</script>
<template>
  <div
    class="w-full h-full bg-white flex items-center justify-center dark:bg-gray-900"
  >
    <div class="max-w-xl h-full flex flex-col items-center justify-center">
      <router-view v-slot="{ Component }">
        <naive-provider>
          <transition name="fade-transform" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </naive-provider>
      </router-view>
      <div class="flex items-center justify-center gap-5 mt-4">
        <n-tooltip trigger="hover">
          <template #trigger>
            <RiHomeHeartLine
              class="btn"
              @click="router.push('/home')"
            ></RiHomeHeartLine>
          </template>
          首页
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <CilLanguage class="btn" @click="changeLanguage"></CilLanguage>
          </template>
          中文
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <MaterialSymbolsSunny
              class="btn"
              @click="appStore.darkMode = !appStore.darkMode"
              v-if="!appStore.darkMode"
            ></MaterialSymbolsSunny>
            <PhMoonStars
              class="btn"
              @click="appStore.darkMode = !appStore.darkMode"
              v-if="appStore.darkMode"
            ></PhMoonStars>
          </template>
          暗黑模式
        </n-tooltip>
        <MdiGithub class="btn"></MdiGithub>
        <SimpleIconsAboutdotme
          class="btn"
          @click="router.push('/about')"
        ></SimpleIconsAboutdotme>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.btn {
  @apply text-xl transition-colors cursor-pointer hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400;
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s ease-in-out;
}

.fade-transform-enter-from {
  transform: scale(.95);
  opacity: 0;
}

.fade-transform-leave-to {
  transform: scale(1.05);
  opacity: 0;
}
</style>
