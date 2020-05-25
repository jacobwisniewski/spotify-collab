interface SpotifyArtist {
  id: string
  name: string
  url: string
  image: string
}

export type SpotifyUserTopArtistsResponse = SpotifyArtist[]
