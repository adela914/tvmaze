<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { TVMAZE_GENRES } from '@/constants'
import BaseCarousel, { type Slide } from '@/components/BaseCarousel.vue'
import { useShowsStore } from '@/stores/showsListStore'
import router from '@/router'
import TheHeader from '@/components/TheHeader.vue'
import { useShowSearchStore } from '@/stores/searchShowsStore'
import SearchResultBlock from '@/components/SearchResultBlock.vue'
import type { TVMazeGenre } from '@/types/TVMazeShow'

type GroupedByGenre = Record<TVMazeGenre, Slide[]>

const showsStore = useShowsStore()
const searchShowsStore = useShowSearchStore()

const createGroupedByGenre = () => {
  return Object.fromEntries(TVMAZE_GENRES.map((g) => [g, [] as Slide[]])) as GroupedByGenre
}

const groupedByGenre = computed<GroupedByGenre>(() => {
  const grouped = createGroupedByGenre()

  // Make a non-mutating, globally sorted copy by rating (desc)
  // Treat null/undefined ratings as -Infinity so the comparator is numeric and stable
  const sorted = [...showsStore.shows].sort((a, b) => {
    const ra = typeof a?.rating?.average === 'number' ? a.rating.average : -Infinity
    const rb = typeof b?.rating?.average === 'number' ? b.rating.average : -Infinity
    if (rb !== ra) return rb - ra
    // Tiebreakers for stable order across pages
    if (a.id !== b.id) return a.id - b.id
    return (a.name || '').localeCompare(b.name || '')
  })

  // Build per-genre groups using the already-sorted order
  for (const show of sorted) {
    for (const genre of show.genres) {
      if (TVMAZE_GENRES.includes(genre)) {
        grouped[genre].push({
          id: show.id,
          alt: show.name,
          img: show.image,
        })
      }
    }
  }

  return grouped
})

const onShowClicked = (id: number) => {
  router.push({ name: 'show', params: { id } })
}

onMounted(async () => {
  if (showsStore.shows.length === 0) {
    await showsStore.fetchShows()
  }
})

const loadMoreData = async () => {
  await showsStore.fetchShows()
}
</script>

<template>
  <TheHeader />
  <!-- Only render non-empty groups-->
  <main>
    <SearchResultBlock v-if="searchShowsStore.searchInput" />
    <div v-else class="carousels">
      <template v-for="(value, key) in groupedByGenre" :key="key">
        <BaseCarousel
          v-if="value.length"
          :header="key"
          :slides="value"
          :isLoading="showsStore.isLoading"
          @onImageClick="onShowClicked"
          @loadMore="loadMoreData"
        />
      </template>
    </div>
  </main>
</template>

<style scoped>
main {
  margin: var(--space-lg);
}

.carousels {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
</style>
