<script setup lang="ts">
useHead({
  title: import.meta.env.VITE_APP_NAME,
  meta: [
    { name: 'description', content: import.meta.env.VITE_APP_DESCRIPTION },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
</script>

<template>
  <default>
    <router-entry />
  </default>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html{
  overflow: hidden !important;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  align-items: center;
  background:linear-gradient(to bottom,#d6dbdc,#FFFFFF);
}
.dark #app{
  background-color: #000000;
}
</style>
