<script setup lang="ts">
import { useGet, UseAxiosReturns } from '~/hooks';
const {
  loading,
  error,
  data,
  uploadProgress,
  downloadProgress,
  resend,
  abort,
  onError,
  onSuccess,
}: UseAxiosReturns<{ code: number; data: any; msg: string }> =
  useGet('api/useaxios');
onSuccess((res) => {
  console.log(res);
});
onError((err) => {
  console.log(err);
});
const handleReSend = () => {
  resend();
};
</script>
<template>
  <div flex="~ col" gap3>
    <p>loading{{ loading }}</p>
    <p>error{{ error }}</p>
    <p>{{ uploadProgress }}</p>
    <p>{{ downloadProgress }}</p>
    {{ data }}

    <n-button @click="abort">abort</n-button>
    <n-button @click="handleReSend">resend</n-button>
  </div>
</template>
<style scoped lang="less"></style>
