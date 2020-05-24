import React, { FunctionComponent, MouseEventHandler, useCallback } from "react"
import styles from "./Header.module.css"

export type HeaderClickHandler = () => void

interface HeaderProps {
  onLogoClick: HeaderClickHandler
}

const Header: FunctionComponent<HeaderProps> = ({ onLogoClick }) => {
  const onClick = useCallback<MouseEventHandler<HTMLHeadingElement>>(() => {
    onLogoClick()
  }, [onLogoClick])

  return (
    <header className={styles.HeaderContainer}>
      <h2 className={styles.Logo} onClick={onClick}>
        Collab.
      </h2>
    </header>
  )
}

export default Header
