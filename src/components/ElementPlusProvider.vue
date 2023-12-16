<script setup lang='ts'>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

const props = defineProps<{
  dark?: boolean
  locale?: 'cn' | 'en'
}>()
const locale = computed(() => {
  switch (props.locale) {
    case 'en':
      return en
    case 'cn':
      return zhCn
    default:
      return undefined
  }
})
</script>

<template>
  <el-config-provider :locale="locale">
    <slot />
  </el-config-provider>
</template>

<style scoped lang='less'>

</style>
