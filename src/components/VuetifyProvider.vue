<script setup lang='ts'>
const { dark, locale } = defineProps<{
  dark?: boolean
  locale?: 'cn' | 'en'
}>()
</script>

<template>
  <v-defaults-provider>
    <v-locale-provider :locale="locale">
      <v-theme-provider :theme="dark ? 'dark' : ''">
        <slot />
      </v-theme-provider>
    </v-locale-provider>
  </v-defaults-provider>
</template>

<style scoped lang='less'>

</style>
