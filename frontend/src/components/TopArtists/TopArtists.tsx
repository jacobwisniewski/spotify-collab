import React, { FunctionComponent } from "react"
import ElementList, { Element } from "../ElementList/ElementList"
import { SpotifyArtist } from "../../../../app/db/queries"

interface TopArtistsProps {
  topArtists: SpotifyArtist[]
}

const TopArtists: FunctionComponent<TopArtistsProps> = ({ topArtists }) => {
  const elements: Element[] = topArtists.map(({ id, name, image, url }, index) => ({
    title: name,
    url: url,
    image: image!,
    order: index + 1
  }))
  return <ElementList elements={elements} showOrder={true} />
}

export default TopArtists
