<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import { ref } from 'vue'

const searchValue = ref('')
</script>

<template>
  <header class="header">
    <div class="container">
      <h1>TVMaze</h1>
      <BaseInput v-model="searchValue" placeholder="Search..." />
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
