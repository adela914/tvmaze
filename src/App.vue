<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <TheHeader />
  <main>
    <RouterView />
  </main>
</template>
<style scoped>
main {
  margin: 60px 45px;
  /* use variables here */
}
</style>
