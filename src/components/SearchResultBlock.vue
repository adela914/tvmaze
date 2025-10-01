<script lang="ts" setup>
import router from '@/router'
import { useShowSearchStore } from '@/stores/searchShowsStore'

const searchShowsStore = useShowSearchStore()

const onShowClicked = (id: number) => {
  router.push({ name: 'show', params: { id } })
}
</script>

<template>
  <p v-if="!searchShowsStore.searchResults.length">
    There is no such a movie. What about tho exploring these trending movies?
  </p>
  <div v-else>
    <h2>Search results:</h2>
    <template v-for="show in searchShowsStore.searchResults">
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
