<script setup lang="ts">
import DefaultLayout from '~/layouts/DefaultLayout.vue';
import RouterEntry from '~/components/common/RouterEntry.vue';
</script>
<template>
  <DefaultLayout>
    <RouterEntry />
  </DefaultLayout>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
