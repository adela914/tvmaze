import { BASE_API_URL } from '@/constants'
import type { TVMazeShow } from '@/types/TVMazeShow'

export default async function getShowById(id: string): Promise<TVMazeShow> {
  const url = `${BASE_API_URL}shows/${id}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const fetchedShowDetails: TVMazeShow = await response.json()

  return fetchedShowDetails
}
