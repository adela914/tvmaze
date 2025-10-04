import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { getShowsRequestCount, resetShowsRequestCount } from '@/tests/mswServer'
import { useShowsStore } from '@/stores/showsListStore'

describe('showsListStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    resetShowsRequestCount()
  })

  it('fetchShows loads page 0 then page 1 and appends results', async () => {
    const store = useShowsStore()
    expect(store.shows.length).toBe(0)

    await store.fetchShows() // page 0
    expect(store.shows.length).toBeGreaterThan(0)
    expect(getShowsRequestCount).toBe(1)

    const len = store.shows.length
    await store.fetchShows() // page 1
    expect(store.shows.length).toBeGreaterThan(len)
    expect(getShowsRequestCount).toBe(2)
  })
})
