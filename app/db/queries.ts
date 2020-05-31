import { config } from "dotenv"
import pg, { Pool, PoolClient, QueryResult } from "pg"
import {
  SpotifyAccessTokenResponse,
  SpotifyPrivateProfileResponse,
  SpotifyPublicProfileResponse,
  SpotifyTokenResponse,
  TimeRange
} from "../services/SpotifyService"
import {
  createSpotifyTokensTableQuery,
  createUsersTableQuery,
  addUserWithSpotifyProfileAndSpotifyTokensQuery,
  createUserWithSpotifyProfileQuery,
  getUserRefreshTokenQuery,
  getPublicSpotifyProfileQuery,
  getUserSpotifyTokensQuery,
  updateRefreshTokenQuery,
  updateUserWithAccessTokenQuery,
  getPrivateSpotifyProfileQuery,
  createTopTracksTableQuery,
  createTracksTableQuery,
  createAlbumTableQuery,
  createArtistTableQuery,
  createTrackArtistTableQuery,
  addUserTopTracksQuery,
  createTopArtistsTableQuery,
  addUserTopArtistsQuery,
  getRefreshTokenFromSpotifyIdQuery
} from "./queryStrings"
import format from "pg-format"

config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // @ts-ignore
  Client: pg.native.Client
})

pool.on("error", (err: Error, client: PoolClient) => {
  console.error("Error:", err)
})

pool.on("connect", (client: PoolClient) => {
  console.log("Database connected.")
})

export interface PublicSpotifyProfile {
  spotify_id: string
  display_name: string
  spotify_profile_url: string
  profile_picture_url: string
  followers: number
}

export interface PrivateSpotifyProfile {
  spotify_id: string
  display_name: string
  spotify_profile_url: string
  profile_picture_url: string
  followers: number
  country: string
  email: string
  spotify_account_type: string
}

interface SpotifyTokens {
  access_token: string
  refresh_token: string
  expires_on: string
}

export interface SpotifyAlbum {
  id: string
  name: string
  image: string
  url: string
}

export interface SpotifyArtist {
  id: string
  name: string
  url: string
  image?: string
}

export interface SpotifyTrack {
  id: string
  name: string
  url: string
  album: SpotifyAlbum
  artists: SpotifyArtist[]
}

export interface RefreshToken {
  refresh_token: string
}

export interface SpotifyId {
  spotify_id: string
}

interface Queries {
  createSpotifyTokensTable(): Promise<void>

  createUsersTable(): Promise<void>

  createTopTracksTable(): Promise<void>

  createTracksTable(): Promise<void>

  createArtistsTable(): Promise<void>

  createAlbumsTable(): Promise<void>

  createTrackArtistTable(): Promise<void>

  createTopArtistsTable(): Promise<void>

  addUserWithSpotifyProfileAndSpotifyTokens(profile: SpotifyPrivateProfileResponse, tokens: SpotifyTokenResponse): Promise<void>

  getPublicSpotifyProfile(spotifyId: string): Promise<PublicSpotifyProfile>

  getSpotifyIdFromRefreshToken(refreshToken: string): Promise<SpotifyId>

  updateUserRefreshToken(refreshToken: string, spotifyId: string): Promise<any>

  getUserSpotifyTokens(spotifyId: string): Promise<SpotifyTokens>

  updateUserWithAccessToken(spotifyId: string, token: SpotifyAccessTokenResponse): Promise<void>

  createUserWithSpotifyProfile(userData: SpotifyPublicProfileResponse): Promise<void>

  getPrivateSpotifyProfile(spotifyId: string): Promise<PrivateSpotifyProfile>

  addUserTopTracks(spotifyId: string, timeRange: TimeRange, userTopTracks: SpotifyTrack[]): Promise<void>

  addUserTopArtists(spotifyId: string, timeRange: TimeRange, userTopArtists: SpotifyArtist[]): Promise<void>

  getRefreshTokenFromSpotifyId(spotifyId: string): Promise<RefreshToken>
}

