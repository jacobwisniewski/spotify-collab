export interface SpotifyProfileResponse {
  spotify_id: string
  display_name: string
  spotify_profile_url: string
  followers: number
  profile_picture_url: null | string
  email?: string
  country?: string
  spotify_account_type?: string
}
