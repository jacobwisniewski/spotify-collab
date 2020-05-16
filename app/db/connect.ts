// @ts-nocheck

import { config } from "dotenv"
import pg, { Pool, QueryResult } from "pg"
import {
  SpotifyAccessTokenResponse,
  SpotifyPrivateProfileResponse,
  SpotifyPublicProfileResponse,
  SpotifyTokenResponse
} from "../spotify/Integration"
import { PublicSpotifyProfileData } from "../spotify"

config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  Client: pg.native.Client
})

pool.on("error", (err, client) => {
  console.error("Error:", err)
})

pool.on("connect", (client) => {
 console.log("Database connected.")
})

interface UserData {
  spotify_id: string
  display_name: string
  country: string
  email: string
  spotify_profile_url: string
  profile_picture_url: string
  followers: number
  spotify_account_type: string
}

interface SpotifyTokens {
  access_token: string
  refresh_token: string
  expires_on: string
}

interface Queries {
  createSpotifyTokensTable(): Promise<any>
  createUsersTable(): Promise<any>
  deleteSpotifyTokensTable(): Promise<any>
  deleteUsersTable(): Promise<any>
  createUserWithSpotifyProfileDateAndTokens(profile: SpotifyPrivateProfileResponse, tokens: SpotifyTokenResponse): Promise<any>
  getSpotifyUserData(spotifyId: string): Promise<QueryResult>
  updateUserWithTokens(profile: SpotifyPublicProfileResponse, tokens: SpotifyTokenResponse): Promise<any>
  getRefreshTokenUser(refreshToken: string): Promise<QueryResult>
  updateRefreshToken(refreshToken: string, spotifyId: string): Promise<any>
  getUserSpotifyTokens(spotifyId: string): Promise<QueryResult<SpotifyTokens>>
  updateUserWithAccessToken(spotifyId: string, token: SpotifyAccessTokenResponse): Promise<any>
  createUserWithSpotifyProfileData(userData: SpotifyPublicProfileResponse): Promise<QueryResult<PublicSpotifyProfileData>>
}

