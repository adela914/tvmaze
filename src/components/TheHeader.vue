<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import { useShowSearchStore } from '@/stores/searchShowsStore'
import { debounce } from '@/utils'

const searchStore = useShowSearchStore()

const debouncedFind = debounce(() => searchStore.findShows(), 400)
const onInputUpdate = (input: string) => {
  searchStore.searchInput = input
  debouncedFind()
}
</script>

<template>
  <header class="header">
    <div class="container">
      <h1>TVMaze</h1>
      <BaseInput @update:model-value="onInputUpdate" placeholder="Search..." />
    </div>
  </header>
</template>

<style scoped>
.header {
  background: #222;
  color: var(--color-text);
  padding: var(--space-sm);
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 var(--space-lg);
}

.container h1 {
  position: absolute;
  left: 0;
  margin: 0;
}
</style>
