<script setup lang='ts'>
const map: { name: string; path: string }[] = [
  {
    name: 'NaiveUi Demo',
    path: '/naive-ui',
  },
]
</script>

<template>
  <div class="w-full flex-col gap-10">
    <h1 class="text-6xl flex-center">
      Examples
    </h1>
    <div class="w-full gap-3 grid grid-cols-3 <lg:(grid-cols-2) <sm:(grid-cols-1)">
      <RouterLink v-for="(item, index) in map" :key="index" :to="item.path" class="h-26 flex-col justify-center gap-1 shadow-lg bg-white/80 rounded-lg p-x-3 p-y-2 cursor-pointer transition hover:(border-red)">
        <h3 class="text-3xl">
          {{ item.name }}
        </h3>
        <p> {{ item.path }}</p>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
