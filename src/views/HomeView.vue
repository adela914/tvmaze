<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { TVMAZE_GENRES } from '@/constants'
import BaseCrousel, { type Slide } from '@/components/BaseCarousel.vue'
import { useShowsStore } from '@/stores/showsStore'

// types
type TVMazeGenre = (typeof TVMAZE_GENRES)[number]
type FormattedShow = Slide
type GroupedByGenre = Record<TVMazeGenre, FormattedShow[]>

const store = useShowsStore()

// const selectedGenre = ref<string>('')

function createGroupedByGenre(): GroupedByGenre {
  return Object.fromEntries(TVMAZE_GENRES.map((g) => [g, [] as FormattedShow[]])) as GroupedByGenre
}

const groupedByGenre = computed<GroupedByGenre>(() => {
  const groupedShows = createGroupedByGenre()

  store.shows.forEach((show) => {
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
  console.log(id)
}

onMounted(async () => {
  await store.fetchShows()
})

const loadMoreData = async () => {
  await store.fetchShows()
}
</script>

<template>
  <!-- <BaseDropdown
    name="genres"
    v-model="selectedGenre"
    id="genres"
    placeholder="All genres"
    label="Choose a genre"
    :options="TVMAZE_GENRES"
  /> -->
  <!-- Only render non-empty groups-->
  <template v-for="(value, key) in groupedByGenre">
    <BaseCrousel
      :key="key"
      v-if="value.length"
      :header="key"
      :slides="value"
      :isLoading="store.isLoading"
      @slideClicked="onShowClicked"
      @loadMore="loadMoreData"
    />
  </template>
</template>
