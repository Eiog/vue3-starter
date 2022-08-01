<script setup lang="ts" name="Home">
import { watch } from "vue";
import TwemojiBeamingFaceWithSmilingEyes from "~icons/twemoji/beaming-face-with-smiling-eyes";
import TwemojiBabyChick from "~icons/twemoji/baby-chick";
import TwemojiHatchingChick from '~icons/twemoji/hatching-chick'
import TwemojiFrontFacingBabyChick from '~icons/twemoji/front-facing-baby-chick'
import { useAppStore } from "@/store";
import { useI18n } from "vue-i18n";
const appStore = useAppStore();
const { locale, t } = useI18n({
  inheritLocale: true,
});
watch(
  () => appStore.language,
  (newValue) => {
    locale.value = newValue;
  },
  {
    immediate: true,
  }
);
const urls = [
  {
    title: "Vite2",
    url: "https://vitejs.cn/",
  },
  {
    title: "Vue3",
    url: "https://vuejs.org/",
  },
  {
    title: "Naive-UI",
    url: "https://www.naiveui.com/",
  },
  {
    title: "Vue Router4",
    url: "https://router.vuejs.org/",
  },
  {
    title: "Pinia",
    url: "https://pinia.vuejs.org/",
  },
  {
    title: "Unocss",
    url: "https://uno.antfu.me/",
  },
  {
    title: "Axios",
    url: "https://axios-http.com/",
  },
  {
    title: "Mockjs",
    url: "http://mockjs.com/",
  },
  {
    title: "Nprogress",
    url: "https://github.com/rstacruz/nprogress",
  },
  {
    title: "VueUse",
    url: "https://vueuse.org/",
  },
];
const count = ref(0)
const show = ref(false)
onMounted(()=>{
  setTimeout(() => {
    show.value = true
  }, 2000);
})
</script>
<i18n>
{
  "en": {
    "welcome":"welcome to unlit template",
    "hello":"hello! World!"
  },
  "cn": {
    "welcome":"欢迎使用unlit模板",
    "hello":"你好！ 世界！"
  }
}
</i18n>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="relative">
      <div class="absolute top-0 right-0 bg-purple-500 text-white select-none shadow-md rounded-full px-3 text-xl">
        {{count}}
      </div>
      <n-popover :show="show" placement="left" >
        <template #trigger>
          <TwemojiHatchingChick class="text-9xl cursor-pointer outline-transparent " @click="()=>{count++;show=false}"></TwemojiHatchingChick>
        </template>
        <span class="">
          点我试试
        </span>
      </n-popover>
    </div>
    <div class="text-center">
      <h1 class="font-normal dark:text-gray-400">
        {{ t("welcome") }}
      </h1>
      <h1 class="font-normal dark:text-gray-400">{{ t("hello") }}</h1>
    </div>
    <div class="flex items-center justify-center flex-wrap gap-3">
        <a
          class="text-purple-500 texd no-underline transition-colors hover:text-purple-300"
          v-for="(item, index) in urls"
          :key="index"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          >{{ item.title }}</a
        >
      </div>
  </div>
</template>
<style scoped lang="less"></style>
