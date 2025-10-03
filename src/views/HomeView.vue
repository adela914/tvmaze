<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { TVMAZE_GENRES } from '@/constants'
import BaseCrousel, { type Slide } from '@/components/BaseCarousel.vue'
import { useShowsStore } from '@/stores/showsListStore'
import router from '@/router'
import TheHeader from '@/components/TheHeader.vue'
import { useShowSearchStore } from '@/stores/searchShowsStore'
import SearchResultBlock from '@/components/SearchResultBlock.vue'

// types
type TVMazeGenre = (typeof TVMAZE_GENRES)[number]
type FormattedShow = Slide
type GroupedByGenre = Record<TVMazeGenre, FormattedShow[]>

const showsStore = useShowsStore()
const searchShowsStore = useShowSearchStore()

function createGroupedByGenre(): GroupedByGenre {
  return Object.fromEntries(TVMAZE_GENRES.map((g) => [g, [] as FormattedShow[]])) as GroupedByGenre
}

const groupedByGenre = computed<GroupedByGenre>(() => {
  const groupedShows = createGroupedByGenre()

  showsStore.shows.forEach((show) => {
    show.genres.forEach((genre) => {
      if ((TVMAZE_GENRES as readonly string[]).includes(genre)) {
        groupedShows[genre as TVMazeGenre].push({
          id: show.id,
          alt: show.name,
          img: show.image,
        })
      }
    })
  })

  return groupedShows
})

const onShowClicked = (id: string) => {
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
      <template v-for="(value, key) in groupedByGenre">
        <BaseCrousel
          :key="key"
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
