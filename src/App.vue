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
useTrack(1)
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
html,body{
  width: 100%;
  height: 100%;
  overflow: auto !important;
  background:linear-gradient(to bottom,#d6dbdc,#FFFFFF);
  color: #1a1a1a;
}

#app {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dark html,.dark body{
  background:linear-gradient(to bottom,#383838,#000000);
  color: #dadada;
}
</style>
