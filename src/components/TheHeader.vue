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
  padding: 1rem 0;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 50px;
}

.container h1 {
  position: absolute;
  left: 0;
  margin: 0;
}

.container input {
  width: 40%;
  max-width: 400px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: var(--border-radius-xs);
  border: 1px solid #ccc;
}
</style>
