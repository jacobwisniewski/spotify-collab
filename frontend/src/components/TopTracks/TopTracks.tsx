import React, { FunctionComponent } from "react"
import { SpotifyTrack } from "../../models/SpotifyUserTopTracksResponse"
import ElementList, { Element } from "../ElementList/ElementList"

interface TopTracksProps {
  topTracks: SpotifyTrack[]
}

const TopTracks: FunctionComponent<TopTracksProps> = ({ topTracks }) => {
  const elements: Element[] = topTracks.map(({ id, name, url, artists, album }, index) => ({
    title: name,
    subtitle: `${artists.map(({ name }) => name).join(", ")} • ${album.name}`,
    url: url,
    image: album.image,
    order: index + 1
  }))
  console.log(elements)
  return <ElementList elements={elements} showOrder={true} />
}

export default TopTracks
