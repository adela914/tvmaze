<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import BaseDropdown from '@/components/BaseDropdown.vue'
import { TVMAZE_GENRES } from '@/constants'
import BaseCrousel, { type Slide } from '@/components/BaseCarousel.vue'
import type { TVMazeShow } from '@/types/TVMazeShow'
import TheHeader from '@/components/TheHeader.vue'
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

//TODO: might be nice to have have a filter later

// const filteredShowsByGenre = computed<TVMazeShow[]>(() => {
//   if (selectedGenre.value) {
//     return fetchedShows.value.filter((show) => show.genres.includes(selectedGenre.value))
//   }
//   return fetchedShows.value
// })

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
</script>

<template>
  <TheHeader />
  <main>
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
      />
    </template>
  </main>
</template>

<style scoped></style>
