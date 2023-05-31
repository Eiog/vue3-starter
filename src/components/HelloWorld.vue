<script setup lang='ts'>
const { t } = useI18n()
</script>

<template>
  <div class="flex-col-center gap-10 p-y-20">
    <h1 class="text-8xl">
      {{ t('Hello') }}
    </h1>
    <p class="text-4xl">
      {{ t('Welcome') }}
    </p>
  </div>
</template>

<style scoped lang='less'>

</style>
