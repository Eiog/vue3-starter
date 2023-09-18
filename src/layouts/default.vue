<script setup lang="ts">
</script>

<template>
  <header class="w-full h-16 flex-center">
    <nav class="w-screen-lg flex-y-center justify-end gap-3 <lg:(w-full p-x-10)">
      <BackToHome class="m-r-auto" />
      <ToggleDarkMode />
      <ToggleLanguage />
    </nav>
  </header>
  <main class="flex-1 w-screen-lg flex-col <lg:(w-full p-x-10)">
    <RouterView />
    <div class="w-full flex-center m-y-10 gap-5">
      <a class="text-3xl flex-center gap-1" href="https://github.com/Eiog/vue3-starter" target="_blank" rel="noopener noreferrer">
        <i class="i-ri-github-fill" />
        <span>Source</span>
      </a>
      <a class="text-3xl flex-center gap-1" href="https://note.eiog.me/" target="_blank" rel="noopener noreferrer">
        <i class="i-ri-github-fill" />
        <span>MyNote</span>
      </a>
    </div>
  </main>
</template>

<style scoped lang="less"></style>
