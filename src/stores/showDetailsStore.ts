import getShowById from '@/api/getShowById'
import type { TVMazeShow } from '@/types/TVMazeShow'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useShowsStore } from './showsListStore'
import { useToastStore } from './toasterStore'

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
      // set stored data from shows list if it exists
      showDetails.value = storedData
    } else {
      // otherwise fetch it by id
      try {
        const result = await getShowById(id)
        showDetails.value = result
      } catch (e) {
        const toastStore = useToastStore()

        const err = e as Error
        error.value = err.message
        toastStore.show(error.value)
      }
    }
    isLoading.value = false
  }

  return { showDetails, isLoading, error, fetchShowById }
})
