<script setup lang='ts'>
import { Locale } from '@nutui/nutui'
import enUS from '@nutui/nutui/dist/packages/locale/lang/en-US'
import zhCN from '@nutui/nutui/dist/packages/locale/lang/zh-CN'

const props = defineProps<{
  dark?: boolean
  locale?: 'cn' | 'en'
}>()
watch(() => props.locale, (val) => {
  if (val === 'cn')
    Locale.use('zhCN', zhCN)
  if (val === 'en')
    Locale.use('enUs', enUS)
})
</script>

<template>
  <nut-config-provider :theme="props.dark ? 'dark' : ''">
    <slot />
  </nut-config-provider>
</template>

<style scoped lang='less'>

</style>
