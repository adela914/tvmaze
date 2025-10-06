<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import { useShowSearchStore } from '@/stores/searchShowsStore'
import { debounce } from '@/utils/debouncer'

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
      <BaseInput
        class="input-wrapper"
        input-id="searchInput"
        :model-value="searchStore.searchInput"
        @update:model-value="onInputUpdate"
        placeholder="Search..."
      />
      <div class="spacer"></div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: var(--color-black);
  color: var(--color-text);
  padding: var(--space-sm);
}

.container {
  position: relative;
  margin: 0 var(--space-lg);
  display: flex;
  align-items: center;
}

h1,
.spacer,
.input-wrapper {
  flex: 1;
}
</style>
