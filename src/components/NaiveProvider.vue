<script setup lang="ts">
import { defineComponent, h } from 'vue'

import {
  NDialogProvider,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  darkTheme,
  dateEnUS,
  dateZhCN,
  enUS,
  useDialog,
  useLoadingBar,
  useMessage,
  useNotification,
  zhCN,
} from 'naive-ui'

interface Props {
  locale?: string
  dark?: boolean
}
const props = defineProps<Props>()
const theme = computed(() => props.dark ? darkTheme : undefined)
const locale = computed(() => {
  switch (props.locale) {
    case 'en':
      return enUS
    case 'cn':
      return zhCN
    default:
      return undefined
  }
})
const dateLocale = computed(() => {
  switch (props.locale) {
    case 'en':
      return dateEnUS
    case 'cn':
      return dateZhCN
    default:
      return undefined
  }
})
// 挂载naive组件的方法至window, 以便在路由钩子函数和请求函数里面调用
function registerNaiveTools() {
  window.$loadingBar = useLoadingBar()
  window.$dialog = useDialog()
  window.$message = useMessage()
  window.$notification = useNotification()
}
const NaiveProviderContent = defineComponent({
  setup() {
    onMounted(() => {
      registerNaiveTools()
    })
  },
  render() {
    return h('div')
  },
})
</script>

<template>
  <n-config-provider
    abstract
    :theme="theme"
    :locale="locale"
    :date-locale="dateLocale"
  >
    <NLoadingBarProvider>
      <NDialogProvider>
        <NNotificationProvider>
          <NMessageProvider>
            <slot />
            <NaiveProviderContent />
          </NMessageProvider>
        </NNotificationProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
    <n-global-style />
  </n-config-provider>
</template>

<style scoped></style>
