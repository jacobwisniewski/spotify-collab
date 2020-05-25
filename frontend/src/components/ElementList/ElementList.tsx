import React, { FunctionComponent } from "react"
import styles from "./ElementList.module.css"

export interface Element {
  image: string
  title: string
  subtitle?: string
  url: string
  order?: number
}

interface ElementListProps {
  elements: Element[]
  showOrder: boolean
}

interface TrackProps {
  title: string
  subtitle?: string
  image: string
  url: string
  order?: number
}

const Element: FunctionComponent<TrackProps> = ({ image, title, subtitle, url, order }) => {
  return (
    <div className={styles.TrackContainer}>
      {order && <div className={styles.Order}>{order}</div>}
      <img className={styles.AlbumCover} src={image} alt={title} />
      <div className={styles.TrackHeader}>
        <a href={url} className={styles.Title}>
          {title}
        </a>
        <div className={styles.Subtitle}>{subtitle}</div>
      </div>
    </div>
  )
}

const ElementList: FunctionComponent<ElementListProps> = ({ elements, showOrder }) => {
  return (
    <div>
      {elements.map(({ image, title, subtitle, url, order }, index) => (
        <Element key={index} image={image} title={title} subtitle={subtitle} url={url} order={showOrder ? order : undefined} />
      ))}
    </div>
  )
}

export default ElementList
