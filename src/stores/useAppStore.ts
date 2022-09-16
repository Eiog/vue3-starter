import { defineStore } from 'pinia';
export const useAppStore = defineStore(
  'appStore',
  () => {
    const darkMode = ref(false);
    const language = ref<'zh_cn' | 'en_us'>('zh_cn');

    return {
      language,
      darkMode,
    };
  },
  {
    persist: {
      key: '__app__',
      paths: [''],
    },
  },
);
