<script setup lang="ts" name="Home">
import { watch } from 'vue';
import TwemojiHatchingChick from '~icons/twemoji/hatching-chick';
import { useAppStore } from '@/store';
import { useI18n } from 'vue-i18n';
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
  },
);
const urls = [
  {
    title: 'Vite2',
    url: 'https://vitejs.cn/',
  },
  {
    title: 'Vue3',
    url: 'https://vuejs.org/',
  },
  {
    title: 'Naive-UI',
    url: 'https://www.naiveui.com/',
  },
  {
    title: 'Vue Router4',
    url: 'https://router.vuejs.org/',
  },
  {
    title: 'Pinia',
    url: 'https://pinia.vuejs.org/',
  },
  {
    title: 'Unocss',
    url: 'https://uno.antfu.me/',
  },
  {
    title: 'Axios',
    url: 'https://axios-http.com/',
  },
  {
    title: 'Mockjs',
    url: 'http://mockjs.com/',
  },
  {
    title: 'Nprogress',
    url: 'https://github.com/rstacruz/nprogress',
  },
  {
    title: 'VueUse',
    url: 'https://vueuse.org/',
  },
];
const count = ref(0);
const show = ref(false);
onMounted(() => {
  setTimeout(() => {
    show.value = true;
  }, 2000);
});
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
  <div flex="~ col" flex-center>
    <div relative>
      <div
        absolute
        top0
        right0
        bg="purple-5"
        text="white xl"
        select-none
        shadow-md
        rounded-full
        px3
      >
        {{ count }}
      </div>
      <n-popover :show="show" placement="left">
        <template #trigger>
          <TwemojiHatchingChick
            text="9xl"
            cursor-pointer
            outline-transparent
            @click="
              () => {
                count++;
                show = false;
              }
            "
          ></TwemojiHatchingChick>
        </template>
        <span> 点我试试 </span>
      </n-popover>
    </div>
    <div text="center">
      <h1 text="dark:gray-4">
        {{ t('welcome') }}
      </h1>
      <h1 text="dark:gray-4">{{ t('hello') }}</h1>
    </div>
    <div flex-center flex="wrap" gap3>
      <a
        transition-colors
        v-for="(item, index) in urls"
        :key="index"
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class=""
        >{{ item.title }}</a
      >
    </div>
  </div>
</template>
<style scoped lang="less">
a {
  @apply text-purple-5 no-underline hover:text-purple-3;
}
</style>
