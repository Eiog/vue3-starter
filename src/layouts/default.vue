<script setup lang="ts">
const currentPath = computed(() => useRoute().path)
</script>

<template>
  <header class="w-full h16 flex justify-center items-center">
    <nav class="w-screen-lg flex-y-center justify-end gap3 <lg:w-full lg:p-x-10">
      <BackToHome class="m-r-auto" />
      <div>currentPath: {{ currentPath }}</div>
      <ToggleDarkMode />
      <ToggleLanguage />
    </nav>
  </header>
  <main class="flex-1 w-screen-lg flex-col <lg:w-full lg:p-x-10">
    <RouterEntry />
    <div class="w-full flex justify-center items-center m-y-10 gap5">
      <a class="text-3xl flex justify-center items-center gap1" href="https://github.com/Eiog/vue3-starter" target="_blank" rel="noopener noreferrer">
        <i class="i-ri-github-fill" />
        <span>Source</span>
      </a>
      <a class="text-3xl flex justify-center items-center gap1" href="https://note.eiog.me/" target="_blank" rel="noopener noreferrer">
        <i class="i-ri-github-fill" />
        <span>MyNote</span>
      </a>
    </div>
  </main>
</template>

<style scoped lang="less"></style>
