<script setup lang="ts">
const { darkMode } = storeToRefs(useAppStore());
</script>
<template>
  <naive-provider :dark="darkMode">
    <div wfull hfull flex-center bg="white dark:gray-900">
      <div max-w-xl hfull flex-center select-none flex="col">
        <slot />
        <default-menu />
      </div>
    </div>
  </naive-provider>
</template>
<style scoped lang="less"></style>
