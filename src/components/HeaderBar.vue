<script setup lang="ts">
import { ipcRenderer } from 'electron'

function handleMini() {
  ipcRenderer.send('window-screen-min')
}
function handleToggleFull() {
  ipcRenderer.send('window-screen-toggle')
}
function handleQuit() {
  ipcRenderer.send('app-quit')
}
</script>

<template>
  <header wfull h6 fixed flex left-0 top-0 right-0>
    <div mlauto h6 flex items-center>
      <div class="btn" @click="handleMini">
        <i i-ri-subtract-fill />
      </div>
      <div class="btn" @click="handleToggleFull">
        <i i-ri-fullscreen-fill />
      </div>
      <div
        class="btn"
        hover="!bg-rose5 text-white dark:!bg-rose9"
        @click="handleQuit"
      >
        <i i-ri-close-fill />
      </div>
    </div>
  </header>
</template>

<style scoped lang="less">
header {
  -webkit-app-region: drag;
  > * {
    -webkit-app-region: no-drag;
  }
}
.btn {
  @apply w10 h6 flex-center bg-transparent transition-color hover:(bg-gray3) dark:(bg-transparent hover:bg-dark3);
}
</style>
