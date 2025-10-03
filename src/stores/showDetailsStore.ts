import getShowById from '@/api/getShowById'
import type { TVMazeShow } from '@/types/TVMazeShow'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useShowsStore } from './showsListStore'

export const useShowDetailsStore = defineStore('showDetailsStore', () => {
  const showDetails = ref<TVMazeShow>()
  const isLoading = ref(false)
  const error = ref<string>('')
  const loadedShows = useShowsStore()

  const fetchShowById = async (id: string) => {
    isLoading.value = true
    error.value = ''

    const storedData = loadedShows.showsObjectById[id]

    if (storedData) {
      // set stored data from shows list if it exisits
      showDetails.value = storedData
    } else {
      // otherwise fetch it by id
      try {
        const result = await getShowById(id)
        showDetails.value = result
      } catch (e) {
        const err = e as Error
        error.value = err.message
      }
    }
    isLoading.value = false
  }

  return { showDetails, isLoading, error, fetchShowById }
})
