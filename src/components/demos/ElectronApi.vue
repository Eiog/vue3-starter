<!-- eslint-disable no-console -->
<script setup lang='ts'>
const isElectron = window.$electron
async function openDialog() {
  const result = await window.$nodeApi.shopOpenDialog()
  console.log(result)
}
async function saveDialog() {
  const result = await window.$nodeApi.shopSaveDialog()
  console.log(result)
}
async function messageDialog() {
  const result = await window.$nodeApi.shopMessageDialog({ title: '通知', message: '消息' })
  console.log(result)
}
function showNotification() {
  window.$nodeApi.showNotification({ title: '通知', body: '消息' })
}
async function openNewWindow() {
  const result = await window.$nodeApi.openNewWindow({ path: 'examples/vuetify' })
  console.log(result)
}
function openDevTools() {
  window.$nodeApi.openDevTools()
}
</script>

<template>
  <div v-if="isElectron" class="flex-col">
    <div class="flex gap-10">
      <button class="btn btn-primary" @click="openDialog">
        <span>open dialog</span>
      </button>
      <button class="btn btn-primary" @click="saveDialog">
        <span>save dialog</span>
      </button>
      <button class="btn btn-primary" @click="messageDialog">
        <span>message dialog</span>
      </button>
      <button class="btn btn-primary" @click="showNotification">
        <span>show notification</span>
      </button>
      <button class="btn btn-primary" @click="openNewWindow">
        <span>open new window</span>
      </button>
      <button class="btn btn-primary" @click="openDevTools">
        <span>open dev tools</span>
      </button>
    </div>
    <div>
      <a target="_blank" href="https://www.baidu.com">http://www.baidu.com</a>
    </div>
  </div>
  <div v-else>
    <p>Not in electron</p>
  </div>
</template>

<style scoped lang='less'>

</style>
