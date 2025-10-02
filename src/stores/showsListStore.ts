import getShows from '@/api/getShowsList'
import type { TVMazeShow } from '@/types/TVMazeShow'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export function indexShowsById(shows: TVMazeShow[]): Record<string, TVMazeShow> {
  return shows.reduce<Record<string, TVMazeShow>>((acc, show) => {
    acc[show.id.toString()] = show
    return acc
  }, {})
}

export const useShowsStore = defineStore('shows', () => {
  const shows = ref<TVMazeShow[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)

  const fetchShows = async () => {
    isLoading.value = true
    error.value = null

    try {
      const fetchedShows: TVMazeShow[] = await getShows(currentPage.value)
      shows.value = [...shows.value, ...fetchedShows]
      currentPage.value++
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch tasks'
      console.error('Error fetching tasks:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const showsObjectById = computed(() => indexShowsById(shows.value))

  return {
    shows,
    isLoading,
    error,
    fetchShows,
    showsObjectById,
  }
})
