import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { BASE_API_URL } from '@/constants'
import { page0, page1 } from './mockData'

// track how many requests (handy for “load more”)
export let getShowsRequestCount = 0
export const resetShowsRequestCount = () => {
  getShowsRequestCount = 0
}

export const handlers = [
  http.get(`${BASE_API_URL}shows`, ({ request }) => {
    getShowsRequestCount++
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 0)
    if (page === 0) return HttpResponse.json(page0)
    if (page === 1) return HttpResponse.json(page1)
    return HttpResponse.json([]) // no more pages
  }),
]

export const server = setupServer(...handlers)
export { http, HttpResponse }
