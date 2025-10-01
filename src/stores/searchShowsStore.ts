import getSearchShows from '@/api/getSearchShows'
import type { TVMazeShow } from '@/types/TVMazeShow'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShowSearchStore = defineStore('showSearch', () => {
  const searchResults = ref<TVMazeShow[]>([])
  const searchInput = ref('')
  const isLoading = ref(false)
  const error = ref<string>('')

  const findShows = async () => {
    isLoading.value = true
    error.value = ''

    try {
      const result = await getSearchShows(searchInput.value)
      searchResults.value = result
    } catch (e) {
      const err = e as Error
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  return { searchInput, searchResults, isLoading, error, findShows }
})
