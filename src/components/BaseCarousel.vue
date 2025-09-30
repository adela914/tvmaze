<template>
  <section class="carousel">
    <h2>{{ header }}</h2>
    <img v-for="slide in slides" :src="slide.image?.medium" :alt="slide.alt" :key="slide.id" />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

export interface Slide {
  id: number
  image?: {
    medium: string
    original: string
  }
  alt?: string
}

const props = defineProps<{
  slides: Slide[]
  perPage?: number
  header: string
}>()

onMounted(() => {
  console.log(props.slides)
})
</script>
