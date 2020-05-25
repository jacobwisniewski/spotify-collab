import { ExternalUrls, Image } from "./Spotify"

interface SpotifyArtist {
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  type: string
  uri: string
}

interface SpotifyAlbum {
  album_type: string
  artists: SpotifyArtist
  available_markets: string[]
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

interface ExternalId {
  isrc: string
}

interface SpotifyTrack {
  album: SpotifyAlbum
  artists: SpotifyArtist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: ExternalId
  external_urls: ExternalUrls
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
}

export interface SpotifyUserTopTracksResponse {
  items: SpotifyTrack[]
  total: number
  limit: number
  offset: number
  href: string
  previous: null | string
  next: null | string
}
