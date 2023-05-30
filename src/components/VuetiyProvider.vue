<script setup lang='ts'>

</script>

<template>
  <v-defaults-provider>
    <v-locale-provider>
      <v-theme-provider>
        <slot />
      </v-theme-provider>
    </v-locale-provider>
  </v-defaults-provider>
</template>

<style scoped lang='less'>

</style>
