import { defineStore } from 'pinia'
import { darkTheme } from 'naive-ui';
export const useAppStore = defineStore(
    'appStore',
    () => {
        const darkMode = ref(false)
        const language = ref<'cn' | 'en'>('cn')

        return {
            language,
            darkMode,
        }
    },
    {
        persist: {
            key: '__app__',
            paths: ['']
        }
    }
)
