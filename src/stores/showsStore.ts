import type { TVMazeShow } from '@/types/TVMazeShow'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShowsStore = defineStore('shows', () => {
  const shows = ref<TVMazeShow[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)

  const fetchShows = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`https://api.tvmaze.com/shows?page=${currentPage.value}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const fetchedShows: TVMazeShow[] = await response.json()
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

  return {
    shows,
    isLoading,
    error,
    fetchShows,
  }
})
