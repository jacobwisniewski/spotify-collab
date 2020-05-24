interface SpotifyAlbum {
  id: string
  name: string
  image: string
  url: string
}

interface SpotifyArtists {
  id: string
  name: string
  url: string
}

export interface SpotifyTrack {
  id: string
  name: string
  url: string
  album: SpotifyAlbum
  artists: SpotifyArtists[]
}

export type SpotifyUserTopTracksResponse = SpotifyTrack[]
