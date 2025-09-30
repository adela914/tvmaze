export type TVMazeShow = {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: string[]
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
  webChannel: string | null
  dvdCountry: Country | null
  externals: Externals
  image?: Image
  summary: string
  updated: number
  _links: Links
}

export type Schedule = {
  time: string
  days: string[]
}

export type Rating = {
  average: number
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
  officialSite: string
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
