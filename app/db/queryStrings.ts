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
export const getPublicSpotifyProfileQuery = `
    SELECT spotify_id, display_name, spotify_profile_url, profile_picture_url, followers
    FROM users WHERE users.spotify_id = $1
`

export const getPrivateSpotifyProfileQuery = `
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

export const createTopTracksTableQuery = `
    CREATE TABLE IF NOT EXISTS top_tracks (
        spotify_id VARCHAR (100),
        track_id VARCHAR (100),
        time_range VARCHAR (100),
        position INTEGER,
        PRIMARY KEY (spotify_id, time_range, position),
        UNIQUE (spotify_id, time_range, position)
    )
`

export const createTracksTableQuery = `
    CREATE TABLE IF NOT EXISTS tracks (
        id VARCHAR (100),
        name VARCHAR (100),
        url VARCHAR (100),
        PRIMARY KEY (id) 
    )
`

export const createAlbumTableQuery = `
    CREATE TABLE IF NOT EXISTS albums (
        id VARCHAR (100),
        name VARCHAR (100),
        image_url VARCHAR (100),
        url VARCHAR (100),
        PRIMARY KEY (id)
    )
`

export const createTrackArtistTableQuery = `
    CREATE TABLE IF NOT EXISTS track_artist (
        track_id VARCHAR (100),
        artist_id VARCHAR (100),
        PRIMARY KEY (track_id, artist_id) 
    )
`

export const createArtistTableQuery = `
    CREATE TABLE IF NOT EXISTS artists (
        id VARCHAR (100),
        name VARCHAR (100),
        url VARCHAR (100),
        image VARCHAR (100),
        PRIMARY KEY (id)
    )
`

export const createTopArtistsTableQuery = `
    CREATE TABLE IF NOT EXISTS top_artists (
        spotify_id VARCHAR (100),
        artist_id VARCHAR (100),
        time_range VARCHAR (100),
        position INTEGER,
        PRIMARY KEY (spotify_id, time_range, position),
        UNIQUE (spotify_id, time_range, position)
    )
`

export const addUserWithSpotifyProfileAndSpotifyTokensQuery = `
    WITH created_user AS (
        INSERT INTO users (spotify_id, display_name, country, email, profile_picture_url, spotify_profile_url,
                           followers, spotify_account_type)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON conflict (spotify_id) DO UPDATE
        SET display_name = EXCLUDED.display_name,
            country = EXCLUDED.country,
            email = EXCLUDED.email,
            profile_picture_url = EXCLUDED.profile_picture_url,
            followers = EXCLUDED.followers,
            spotify_account_type = EXCLUDED.spotify_account_type
    )
    INSERT INTO spotify_tokens (spotify_id, access_token, refresh_token, expires_on)
    VALUES ($9, $10, $11, $12)
    ON conflict (spotify_id) DO UPDATE
    SET access_token = EXCLUDED.access_token,
        refresh_token = EXCLUDED.refresh_token,
        expires_on = EXCLUDED.expires_on  
`

export const addUserTopTracksQuery = `
    WITH added_top_tracks AS (
        INSERT INTO top_tracks (spotify_id, track_id, time_range, position) VALUES %L
        ON conflict (spotify_id, time_range, position) DO UPDATE
        SET track_id = EXCLUDED.track_id
    ), added_tracks AS (
        INSERT INTO tracks (id, name, url) VALUES %L
        ON conflict DO nothing
    ), added_artists AS (
        INSERT INTO artists (id, name, url) VALUES %L
        ON conflict DO nothing
    ), added_albums AS (
        INSERT INTO albums (id, name, image_url, url) VALUES %L
        ON conflict DO nothing
    )
    INSERT INTO track_artist (track_id, artist_id) VALUES %L
    ON conflict DO nothing
`

export const addUserTopArtistsQuery = `
    WITH added_top_artists AS (
        INSERT INTO top_artists (spotify_id, artist_id, time_range, position) VALUES %L
        ON conflict (spotify_id, time_range, position) DO UPDATE
        SET artist_id = EXCLUDED.artist_id
    )
    INSERT INTO artists (id, name, image, url) VALUES %L
    ON conflict (id) DO UPDATE
    SET image = EXCLUDED.image 
`
