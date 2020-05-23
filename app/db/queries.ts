import { config } from "dotenv"
import pg, { Pool, PoolClient, QueryResult } from "pg"
import {
  SpotifyAccessTokenResponse,
  SpotifyPrivateProfileResponse,
  SpotifyPublicProfileResponse,
  SpotifyTokenResponse
} from "../services/SpotifyService"
import { PublicSpotifyProfileData } from "../spotify"
import {
  createSpotifyTokensTableQuery,
  createUsersTableQuery,
  createUserWithSpotifyProfileAndSpotifyTokensQuery,
  createUserWithSpotifyProfileQuery,
  getUserRefreshTokenQuery,
  getPublicSpotifyProfileQuery,
  getUserSpotifyTokensQuery,
  updateRefreshTokenQuery,
  updateUserWithAccessTokenQuery,
  updateUserWithSpotifyProfileAndSpotifyTokensQuery,
  getPrivateSpotifyProfileQuery
} from "./queryStrings"

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

interface PublicSpotifyProfile {
  spotify_id: string
  display_name: string
  spotify_profile_url: string
  profile_picture_url: string
  followers: number
}

interface PrivateSpotifyProfile {
  spotify_id: string
  display_name: string
  spotify_profile_url: string
  profile_picture_url: string
  followers: number
  country: string
  email: string
}

interface SpotifyTokens {
  access_token: string
  refresh_token: string
  expires_on: string
}

interface Queries {
  createSpotifyTokensTable(): Promise<void>

  createUsersTable(): Promise<void>

  createUserWithSpotifyProfileAndSpotifyTokens(profile: SpotifyPrivateProfileResponse, tokens: SpotifyTokenResponse): Promise<void>

  getPublicSpotifyProfile(spotifyId: string): Promise<PublicSpotifyProfile>

  updateUserWithSpotifyProfileAndSpotifyTokens(profile: SpotifyPublicProfileResponse, tokens: SpotifyTokenResponse): Promise<void>

  getSpotifyIdFromRefreshToken(refreshToken: string): Promise<string>

  updateUserRefreshToken(refreshToken: string, spotifyId: string): Promise<any>

  getUserSpotifyTokens(spotifyId: string): Promise<SpotifyTokens>

  updateUserWithAccessToken(spotifyId: string, token: SpotifyAccessTokenResponse): Promise<void>

  createUserWithSpotifyProfile(userData: SpotifyPublicProfileResponse): Promise<void>

  getPrivateSpotifyProfile(spotifyId: string): Promise<PrivateSpotifyProfile>
}

const Queries: Queries = {
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
  createUserWithSpotifyProfileAndSpotifyTokens(profile: SpotifyPrivateProfileResponse, token: SpotifyTokenResponse) {
    const expiresOn = new Date(Date.now() + token.expires_in * 1000)
    const profilePictureUrl = !!profile.images.length ? `'${profile.images[0].url}'` : null

    return query(createUserWithSpotifyProfileAndSpotifyTokensQuery, [
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
  updateUserWithSpotifyProfileAndSpotifyTokens(profile: SpotifyPublicProfileResponse, tokens: SpotifyTokenResponse) {
    const expiresOn = new Date(Date.now() + tokens.expires_in * 1000)
    const profilePictureUrl = !!profile.images.length ? profile.images[0].url : null

    return query(updateUserWithSpotifyProfileAndSpotifyTokensQuery, [
      profile.display_name,
      profile.external_urls.spotify,
      profilePictureUrl,
      profile.followers.total,
      profile.id,
      tokens.access_token,
      tokens.refresh_token,
      expiresOn,
      profile.id
    ]).then(returnVoid)
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
    return query<string>(getUserRefreshTokenQuery, [refreshToken]).then(getFirstResult)
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
  Queries.createUsersTable().then(() => Queries.createSpotifyTokensTable())
}

export default Queries
