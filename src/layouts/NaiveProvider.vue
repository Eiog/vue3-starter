<script setup lang="ts">
import { defineComponent, h } from 'vue';
import type { NDateLocale, GlobalTheme, GlobalThemeOverrides } from 'naive-ui';
import {
  useLoadingBar,
  useDialog,
  useMessage,
  useNotification,
  NLoadingBarProvider,
  NDialogProvider,
  NNotificationProvider,
  NMessageProvider,
  darkTheme,
  zhCN,
} from 'naive-ui';
type Props = {
  dark: boolean;
  themeOverrides?: GlobalThemeOverrides;
  locale?: typeof zhCN;
  dateLocale?: NDateLocale;
};
const props = defineProps<Props>();
const theme = ref<GlobalTheme | undefined>(undefined);
onMounted(() => {
  watch(
    () => props.dark,
    (dark) => {
      if (dark) {
        theme.value = darkTheme;
        document.body.classList.add('dark');
        return;
      }
      theme.value = undefined;
      document.body.classList.remove('dark');
    },
    { immediate: true },
  );
});
// 挂载naive组件的方法至window, 以便在路由钩子函数和请求函数里面调用
function registerNaiveTools() {
  window.$loadingBar = useLoadingBar();
  window.$dialog = useDialog();
  window.$message = useMessage();
  window.$notification = useNotification();
}
const NaiveProviderContent = defineComponent({
  setup() {
    onMounted(() => {
      registerNaiveTools();
    });
  },
  render() {
    return h('div');
  },
});
</script>
<template>
  <n-config-provider
    abstract
    :theme="theme"
    :theme-overrides="props.themeOverrides"
    :locale="props.locale"
    :date-locale="props.dateLocale"
  >
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <slot></slot>
            <naive-provider-content />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
    <n-global-style />
  </n-config-provider>
</template>
<style scoped></style>
