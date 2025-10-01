import { BASE_API_URL } from '@/constants'
import type { TVMazeShow } from '@/types/TVMazeShow'

export default async function getShows(page: number): Promise<TVMazeShow[]> {
  const url = `${BASE_API_URL}shows?page=${page}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const fetchedShows: TVMazeShow[] = await response.json()

  return fetchedShows
}
