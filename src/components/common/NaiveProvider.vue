<script setup lang="ts">
import { defineComponent, h } from 'vue';
import {
  NLoadingBarProvider,
  NDialogProvider,
  NNotificationProvider,
  NMessageProvider,
  darkTheme,
  GlobalTheme,
} from 'naive-ui';
import {
  useLoadingBar,
  useDialog,
  useMessage,
  useNotification,
} from 'naive-ui';
type Props = {
  dark: boolean;
};
const props = defineProps<Props>();
const theme = ref<GlobalTheme | undefined>(undefined);
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
// 挂载naive组件的方法至window, 以便在路由钩子函数和请求函数里面调用
function registerNaiveTools() {
  window.$loadingBar = useLoadingBar();
  window.$dialog = useDialog();
  window.$message = useMessage();
  window.$notification = useNotification();
}
const NaiveProviderContent = defineComponent({
  setup() {
    registerNaiveTools();
  },
  render() {
    return h('div');
  },
});
</script>
<template>
  <n-config-provider abstract :theme="theme">
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
