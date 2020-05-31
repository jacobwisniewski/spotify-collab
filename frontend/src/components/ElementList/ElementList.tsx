import React, { FunctionComponent } from "react"
import styles from "./ElementList.module.css"
import { joinClasses } from "../../utils/joinClasses"

export interface Element {
  image?: string
  title?: string
  subtitle?: string
  url?: string
  order?: number
}

interface ElementListProps {
  elements: Element[]
  showOrder?: boolean
  skeleton?: boolean
}

interface ElementLoadingProps {
  order?: number
}

const ElementLoading: FunctionComponent<ElementLoadingProps> = ({ order }) => {
  return (
    <div className={joinClasses(styles.Loading, styles.TrackContainer)}>
      {order && <div className={styles.Order}>{order}</div>}
      <div className={styles.AlbumCover} />
      <div className={styles.TrackHeader}>
        <div className={styles.Title} />
        <div className={styles.Subtitle} />
      </div>
    </div>
  )
}

const Element: FunctionComponent<Element> = ({ image, title, subtitle, url, order }) => {
  if (!title) return <ElementLoading order={order} />

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

const ElementList: FunctionComponent<ElementListProps> = ({ elements, showOrder, skeleton }) => {
  if (skeleton) {
    return (
      <div>
        {Array(25)
          .fill(null)
          .map((_, index) => (
            <Element key={index} order={showOrder ? index + 1 : undefined} />
          ))}
      </div>
    )
  }

  return (
    <div>
      {elements.map(({ image, title, subtitle, url, order }, index) => (
        <Element key={index} image={image} title={title} subtitle={subtitle} url={url} order={showOrder ? order : undefined} />
      ))}
    </div>
  )
}

export default ElementList
