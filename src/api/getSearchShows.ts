import { BASE_API_URL } from '@/constants'
import type { TVMazeShow, ShowSearch } from '@/types/TVMazeShow'

export default async function getSearchShows(search: string): Promise<TVMazeShow[]> {
  const query = new URLSearchParams({
    q: search,
  }).toString()

  const url = `${BASE_API_URL}search/shows?${query}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const json = await response.json()

  return json.map((item: ShowSearch): TVMazeShow => item.show)
}
