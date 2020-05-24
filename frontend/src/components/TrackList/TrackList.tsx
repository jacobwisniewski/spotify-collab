import React, { FunctionComponent } from "react"
import { SpotifyAlbum, SpotifyArtist, SpotifyTrack } from "../../../../app/db/queries"
import styles from "./TrackList.module.css"

interface TrackListProps {
  tracks: SpotifyTrack[]
  order: boolean
}

interface TrackProps {
  name: string
  artists: SpotifyArtist[]
  album: SpotifyAlbum
  url: string
  order?: number
}

const Track: FunctionComponent<TrackProps> = ({ name, artists, album, url, order }) => {
  return (
    <div className={styles.TrackContainer}>
      {order && <div className={styles.Order}>{order}</div>}
      <img className={styles.AlbumCover} src={album.image} alt={name} />
      <div className={styles.TrackHeader}>
        <div className={styles.Title}>{name}</div>
        <div className={styles.Subtitle}>{`${artists.map(({ name }) => name).join(", ")} • ${album.name}`}</div>
      </div>
    </div>
  )
}

const TrackList: FunctionComponent<TrackListProps> = ({ tracks, order }) => {
  return (
    <div>
      {tracks.map(({ name, url, artists, album }, index) => (
        <Track name={name} url={url} artists={artists} album={album} order={order ? index + 1 : undefined} />
      ))}
    </div>
  )
}

export default TrackList
