<script setup lang="ts"></script>
<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <transition mode="out-in">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </template>
  </router-view>
</template>
<style scoped lang="less">
.v-leave-active,
.v-enter-active {
  transition: all 0.3s ease-in-out;
}

.v-enter-from {
  transform: scale(0.95);
  opacity: 0;
}

.v-leave-to {
  transform: scale(1.05);
  opacity: 0;
}
</style>
