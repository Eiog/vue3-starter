<script setup lang='ts'>
const map: { name: string; desc: string; icon: string; link: string }[] = [
  {
    name: 'Vite',
    desc: 'Next Generation Frontend Tooling',
    icon: 'https://vitejs.dev/logo.svg',
    link: 'https://vitejs.dev/',
  },
  {
    name: 'Vue',
    desc: 'The Progressive JavaScript Framework',
    icon: 'https://vuejs.org/images/logo.png',
    link: 'https://vuejs.org/',
  },
  {
    name: 'TypeScript',
    desc: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
    icon: 'https://typescript.bootcss.com/images/typescript-icon.svg',
    link: 'https://www.typescriptlang.org/',
  },
  {
    name: 'Eslint',
    desc: 'Find and fix problems in your JavaScript code.',
    icon: 'https://cdn.jsdelivr.net/gh/eiog/static@main/icons/eslint.svg',
    link: 'https://eslint.org/',
  },
  {
    name: 'Pinia',
    desc: 'Intuitive, type safe, light and flexible Store for Vue',
    icon: 'https://pinia.vuejs.org/logo.svg',
    link: 'https://pinia.vuejs.org/',
  },
  {
    name: 'Naive UI',
    desc: 'A Vue 3 Component Library',
    icon: 'https://www.naiveui.com/assets/naivelogo-93278402.svg',
    link: 'https://naiveui.com/',
  },
  {
    name: 'Vue Router',
    desc: 'The official router for Vue.js',
    icon: 'https://router.vuejs.org/logo.svg',
    link: 'https://router.vuejs.org/',
  },
  {
    name: 'Unocss',
    desc: 'Zero-runtime CSS framework for rapid UI development',
    icon: 'https://unocss.dev/logo.svg',
    link: 'https://unocss.antfu.me/',
  },
]
</script>

<template>
  <div class="w-full flex-col gap-10">
    <h1 class="text-6xl flex-center">
      Dependents
    </h1>
    <div class="w-full gap-3 grid grid-cols-3 <lg:(grid-cols-2) <sm:(grid-cols-1)">
      <a v-for="(item, index) in map" :key="index" :href="item.link" target="_blank" rel="noopener noreferrer" class="h-30 flex-y-center gap-3 shadow-lg bg-white/80 rounded-lg p-x-3 p-y-1 cursor-pointer transition hover:(border-red)">
        <div class="w-16 h-16 rounded-md flex-center flex-shrink-0">
          <img class="w-14 h-14" :src="item.icon" :alt="item.desc">
        </div>
        <div class="flex-col">
          <h3 class="text-lg font-bold">
            {{ item.name }}
          </h3>
          <p class="text-sm">
            {{ item.desc }}
          </p>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
