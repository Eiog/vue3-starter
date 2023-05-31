<script setup lang='ts'>
import { routes } from 'vue-router/auto/routes'

const map = routes.filter(f => f.path === '/examples').map(m => m.children).flat().map(m => ({ ...m, path: `/examples/${m?.path}` })) as { name: string; path: string }[]

const { t } = useI18n()
</script>

<template>
  <div class="w-full flex-col gap-10">
    <h1 class="text-6xl flex-center">
      {{ t('Examples') }}
    </h1>
    <div class="w-full gap-3 grid grid-cols-3 <lg:(grid-cols-2) <sm:(grid-cols-1)">
      <RouterLink v-for="(item, index) in map" :key="index" :to="item.path" class="h-26 flex-col justify-center gap-1 shadow-lg bg-white/80 dark:(bg-white/10) rounded-lg p-x-3 p-y-2 cursor-pointer transition hover:(border-red)">
        <h3 class="text-3xl">
          {{ item.name }}
        </h3>
        <code> {{ item.path }}</code>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
