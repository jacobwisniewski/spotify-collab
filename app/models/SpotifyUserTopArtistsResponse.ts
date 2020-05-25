import { ExternalUrls, Image } from "./Spotify"

interface Followers {
  href: string | null
  total: number
}

interface SpotifyArtist {
  external_urls: ExternalUrls
  followers: Followers
  genres: string[]
  href: string
  id: string
  images: Image[]
  name: string
  popularity: number
  type: string
  uri: string
}

export interface SpotifyUserTopArtistsResponse {
  items: SpotifyArtist[]
  next: string | null
  previous: string | null
  total: number
  limit: number
  href: string
}