const Queries: Queries = {
  createUserWithSpotifyProfileData(userData: SpotifyPublicProfileResponse): Promise<any> {
    const profilePictureUrl = !!userData.images.length ? `'${userData.images[0].url}'` : null
    const queryString = `
    INSERT INTO users (spotify_id, display_name, profile_picture_url, spotify_profile_url, followers)
    VALUES (
        '${userData.id}',
        '${userData.display_name}',
        ${profilePictureUrl},
        '${userData.external_urls.spotify}',
        ${userData.followers.total}
    )
    RETURNING spotify_id, display_name, profile_picture_url, spotify_profile_url, followers;
    `
    return query(queryString)
  },
  updateUserWithAccessToken(spotifyId: string, token: SpotifyAccessTokenResponse): Promise<any> {
    const expiresOn = new Date(Date.now() + token.expires_in * 1000)
    const queryString = `
    UPDATE spotify_tokens
    SET access_token = '${token.access_token}',
        expires_on = to_timestamp(${expiresOn.getTime() / 1000.0})
    WHERE
        spotify_id = '${spotifyId}';
    `

    return query(queryString)
  },
  getUserSpotifyTokens(spotifyId: string): Promise<QueryResult> {
    const queryString = `
      SELECT * FROM spotify_tokens WHERE spotify_tokens.spotify_id = '${spotifyId}';
    `

    return query(queryString)
  },
  updateRefreshToken(refreshToken: string, spotifyId: string): Promise<any> {
    const queryString = `
    UPDATE users SET refresh_token = '${refreshToken}' WHERE users.spotify_id = '${spotifyId}';
    `

    return query(queryString)
  },
  getRefreshTokenUser(refreshToken: string): Promise<QueryResult> {
    const queryString = `
    SELECT spotify_id FROM users WHERE users.refresh_token = '${refreshToken}';
    `

    return query(queryString)
  },
  updateUserWithTokens(profile: SpotifyPublicProfileResponse, tokens: SpotifyTokenResponse): Promise<any> {
    const expiresOn = new Date(Date.now() + tokens.expires_in * 1000)
    const profilePictureUrl = !!profile.images ? `'${profile.images[0].url}'` : null
    const queryString = `
    WITH users_update AS (
        UPDATE users
        SET display_name = '${profile.display_name}',
            spotify_profile_url = '${profile.external_urls.spotify}',
            profile_picture_url = '${profilePictureUrl}',
            followers = '${profile.followers.total}'
        WHERE
            spotify_id = '${profile.id}'
        RETURNING spotify_id
    )
    UPDATE spotify_tokens
    SET access_token = '${tokens.access_token}',
        refresh_token = '${tokens.refresh_token}',
        expires_on = to_timestamp(${expiresOn.getTime() / 1000.0})
    WHERE
        spotify_id = '${profile.id}';
    `

    return query(queryString)
  },
  getSpotifyUserData(spotifyId: string): Promise<QueryResult<UserData>> {
    const queryString = `
    SELECT spotify_id, display_name, country, email, spotify_profile_url, profile_picture_url, followers,
            spotify_account_type
    FROM users WHERE users.spotify_id = '${spotifyId}';
    `

    return query(queryString)
  },
  createSpotifyTokensTable(): Promise<any> {
    const queryString = `
        CREATE TABLE IF NOT EXISTS spotify_tokens (
            spotify_id VARCHAR (100),
            access_token VARCHAR (200),
            refresh_token VARCHAR (200),
            expires_on TIMESTAMP,
            PRIMARY KEY (spotify_id)
        );
        `

    return query(queryString)
  },
  createUsersTable(): Promise<any> {
    const queryString = `
        CREATE TABLE IF NOT EXISTS users (
            spotify_id VARCHAR (100),
            display_name VARCHAR (100),
            country VARCHAR (100),
            email VARCHAR (100),
            spotify_profile_url VARCHAR(100),
            profile_picture_url TEXT,
            followers INTEGER,
            spotify_account_type VARCHAR (100),
            refresh_token VARCHAR (200),
            PRIMARY KEY (spotify_id)
        );
        `

    return query(queryString)
  },
  deleteSpotifyTokensTable(): Promise<any> {
    const queryString = `
        DROP TABLE IF EXISTS spotify_tokens;`

    return query(queryString)
  },
  deleteUsersTable(): Promise<any> {
    const queryString = `
        DROP TABLE IF EXISTS users CASCADE;`

    return query(queryString)
  },
  async createUserWithSpotifyProfileDateAndTokens(profile: SpotifyPrivateProfileResponse, token: SpotifyTokenResponse): Promise<any> {
    const expiresOn = new Date(Date.now() + token.expires_in * 1000)
    // If there is no profile picture, return an arbitrary anonymous profile picture
    const profilePictureUrl = !!profile.images.length ? `'${profile.images[0].url}'` : null
    // prettier-ignore
    const queryString = `
        WITH created_user AS (
            INSERT INTO users (spotify_id, display_name, country, email, profile_picture_url, spotify_profile_url,
                               followers, spotify_account_type)
            VALUES ('${profile.id}', '${profile.display_name}', '${profile.country}', '${profile.email}', '${profilePictureUrl}',
                    '${profile.external_urls.spotify}', ${profile.followers.total}, '${profile.product}')
            RETURNING *
        )
        INSERT INTO spotify_tokens (spotify_id, access_token, refresh_token, expires_on)
        VALUES ('${profile.id}', '${token.access_token}', '${token.refresh_token}',
                to_timestamp(${expiresOn.getTime() / 1000.0}))
        `;

    return query(queryString)
  }
}

const query = (queryString: string): Promise<QueryResult> => {
  return pool
    .query(queryString)
    .then((res) => Promise.resolve(res))
    .catch((err) => Promise.reject(err))
}

export const main = async () => {
  // Queries.deleteUsersTable()
  //   .then(() => Queries.deleteSpotifyTokensTable())
  //   .then(() => Queries.createUsersTable())
  //   .then(() => Queries.createSpotifyTokensTable());
}

export default Queries
