import React, { FunctionComponent, MouseEventHandler, useCallback } from "react"
import styles from "./Header.module.css"

export interface HeaderClickHandler {
  (): void
}

interface HeaderProps {
  onLogoClick: HeaderClickHandler
}

const Header: FunctionComponent<HeaderProps> = ({ onLogoClick }) => {
  const onClick = useCallback<MouseEventHandler<HTMLHeadingElement>>(() => {
    onLogoClick()
  }, [onLogoClick])

  return (
    <header className={styles.HeaderContainer}>
      <h3 className={styles.Logo} onClick={onClick}>
        Collab.
      </h3>
    </header>
  )
}

export default Header
