import type { TVMAZE_GENRES } from '@/constants'

export type TVMazeShow = {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: TVMazeGenre[]
  status: string
  runtime: number
  averageRuntime: number
  premiered: string
  ended: string
  officialSite: string
  schedule: Schedule
  rating: Rating
  weight: number
  network: Network
  webChannel: WebChannel | null
  dvdCountry: Country | null
  externals: Externals
  image?: Image
  summary: string
  updated: number
  _links: Links
}

export type TVMazeGenre = (typeof TVMAZE_GENRES)[number]

export type WebChannel = {
  id: number
  name: string
  country: {
    name: string
    code: string
    timezone: string
  }
  officialSite: string
}

export type Schedule = {
  time: string
  days: string[]
}

export type Rating = {
  average: number | null
}

export type Country = {
  name: string
  code: string
  timezone: string
}

export type Network = {
  id: number
  name: string
  country: Country
  officialSite: string | null
}

export type Externals = {
  tvrage: number
  thetvdb: number
  imdb: string
}

export type Image = {
  medium: string
  original: string
}

export type Self = {
  href: string
  name?: string
}

export type Links = {
  self?: Self
  previousepisode?: Self
  show?: Self
  character?: Self
}

export type ShowSearch = {
  score: number
  show: TVMazeShow
}
