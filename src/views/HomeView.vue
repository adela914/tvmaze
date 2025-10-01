<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import BaseDropdown from '@/components/BaseDropdown.vue'
import { TVMAZE_GENRES } from '@/constants'
import BaseCrousel, { type Slide } from '@/components/BaseCarousel.vue'
import type { TVMazeShow } from '@/types/TVMazeShow'

// types
type TVMazeGenre = (typeof TVMAZE_GENRES)[number]
type FormattedShow = Slide
type GroupedByGenre = Record<TVMazeGenre, FormattedShow[]>

// reactive values
const fetchedShows = ref<TVMazeShow[]>([])
const selectedGenre = ref<string>('')

//TODO: Move it to store
//Make it as an object to read
async function getShows(page = 1): Promise<TVMazeShow[]> {
  const res = await fetch(`https://api.tvmaze.com/shows?page=${page}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return (await res.json()) as TVMazeShow[]
}

function createGroupedByGenre(): GroupedByGenre {
  return Object.fromEntries(TVMAZE_GENRES.map((g) => [g, [] as FormattedShow[]])) as GroupedByGenre
}

const groupedByGenre = computed<GroupedByGenre>(() => {
  const groupedShows = createGroupedByGenre()

  fetchedShows.value.forEach((show) => {
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
  fetchedShows.value = await getShows()
})

const loadMoreData = () => {
  console.log('shoulw load more!')
}
</script>

<template>
  <BaseDropdown
    name="genres"
    v-model="selectedGenre"
    id="genres"
    placeholder="All genres"
    label="Choose a genre"
    :options="TVMAZE_GENRES"
  />
  <!-- Only render non-empty groups-->
  <template v-for="(value, key) in groupedByGenre">
    <BaseCrousel
      :key="key"
      v-if="value.length"
      :header="key"
      :slides="value"
      @slideClicked="onShowClicked"
      @loadMore="loadMoreData"
    />
  </template>
</template>
