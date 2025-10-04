import { render, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { resetShowsRequestCount, server, http, HttpResponse } from '@/tests/mswServer'
import HomeView from '@/views/HomeView.vue'
import type { TVMazeShow } from '@/types/TVMazeShow'

// router mock: define inline to avoid "Cannot access before init"
vi.mock('@/router', () => ({ default: { push: vi.fn() } }))
import router from '@/router'

// Light stubs: minimal visible DOM + emits for user-like queries
const BaseCrouselStub = {
  name: 'BaseCrousel',
  props: ['header', 'slides', 'isLoading'],
  emits: ['onImageClick', 'loadMore'],
  template: `
    <section>
      <h3 role="heading">{{ header }}</h3>
      <div data-testid="slides-count">{{ slides?.length ?? 0 }}</div>
      <button data-testid="img-click" @click="$emit('onImageClick', slides?.[0]?.id)">previous</button>
      <button data-testid="load-more" @click="$emit('loadMore')">next</button>
      <div v-if="isLoading" role="status">loading</div>
    </section>
  `,
}
const SearchResultBlockStub = { template: `<div data-testid="search-block">results</div>` }
const TheHeaderStub = { template: `<header>Header</header>` }

const renderPage = (
  state?: Partial<{ shows: TVMazeShow[]; isLoading: boolean; searchInput: string }>,
) => {
  const pinia = createTestingPinia({
    stubActions: false, // let store call the network → MSW intercepts
    initialState: {
      showsListStore: { shows: state?.shows ?? [], isLoading: state?.isLoading ?? false },
      searchShowsStore: { searchInput: state?.searchInput ?? '' },
    },
  })
  return render(HomeView, {
    global: {
      plugins: [pinia],
      stubs: {
        BaseCrousel: BaseCrouselStub,
        SearchResultBlock: SearchResultBlockStub,
        TheHeader: TheHeaderStub,
      },
    },
  })
}

describe('HomePage.vue', () => {
  beforeEach(() => {
    resetShowsRequestCount()
  })

  it('after initial fetch (page 0) shows Comedy carousel from id=250', async () => {
    renderPage()

    expect(await screen.findByRole('heading', { name: /comedy/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /drama/i })).not.toBeInTheDocument()
  })

  it('after load more (page 1) also shows Drama carousel from id=251', async () => {
    renderPage()
    await screen.findByRole('heading', { name: /comedy/i }) // after first fetch

    await userEvent.click(screen.getByTestId('load-more'))
    expect(await screen.findByRole('heading', { name: /drama/i })).toBeInTheDocument()
  })

  it('navigates with clicked slide id from data (250 for first page)', async () => {
    renderPage()
    await screen.findByRole('heading', { name: /comedy/i })
    await userEvent.click(screen.getByTestId('img-click'))
    expect(router.push).toHaveBeenCalledWith({ name: 'show', params: { id: 250 } })
  })
})