const Queries: Queries = {
  getRefreshTokenFromSpotifyId(spotifyId: string): Promise<RefreshToken> {
    return query<RefreshToken>(getRefreshTokenFromSpotifyIdQuery, [spotifyId]).then(getFirstResult)
  },
  createUserWithSpotifyProfile(userData: SpotifyPublicProfileResponse) {
    const profilePictureUrl = !!userData.images.length ? userData.images[0].url : null

    return query(createUserWithSpotifyProfileQuery, [
      userData.id,
      userData.display_name,
      profilePictureUrl,
      userData.external_urls.spotify,
      userData.followers.total
    ]).then(returnVoid)
  },
  addUserWithSpotifyProfileAndSpotifyTokens(profile: SpotifyPrivateProfileResponse, token: SpotifyTokenResponse) {
    const expiresOn = new Date(Date.now() + token.expires_in * 1000)
    const profilePictureUrl = !!profile.images.length ? profile.images[0].url : null

    return query(addUserWithSpotifyProfileAndSpotifyTokensQuery, [
      profile.id,
      profile.display_name,
      profile.country,
      profile.email,
      profilePictureUrl,
      profile.external_urls.spotify,
      profile.followers.total,
      profile.product,
      profile.id,
      token.access_token,
      token.refresh_token,
      expiresOn
    ]).then(returnVoid)
  },
  addUserTopTracks(spotifyId: string, timeRange: TimeRange, userTopTracks: SpotifyTrack[]): Promise<void> {
    const topTracks = userTopTracks.map(({ id }, index) => [spotifyId, id, timeRange, index])
    const tracks = userTopTracks.map(({ id, name, url }) => [id, name, url])
    const artists = userTopTracks.reduce((prevArr, { artists }) => prevArr.concat(artists), []).map(({ id, name, url }) => [id, name, url])
    const albums = userTopTracks.map(({ album }) => album).map(({ id, name, image, url }) => [id, name, image, url])
    const trackArtist = userTopTracks
      .reduce((prevArr, { id, artists }) => prevArr.concat(artists.map((artist) => ({ ...artist, track_id: id }))), [])
      .map(({ id, track_id }) => [track_id, id])

    const queryString = format(addUserTopTracksQuery, topTracks, tracks, artists, albums, trackArtist)
    return query(queryString).then(returnVoid)
  },
  addUserTopArtists(spotifyId: string, timeRange: TimeRange, userTopArtists: SpotifyArtist[]): Promise<void> {
    const topArtists = userTopArtists.map(({ id }, index) => [spotifyId, id, timeRange, index])
    const artists = userTopArtists.map(({ id, name, image, url }) => [id, name, image, url])

    const queryString = format(addUserTopArtistsQuery, topArtists, artists)
    return query(queryString).then(returnVoid)
  },
  updateUserWithAccessToken(spotifyId: string, token: SpotifyAccessTokenResponse) {
    const expiresOn = new Date(Date.now() + token.expires_in * 1000)

    return query(updateUserWithAccessTokenQuery, [token.access_token, expiresOn, spotifyId]).then(returnVoid)
  },
  getUserSpotifyTokens(spotifyId: string) {
    return query<SpotifyTokens>(getUserSpotifyTokensQuery, [spotifyId]).then(getFirstResult)
  },
  updateUserRefreshToken(refreshToken: string, spotifyId: string) {
    return query(updateRefreshTokenQuery, [refreshToken, spotifyId]).then(returnVoid)
  },
  getSpotifyIdFromRefreshToken(refreshToken: string) {
    return query<SpotifyId>(getUserRefreshTokenQuery, [refreshToken]).then(getFirstResult)
  },
  getPublicSpotifyProfile(spotifyId: string) {
    return query<PublicSpotifyProfile>(getPublicSpotifyProfileQuery, [spotifyId]).then(getFirstResult)
  },
  getPrivateSpotifyProfile(spotifyId: string) {
    return query<PrivateSpotifyProfile>(getPrivateSpotifyProfileQuery, [spotifyId]).then(getFirstResult)
  },
  createSpotifyTokensTable() {
    return query(createSpotifyTokensTableQuery).then(returnVoid)
  },
  createUsersTable() {
    return query(createUsersTableQuery).then(returnVoid)
  },
  createTopTracksTable(): Promise<void> {
    return query(createTopTracksTableQuery).then(returnVoid)
  },
  createTracksTable(): Promise<void> {
    return query(createTracksTableQuery).then(returnVoid)
  },
  createAlbumsTable(): Promise<void> {
    return query(createAlbumTableQuery).then(returnVoid)
  },
  createArtistsTable(): Promise<void> {
    return query(createArtistTableQuery).then(returnVoid)
  },
  createTrackArtistTable(): Promise<void> {
    return query(createTrackArtistTableQuery).then(returnVoid)
  },
  createTopArtistsTable(): Promise<void> {
    return query(createTopArtistsTableQuery).then(returnVoid)
  }
}

function query<T>(queryString: string, paramValues?: any[]): Promise<T[]> {
  return pool
    .query(queryString, paramValues)
    .then((res: QueryResult<T>) => Promise.resolve(res.rows))
    .catch((err: Error) => Promise.reject(err))
}

function getFirstResult<T>(response: T[]) {
  return !!response.length ? response[0] : null
}

function returnVoid() {
  return Promise.resolve()
}

export const main = async () => {
  try {
    await Queries.createTrackArtistTable()
    await Queries.createArtistsTable()
    await Queries.createAlbumsTable()
    await Queries.createTracksTable()
    await Queries.createTopTracksTable()
    await Queries.createUsersTable()
    await Queries.createSpotifyTokensTable()
    await Queries.createTopArtistsTable()
  } catch (error) {
    throw error
  }
}

export default Queries
