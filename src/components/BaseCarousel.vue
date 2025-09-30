<template>
  <section>
    <h2>
      {{ header }} <span>{{ currentPage }}</span>
    </h2>

    <div class="container">
      <button class="carousel-arrow--prev" @click="prev"><</button>
      <section class="carousel">
        <!-- Show the left arrow when there is a previous page -->

        <img
          v-for="slide in visibleSlides"
          :src="slide.img?.medium"
          :alt="slide.alt"
          :key="slide.id"
          loading="lazy"
        />
        <!--TODO: Show the right arrow when there is more data to load-->
      </section>
      <button class="carousel-arrow--next" @click="next">></button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

export interface Slide {
  id: number
  img?: {
    medium: string
    original: string
  }
  alt?: string
}

const perPage = computed(() => props.perPage ?? 7)

const props = defineProps<{
  slides: Slide[]
  perPage?: number
  header: string
}>()

const currentPage = ref(0)

defineEmits(['loadMoreShows'])

// Split slides into pages of size perPage
//TODO: unit test
const pages = computed(() => {
  const chunks: Slide[][] = []
  const list = props.slides ?? []

  for (let i = 0; i < list.length; i += perPage.value) {
    chunks.push(list.slice(i, i + perPage.value))
  }
  return chunks
})

const visibleSlides = computed(() => {
  return pages.value[currentPage.value] ?? []
})

const prev = () => {
  if (currentPage.value > 0) currentPage.value--
}

const next = () => {
  if (pages.value.length - 1 > currentPage.value) currentPage.value++
  if (pages.value[currentPage.value].length < perPage.value) {
    console.log('loading needs..')
  }
}

// watch(currentPage, () => {
//   const isLastPage = pages.value.length - currentPage.value === 1
//   console.log(isLastPage)
//   // if(isLastPage)
//   //load more one page before the lage one
// })

onMounted(() => {
  console.log(pages.value)
})
</script>

<style scoped>
.container {
  display: flex;
}

.carousel-arrow--prev {
  flex-grow: 1;
  max-width: 20px;
}

.carousel-arrow--next {
  flex-grow: 1;
  max-width: 20px;
}
.carousel {
  /* --padding: max(var(--side), calc(var(--side) + (100vw - var(--column)) / 2)); */
  display: flex;
  height: clamp(10rem, 25vw, 20rem);
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scroll-padding-left: var(--padding);
  padding: 0 var(--padding);
  gap: 1rem;
  flex-grow: 8;
}
/*
.carousel::-webkit-scrollbar {
  display: none;
} */
</style>
