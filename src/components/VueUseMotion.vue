<script setup lang='ts'>
import { MotionDirective as motion } from '@vueuse/motion'

defineOptions({
  directives: {
    motion: motion(),
  },
})
</script>

<template>
  <div class="flex gap-3 border">
    <div v-motion-fade class="box">
      v-motion-fade
    </div>
  </div>
</template>

<style scoped lang='less'>
.box{
  @apply w-10 h-10 bg-red-500;
}
</style>
