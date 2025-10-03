<script lang="ts" setup>
import router from '@/router'
import { useShowSearchStore } from '@/stores/searchShowsStore'

const searchShowsStore = useShowSearchStore()

const onShowClicked = (id: number) => {
  router.push({ name: 'show', params: { id } })
}
</script>

<template>
  <div class="container">
    <template v-for="show in searchShowsStore.searchResults" :key="show.id">
      <img
        class="image"
        v-if="show.image?.medium || show.image?.original"
        :src="show.image?.medium || show.image?.original"
        :alt="show.name"
        :key="show.id"
        @click="onShowClicked(show.id)"
        loading="lazy"
      />
    </template>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 1em;
}

.image {
  border-radius: 10px;
  object-fit: cover;
  width: 100%;
  height: auto;
  max-width: 250px;
}
</style>
