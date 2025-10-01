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
        v-if="show.image?.medium || show.image?.original"
        :src="show.image?.medium || show.image?.original"
        :alt="show.name"
        :key="show.id"
        @click="onShowClicked(show.id)"
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
</style>
