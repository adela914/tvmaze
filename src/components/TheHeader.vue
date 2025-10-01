<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import { useShowSearchStore } from '@/stores/searchShowsStore'

const searchStore = useShowSearchStore()
const onInputUpdate = (input: string) => {
  searchStore.searchInput = input
  searchStore.findShows()
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
  color: #fff;
  padding: 1rem 0;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center; /* centers the input */
  position: relative;
  margin: 0 50px;
}

.container h1 {
  position: absolute;
  left: 0; /* stick to the left */
  margin: 0;
}

.container input {
  width: 40%; /* adjust as needed */
  max-width: 400px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
</style>
