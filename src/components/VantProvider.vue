<script setup lang='ts'>
import { Locale } from 'vant'
import enUS from 'vant/es/locale/lang/en-US'
import zhCN from 'vant/es/locale/lang/zh-CN'

const props = defineProps<{
  dark?: boolean
  locale?: 'cn' | 'en'
}>()
watch(() => props.locale, (val) => {
  if (val === 'cn')
    Locale.use('zh-CN', zhCN)
  if (val === 'en')
    Locale.use('en-US', enUS)
})
</script>

<template>
  <van-config-provider :theme="props.dark ? 'dark' : 'light'">
    <slot />
  </van-config-provider>
</template>

<style scoped lang='less'>

</style>
