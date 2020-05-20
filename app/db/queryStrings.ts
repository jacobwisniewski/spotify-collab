export const createUserWithSpotifyProfileQuery = `
    INSERT INTO users (spotify_id, display_name, profile_picture_url, spotify_profile_url, followers)
    VALUES ($1, $2, $3, $4, $5)
`

export const updateUserWithAccessTokenQuery = `
    UPDATE spotify_tokens SET access_token = $1, expires_on = $2 WHERE spotify_id = $3
`

export const getUserSpotifyTokensQuery = `
    SELECT * FROM spotify_tokens WHERE spotify_tokens.spotify_id = $1
`

export const updateRefreshTokenQuery = `
    UPDATE users SET refresh_token = $1 WHERE users.spotify_id = $2
`

export const getUserRefreshTokenQuery = `
    SELECT spotify_id FROM users WHERE users.refresh_token = $1
`

export const updateUserWithSpotifyProfileAndSpotifyTokensQuery = `
    WITH users_update AS (
        UPDATE users
        SET display_name = $1, spotify_profile_url = $2, profile_picture_url = $3, followers = $4 
        WHERE spotify_id = $5
        RETURNING spotify_id
    )
    UPDATE spotify_tokens
    SET access_token = $6,
        refresh_token = $7,
        expires_on = $8
    WHERE spotify_id = $9
`

export const getUserSpotifyProfileQuery = `
    SELECT spotify_id, display_name, country, email, spotify_profile_url, profile_picture_url, followers,
            spotify_account_type
    FROM users WHERE users.spotify_id = $1
`

export const createSpotifyTokensTableQuery = `
    CREATE TABLE IF NOT EXISTS spotify_tokens (
        spotify_id VARCHAR (100),
        access_token VARCHAR (200),
        refresh_token VARCHAR (200),
        expires_on TIMESTAMP,
        PRIMARY KEY (spotify_id)
    )    
`

export const createUsersTableQuery = `
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
    )
`

export const createUserWithSpotifyProfileAndSpotifyTokensQuery = `
    WITH created_user AS (
        INSERT INTO users (spotify_id, display_name, country, email, profile_picture_url, spotify_profile_url,
                           followers, spotify_account_type)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
    )
    INSERT INTO spotify_tokens (spotify_id, access_token, refresh_token, expires_on)
    VALUES ($9, $10, $11, $12)  
`
